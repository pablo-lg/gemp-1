import { ISegmento } from 'app/shared/model/segmento.model';

export interface ITipoObra {
  id?: number;
  descripcion?: string;
  segmento?: ISegmento;
}

export const defaultValue: Readonly<ITipoObra> = {};
