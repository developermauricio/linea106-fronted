import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Injectable()
export class CaseDataService {


  private caseDateFilter;
  private cacheData: { [key: string]: any; } = {};

  cases;

  constructor(
    private db: AngularFirestore,
    private toastrService: NbToastrService
  ) {
    this.updateCaseDateFilter();
  }

  private updateCaseDateFilter() {
    const date = new Date();
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setMinutes(0);
    date.setHours(0);
    this.caseDateFilter = (date.getTime() - this.dayToMilliseconds(1));
  };

  private dayToMilliseconds(quantity = 1) {
    return 86400000 * quantity;
  }

  private getData(key, query: Observable<any>, subString = '0') {
    this.updateCaseDateFilter();
    let subKey = 0;
    for (let i = 0; i < subString.length; i++) {
      subKey += subString.charCodeAt(i);
    }
    const keyCache = `o_${this.caseDateFilter}${subKey}`;
    return new Promise<any[]>((resolver, rechazar) => {
      if (this.cacheData[key]) {
        resolver(this.cacheData[key]);
        return;
      }
      caches.open(key).then((cache) => {
        cache.match(keyCache).then(resp => {
          if (resp) {
            resp.json().then(r => {
              this.cacheData[key] = r;
              resolver(r);
            });
          } else {
            cache.keys().then(r => {
              r.forEach(ca => {
                cache.delete(ca);
              });
            });
            const sub = query.subscribe(response => {
              cache.put(keyCache, new Response(JSON.stringify(response))).then(() => {
                this.cacheData[key] = response;
                resolver(response);
              });
              sub.unsubscribe();
            }, err => {
              this.toastrService.show(
                "Error al cargar los datos",
                "Error",
                {
                  destroyByClick: true,
                  preventDuplicates: true,
                  status: "danger",
                  icon: "alert-triangle",
                  iconPack: "eva",
                }
              );
              console.error("Error al traer los datos", err);
              sub.unsubscribe();
              resolver([]);
            });
          }
        });
      });
    });
  }

  getOldCases() {
    const query = this.db
      .collection("CASOS", (ref) => {
        return ref.orderBy("fecha_inicio", "desc")
          .where('fecha_inicio', '<', this.caseDateFilter);
      }).valueChanges({ idField: "id" });
    return this.getData('oldCases', query);
  }

  getCasesLimited() {
    return (this.cases = this.db
      .collection("CASOS", (ref) => {
        return ref.orderBy("fecha_inicio", "desc")
          .where('fecha_inicio', '>=', this.caseDateFilter);
      })
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

  getCaseByPsicologoOld(psicologo: string) {
    const query = this.db
      .collection("CASOS", (ref) =>
        ref
          .where("psicologo", "==", psicologo)
          .where("fecha_inicio", "<", this.caseDateFilter)
          .orderBy("fecha_inicio", "desc")
      )
      .valueChanges({ idField: "id" });

    return this.getData('casesByPsicologo', query, psicologo);
  }

  getCaseByPsicologoLimit(psicologo: string) {
    return this.db
      .collection("CASOS", (ref) =>
        ref.where("psicologo", "==", psicologo)
          .where("fecha_inicio", ">=", this.caseDateFilter)
          .orderBy("fecha_inicio", "desc")
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
