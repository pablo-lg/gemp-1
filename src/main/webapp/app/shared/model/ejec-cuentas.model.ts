import { ISegmento } from 'app/shared/model/segmento.model';

export interface IEjecCuentas {
  id?: number;
  telefono?: string;
  apellido?: string;
  celular?: string;
  mail?: string;
  nombre?: string;
  repcom1?: string;
  repcom2?: string;
  segmento?: ISegmento;
}

export const defaultValue: Readonly<IEjecCuentas> = {};
