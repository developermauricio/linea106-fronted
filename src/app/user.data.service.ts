import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from '@angular/core';

@Injectable()
export class UserDataService {
  constructor(private db: AngularFirestore) {}

  getUserDataByEmail(email: string) {
    return this.db.collection("USUARIOS", ref => ref.where("correo", "==", email)).valueChanges();
  }

  getUsersPsicologos() {
    return this.db.collection("USUARIOS", ref => ref.where("rol", "==", "Psicólogo")).valueChanges();
  }

  getUserById(id: string) {
    return this.db.collection("USUARIOS", ref => ref.where("id", "==", id)).valueChanges();
  }

  getUsersAdmin() {
    return this.db.collection("USUARIOS", ref => ref.where("rol", "==", "Administrador")).valueChanges();
  }

  addUser(newUser: any) {
    return this.db.collection("USUARIOS").doc(newUser.id).set(newUser);
  }

  updateUser(userToUpdate: any){
    return this.db.collection("USUARIOS").doc(userToUpdate.id).update(userToUpdate);
  }

  deleteUser(id: string) {
    return this.db.collection("USUARIOS").doc(id).delete();
  }
}