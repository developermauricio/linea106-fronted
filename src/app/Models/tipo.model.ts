export interface TipoModel {
  id?: number;
  name: string;
  description?: any;
}

export interface TipoCasoEspecifico extends TipoModel {
  tipo_caso_id: number;
}
