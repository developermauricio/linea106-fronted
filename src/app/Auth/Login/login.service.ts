import { AngularFireAuth } from "@angular/fire/auth";
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

@Injectable()
export class LoginService {
  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  login(correo: string, clave: string) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(correo, clave)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  getAuth() {
    return this.afAuth.auth.currentUser;
  }

  isLogged() {
    return this.afAuth.auth.currentUser != null;
  }

  logout() {
    if(this.afAuth.auth.currentUser){
      this.afAuth.auth.signOut();
    }
    else{
      this.afAuth.auth.signOut();
    }
    this.router.navigate(["login"]);
  }

  createUser(correo: string, clave: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(correo, clave);
  }

  recoverPassword(correo: string) {
    return this.afAuth.auth.sendPasswordResetEmail(correo);
  }
}
