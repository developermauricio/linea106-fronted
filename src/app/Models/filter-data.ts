import { TipoModel } from './tipo.model';

export interface FilterData {
  psicologos: TipoModel[];
  motivos: TipoModel[];
  origenes: TipoModel[];
  lineas_intervencion: TipoModel[];
}
