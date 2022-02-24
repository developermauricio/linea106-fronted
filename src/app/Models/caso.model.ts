import { PacienteModel } from './paciente.model';
import { TipoModel } from './tipo.model';
import { UserModel } from './user.model';

export interface CasoModel {
  id?: number;
  key?: string;

  observaciones: string;
  narrativa: string;
  fuente: string;
  fecha_inicio: string;
  fecha_fin: string;

  nombre_llama?: string;
  documento_llama?: string;
  respuesta_id?: number;
  radicado_id?: number;
  errores?: string;
  descripcion_relacion?: string;
  descripcion_motivo?: string;
  descripcion_radicado?: string;

  paciente_id?: number;
  motivo_consulta_id?: number;
  motivo_consulta_especifico_id?: number;
  quien_comunica_id?: number;
  linea_intervencion_id?: number;
  usuario_id?: number;
  tipo_paciente_id?: number;
  origen_id?: number;
  turno_id?: number;
  etnicidad_id?: any;
  relacion_id?: any;
  remision_id?: number;
  created_at?: string;
  updated_at?: string;
  key_server?: string;

  paciente: PacienteModel;
  quien_comunica: TipoModel;
  linea_intervencion: TipoModel;
  motivo_consulta: TipoModel;
  motivo_consulta_especifico: TipoModel;
  usuario: UserModel;
  tipo_paciente: TipoModel;
  origen: TipoModel;
  turno: TipoModel;
  etnicidad?: TipoModel;
  relacion?: TipoModel;
  remision?: TipoModel;
  respuesta?: TipoModel;
  radicado?: TipoModel;
}
