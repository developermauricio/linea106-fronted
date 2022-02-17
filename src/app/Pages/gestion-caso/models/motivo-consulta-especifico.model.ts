import { TipoModel } from 'src/app/Models/tipo.model';

export interface MotivoConsultaEspecificoModel extends TipoModel {
  motivo_consulta_id: number;
}
