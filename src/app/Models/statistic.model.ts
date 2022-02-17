export interface StatisticModel {
  nombre: string;
  total: number;
}

export interface StatisticsModel {
  total: number;
  casos_by_origen: StatisticModel[];
  casos_psicologo: StatisticModel[];
  casos_municipios: StatisticModel[];
  casos_edades: StatisticModel[];
  casos_sexo: StatisticModel[];
  casos_genero: StatisticModel[];
  casos_zona: StatisticModel[];
  casos_motivo_consulta: StatisticModel[];
  casos_linea_intervencion: StatisticModel[];
}
