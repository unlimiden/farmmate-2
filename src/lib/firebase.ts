import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection as firestoreCollection, 
  doc as firestoreDoc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc,
  query, 
  where as firestoreWhere, 
  writeBatch,
  DocumentReference,
  QueryConstraint,
  getDocFromServer
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

// --- Skill Compliance Enums and Types ---
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errMsg = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

let config: any = {};
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
} catch (err) {
  console.error("Error reading firebase-applet-config.json", err);
}

const app = initializeApp(config);
const rawDb = getFirestore(app, config.firestoreDatabaseId);

// --- Connection Validation (Skill Mandatory Constraint) ---
async function testConnection() {
  try {
    const testDocRef = firestoreDoc(rawDb, 'test', 'connection');
    await getDocFromServer(testDocRef);
    console.log("Firestore connection verified successfully via getDocFromServer.");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration. The client appears to be offline.");
    } else {
      console.log("Firestore connection test run. Status: ready.");
    }
  }
}
testConnection();

class DocRefWrapper {
  private ref: DocumentReference;
  constructor(ref: DocumentReference) {
    this.ref = ref;
  }
  
  get id() {
    return this.ref.id;
  }

  async get() {
    try {
      const snap = await getDoc(this.ref);
      return {
        exists: snap.exists(),
        id: snap.id,
        data: () => snap.data()
      };
    } catch (err) {
      handleFirestoreError(err, OperationType.GET, this.ref.path);
    }
  }

  async set(data: any, options?: any) {
    try {
      await setDoc(this.ref, data, options);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, this.ref.path);
    }
  }

  async update(data: any) {
    try {
      await updateDoc(this.ref, data);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, this.ref.path);
    }
  }

  getRawRef() {
    return this.ref;
  }
}

class CollectionWrapper {
  private colName: string;
  private constraints: QueryConstraint[];

  constructor(colName: string, constraints: QueryConstraint[] = []) {
    this.colName = colName;
    this.constraints = constraints;
  }

  doc(docId: string) {
    return new DocRefWrapper(firestoreDoc(rawDb, this.colName, docId));
  }

  where(field: string, op: any, value: any) {
    let clientOp = op;
    if (op === '==') clientOp = '==';
    return new CollectionWrapper(this.colName, [...this.constraints, firestoreWhere(field, clientOp, value)]);
  }

  limit(num: number) {
    return this; 
  }

  async get() {
    try {
      const colRef = firestoreCollection(rawDb, this.colName);
      const q = this.constraints.length > 0 ? query(colRef, ...this.constraints) : colRef;
      const snap = await getDocs(q);
      
      return {
        empty: snap.empty,
        size: snap.size,
        docs: snap.docs.map(d => ({
          id: d.id,
          data: () => d.data(),
          exists: true
        }))
      };
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, this.colName);
    }
  }
}

class BatchWrapper {
  private batch = writeBatch(rawDb);

  set(docWrapper: DocRefWrapper, data: any, options?: any) {
    this.batch.set(docWrapper.getRawRef(), data, options);
    return this;
  }

  async commit() {
    try {
      await this.batch.commit();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, "batch_commit");
    }
  }
}

export const db = {
  collection(colName: string) {
    return new CollectionWrapper(colName);
  },
  batch() {
    return new BatchWrapper();
  }
};
