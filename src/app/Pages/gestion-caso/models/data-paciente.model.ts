import { TipoModel } from 'src/app/Models/tipo.model';

export interface DataPacienteModel {
  orientaciones_sexuales: TipoModel[];
  generos: TipoModel[];
  sexos: TipoModel[];
  etnias: TipoModel[];
  estado_civiles: TipoModel[];
  ocupaciones: TipoModel[];
  niveles_educacion: TipoModel[];
  zonas: TipoModel[];
  tipos_identificacion: TipoModel[];
  departamentos: TipoModel[];
  como_conocio: TipoModel[];
  poblacion_intereses: TipoModel[];
}
