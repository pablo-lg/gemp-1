import { Moment } from 'moment';
import { ITipoObra } from 'app/shared/model/tipo-obra.model';

export interface IObra {
  id?: number;
  descripcion?: string;
  habilitada?: boolean;
  fechaFinObra?: string;
  tipoObra?: ITipoObra;
}

export const defaultValue: Readonly<IObra> = {
  habilitada: false,
};
