import { db } from './firebase.js';
import { cropsSeed, officersSeed, usersSeed, historySeed } from './seedData.js';
import { diseasesSeed } from './seedDataDiseases.js';
import { symptomsSeed, treatmentsSeed, preventionsSeed } from './seedDataAdvisory.js';

export async function seedDatabase() {
  console.log("Checking database status and running robust seeder...");
  
  try {
    // 1. Seed Crops if empty
    const cropsSnap = await db.collection('crops').limit(1).get();
    if (cropsSnap.empty) {
      console.log("Crops collection is empty. Seeding crops...");
      const batch = db.batch();
      for (const crop of cropsSeed) {
        const ref = db.collection('crops').doc(crop.crop_id);
        batch.set(ref, crop);
      }
      await batch.commit();
      console.log(`Seeded ${cropsSeed.length} crops.`);
    } else {
      console.log("Crops collection already has data. Skipping crops seed.");
    }

    // 2. Seed Officers if empty
    const officersSnap = await db.collection('officers').limit(1).get();
    if (officersSnap.empty) {
      console.log("Officers collection is empty. Seeding officers...");
      const batch = db.batch();
      for (const officer of officersSeed) {
        const ref = db.collection('officers').doc(officer.officer_id);
        batch.set(ref, officer);
      }
      await batch.commit();
      console.log(`Seeded ${officersSeed.length} agricultural officers.`);
    } else {
      console.log("Officers collection already has data. Skipping officers seed.");
    }

    // 3. Always Seed/Update Users to ensure they have their emails and credentials correctly populated
    console.log("Ensuring all seed users are correctly populated with emails in Firestore...");
    const usersBatch = db.batch();
    for (const user of usersSeed) {
      const ref = db.collection('users').doc(user.user_id);
      // We use set with merge: true so we don't wipe out any other fields, but ensure the standard seed fields (especially email) exist
      usersBatch.set(ref, user, { merge: true });
    }
    await usersBatch.commit();
    console.log(`Successfully updated/seeded ${usersSeed.length} users with email addresses.`);

    // 4. Seed History Records if empty
    const historySnap = await db.collection('history').limit(1).get();
    if (historySnap.empty) {
      console.log("History collection is empty. Seeding diagnostic history records...");
      const batch = db.batch();
      for (const record of historySeed) {
        const ref = db.collection('history').doc(record.history_id);
        batch.set(ref, record);
      }
      await batch.commit();
      console.log(`Seeded ${historySeed.length} diagnostic history records.`);
    } else {
      console.log("History collection already has data. Skipping history seed.");
    }

    // 5. Seed Diseases if empty
    const diseasesSnap = await db.collection('diseases').limit(1).get();
    if (diseasesSnap.empty) {
      console.log("Diseases collection is empty. Seeding diseases...");
      const batch = db.batch();
      for (const disease of diseasesSeed) {
        const ref = db.collection('diseases').doc(disease.disease_id);
        batch.set(ref, disease);
      }
      await batch.commit();
      console.log(`Seeded ${diseasesSeed.length} diseases.`);
    } else {
      console.log("Diseases collection already has data. Skipping diseases seed.");
    }

    // 6. Seed Symptoms if empty
    const symptomsSnap = await db.collection('symptoms').limit(1).get();
    if (symptomsSnap.empty) {
      console.log("Symptoms collection is empty. Seeding symptoms...");
      const batch = db.batch();
      for (const symptom of symptomsSeed) {
        const ref = db.collection('symptoms').doc(symptom.symptom_id);
        batch.set(ref, symptom);
      }
      await batch.commit();
      console.log(`Seeded ${symptomsSeed.length} symptoms.`);
    } else {
      console.log("Symptoms collection already has data. Skipping symptoms seed.");
    }

    // 7. Seed Treatments if empty
    const treatmentsSnap = await db.collection('treatments').limit(1).get();
    if (treatmentsSnap.empty) {
      console.log("Treatments collection is empty. Seeding treatments...");
      const batch = db.batch();
      for (const treatment of treatmentsSeed) {
        const ref = db.collection('treatments').doc(treatment.treatment_id);
        batch.set(ref, treatment);
      }
      await batch.commit();
      console.log(`Seeded ${treatmentsSeed.length} treatments.`);
    } else {
      console.log("Treatments collection already has data. Skipping treatments seed.");
    }

    // 8. Seed Preventions if empty
    const preventionsSnap = await db.collection('preventions').limit(1).get();
    if (preventionsSnap.empty) {
      console.log("Preventions collection is empty. Seeding preventions...");
      const batch = db.batch();
      for (const prev of preventionsSeed) {
        const ref = db.collection('preventions').doc(prev.prevention_id);
        batch.set(ref, prev);
      }
      await batch.commit();
      console.log(`Seeded ${preventionsSeed.length} preventions.`);
    } else {
      console.log("Preventions collection already has data. Skipping preventions seed.");
    }

    console.log("Robust database seeding and user verification completed successfully!");
  } catch (error) {
    console.error("Error seeding Firestore database:", error);
  }
}
