import { TipoModel } from 'src/app/Models/tipo.model';

export interface ReporteConductaSuicida {
  label: string;
  motivo_consulta_especifico_id: number;
  total: number;
  motivo_consulta_especifico: TipoModel;
}
