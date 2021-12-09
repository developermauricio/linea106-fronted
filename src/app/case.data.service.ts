import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";

@Injectable()
export class CaseDataService {
  cases;
  constructor(private db: AngularFirestore) {}

  getCases() {
    return (this.cases = this.db
      .collection("CASOS", (ref) => ref.orderBy("fecha_inicio", "desc"))
      .valueChanges({ idField: "id" }));
  }

  getSizeCollection() {
    return this.db.collection("CASOS").doc("sizeCollection").valueChanges();
  }

  getCasesFilterByDate(fecha_inicio: number, fecha_fin: number) {
    return this.db
      .collection("CASOS", (ref) =>
        ref.orderBy("fecha_inicio").startAt(fecha_inicio).endAt(fecha_fin)
      )
      .valueChanges({ idField: "id" });
  }

  getCasesOrderByMotivos() {
    return this.db
      .collection("CASOS", (ref) => ref.orderBy("motivoConsulta"))
      .valueChanges();
  }

  getCasesWrongDate() {
    return this.db
      .collection("CASOS", (ref) => ref.where("paciente", "==", ""))
      .valueChanges({ idField: "id" });
  }

  getCasesOrderByIntervencion() {
    return this.db
      .collection("CASOS", (ref) => ref.orderBy("linea_intervencion"))
      .valueChanges();
  }

  getCaseById(id: string) {
    return this.db.collection("CASOS").doc(id).valueChanges();
  }

  getCasesRemision() {
    return this.db
      .collection("CASOS", (ref) =>
        ref.where("linea_intervencion", "==", "Remisión")
      )
      .valueChanges({ idField: "id" });
  }

  getCasesOrderByPsicologo() {
    return this.db
      .collection("CASOS", (ref) => ref.orderBy("psicologo"))
      .valueChanges({ idField: "id" });
  }

  getCaseByPsicologo(psicologo: string) {
    return this.db
      .collection("CASOS", (ref) =>
        ref.where("psicologo", "==", psicologo).orderBy("fecha_inicio", "desc")
      )
      .valueChanges({ idField: "id" });
  }

  addCase(newCase: any) {
    return this.db.collection("CASOS").add(newCase);
  }

  updateCase(id: string, caseToUpdate: any) {
    return this.db.collection("CASOS").doc(id).update(caseToUpdate);
  }

  deleteCase(id: string) {
    return this.db.collection("CASOS").doc(id).delete();
  }

  updateDate(id: string, fecha_inicio: number, fecha_fin: number) {
    return this.db.collection("CASOS").doc(id).update({
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
    });
  }
}
