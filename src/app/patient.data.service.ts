import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable()
export class PatientDataService {
  constructor(private db: AngularFirestore) {}

  getPatients() {
    return this.db.collection('PACIENTES').valueChanges();
  }

  getPatientById(id: string) {
    return this.db
      .collection('PACIENTES').doc(id)
      .valueChanges();
  }

  addPatient(newPatient: any) {
    return this.db
      .collection('PACIENTES')
      .add(newPatient);
  }

  addPatientWithId(newPatient: any) {
    return this.db
      .collection('PACIENTES')
      .doc(newPatient.id)
      .set(newPatient);
  }

  updatePatient(PatientToUpdate: any) {
    return this.db
      .collection('PACIENTES')
      .doc(PatientToUpdate.id)
      .update(PatientToUpdate);
  }

  deletePatient(id: string) {
    return this.db
      .collection('PACIENTES')
      .doc(id)
      .delete();
  }
}
