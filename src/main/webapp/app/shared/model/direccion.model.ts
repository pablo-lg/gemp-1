export interface IDireccion {
  id?: number;
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
}

export const defaultValue: Readonly<IDireccion> = {};
