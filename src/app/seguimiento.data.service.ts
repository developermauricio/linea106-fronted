import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable()
export class SeguimientoDataService {
  constructor(private db: AngularFirestore) { }

  getSeguimientos() {
    return this.db.collection("SEGUIMIENTOS", ref => ref.orderBy('id_caso')).valueChanges({ idField: "id" });
  }

  getSeguimientoById(id: string) {
    return this.db
      .collection("SEGUIMIENTOS")
      .doc(id)
      .valueChanges();
  }

  addSeguimiento(seguimiento: any) {
    return this.db.collection("SEGUIMIENTOS").add(seguimiento);
  }

  updateSegimiento(seguimiento: any) {
    return this.db
      .collection("SEGUIMIENTOS")
      .doc(seguimiento.id)
      .update(seguimiento);
  }

  deleteSeguimiento(id: string) {
    return this.db
      .collection("SEGUIMIENTOS")
      .doc(id)
      .delete();
  }
}
