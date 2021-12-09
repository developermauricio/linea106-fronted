import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable()
export class AnuncioDataService {
  constructor(private db: AngularFirestore) {}

  getAnuncios() {
    return this.db.collection("ANUNCIOS").valueChanges({ idField: "id" });
  }

  getAnuncioById(id: string){
    return this.db.collection("ANUNCIOS").doc(id).valueChanges();
  }

  addAnuncio(anuncio: any) {
    return this.db.collection("ANUNCIOS").add(anuncio);
  }

  updateAnuncio(anuncio: any) {
    return this.db
      .collection("ANUNCIOS")
      .doc(anuncio["id"])
      .update(anuncio);
  }

  deleteAnuncio(id: string) {
    return this.db
      .collection("ANUNCIOS")
      .doc(id)
      .delete();
  }
}
