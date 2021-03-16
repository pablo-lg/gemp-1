export interface IDireccion {
  id?: number;
  identification?: string;
  pais?: string;
  provincia?: string;
  partido?: string;
  localidad?: string;
  calle?: string;
  altura?: number;
  region?: string;
  subregion?: string;
  hub?: string;
  barriosEspeciales?: string;
  codigoPostal?: string;
  tipoCalle?: string;
  zonaCompetencia?: string;
  intersectionLeft?: string;
  intersectionRight?: string;
  streetType?: string;
  latitud?: string;
  longitud?: string;
  elementosDeRed?: string;
}

export const defaultValue: Readonly<IDireccion> = {};
