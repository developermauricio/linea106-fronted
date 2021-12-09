import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "seguimientoFilter"
})
export class seguimientoFilterPipe implements PipeTransform {
  transform(value: any, arg?: any): any {
    if(value == undefined) return value;
    const resultadoSeguimiento = [];
    for (let seguimiento of value) {
      if(this.compatibility(seguimiento.id).indexOf(this.compatibility(arg)) > -1
      || this.compatibility(seguimiento.fecha).indexOf(this.compatibility(arg)) > -1
      || this.compatibility(seguimiento.psicologo).indexOf(this.compatibility(arg)) > -1
      || this.compatibility(seguimiento.id_caso).indexOf(this.compatibility(arg)) > -1
      || this.compatibility(seguimiento.seguimiento).indexOf(this.compatibility(arg)) > -1) {
        resultadoSeguimiento.push(seguimiento);
      }
    }
    return resultadoSeguimiento;
  }

  compatibility(myString:string) {
    if(myString) return myString.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    else return "";
  }
}
