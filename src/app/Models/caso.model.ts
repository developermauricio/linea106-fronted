import { PacienteModel } from './paciente.model';
import { TipoCasoEspecifico, TipoModel } from './tipo.model';
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

  paciente_id?: number;
  motivo_consulta_id?: number;
  quien_comunica_id?: number;
  linea_intervencion_id?: number;
  usuario_id?: number;
  tipo_paciente_id?: number;
  origen_id?: number;
  motivo_id?: number;
  turno_id?: number;
  tipo_caso_id?: number;
  tipo_caso_especifico_id?: number;
  etnicidad_id?: any;
  relacion_id?: any;
  remision_id?: number;
  created_at?: string;
  updated_at?: string;
  key_server?: string;

  paciente: PacienteModel;
  motivo_consulta: TipoModel;
  quien_comunica: TipoModel;
  linea_intervencion: TipoModel;
  usuario: UserModel;
  tipo_paciente: TipoModel;
  origen: TipoModel;
  motivo?: TipoModel;
  turno: TipoModel;
  tipo_caso: TipoModel;
  tipo_caso_especifico: TipoCasoEspecifico;
  etnicidad?: TipoModel;
  relacion?: TipoModel;
  remision?: TipoModel;
  respuesta?: TipoModel;
  radicado?: TipoModel;
}
