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
  QueryConstraint
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

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

class DocRefWrapper {
  private ref: DocumentReference;
  constructor(ref: DocumentReference) {
    this.ref = ref;
  }
  
  get id() {
    return this.ref.id;
  }

  async get() {
    const snap = await getDoc(this.ref);
    return {
      exists: snap.exists(),
      id: snap.id,
      data: () => snap.data()
    };
  }

  async set(data: any, options?: any) {
    await setDoc(this.ref, data, options);
  }

  async update(data: any) {
    await updateDoc(this.ref, data);
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
  }
}

class BatchWrapper {
  private batch = writeBatch(rawDb);

  set(docWrapper: DocRefWrapper, data: any, options?: any) {
    this.batch.set(docWrapper.getRawRef(), data, options);
    return this;
  }

  async commit() {
    await this.batch.commit();
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
