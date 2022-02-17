import { TipoModel } from 'src/app/Models/tipo.model';
import { MotivoConsultaEspecificoModel } from './motivo-consulta-especifico.model';

export interface DataCaseModel {
  motivosConsultas: TipoModel[];
  quienComunica: TipoModel[];
  lineaIntervenciones: TipoModel[];
  tipoPacientes: TipoModel[];
  origenes: TipoModel[];
  turnos: TipoModel[];
  etnicidades: TipoModel[];
  remisiones: TipoModel[];
  respuestas: TipoModel[];
  relaciones: TipoModel[];
  radicados: TipoModel[];
  motivosConsultaEspecificos: MotivoConsultaEspecificoModel[];
}

