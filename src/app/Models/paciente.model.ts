import { TipoModel } from './tipo.model';

export interface PacienteModel {
  id?: number;
  key?: string;
  nombre?: string;
  apellido?: string;
  sisben?: string;
  identificacion: string;
  como_conocio_descripcion?: string;
  edad?: number;
  direccion?: string;
  fecha_nacimiento?: any;
  errores?: string;
  orientacion_sexual_id?: number;
  genero_id?: number;
  sexo_id?: number;
  etnia_id?: number;
  estado_civil_id?: number;
  ocupacion_id?: number;
  nivel_educacion_id?: number;
  zona_id?: number;
  tipo_identificacion_id?: number;
  poblacion_interes_id?: number;
  municipio_id?: number;
  departamento_id?: number;
  vereda_id?: number;
  como_conocio_id?: number;
  created_at?: string;
  updated_at?: string;

  tipo_identificacion?: TipoModel;
  sexo?: TipoModel;
  vereda?: TipoModel;
  nivel_educacion?: TipoModel;
  genero?: TipoModel;
  municipio?: TipoModel;
  ocupacion?: TipoModel;
  como_conocio?: TipoModel;
  orientacion_sexual?: TipoModel;
  zona?: TipoModel;
  poblacion_interes?: TipoModel;
  estado_civil?: TipoModel;
}
