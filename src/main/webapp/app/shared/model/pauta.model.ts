import { IMasterTipoEmp } from 'app/shared/model/master-tipo-emp.model';

export interface IPauta {
  id?: number;
  anios?: number;
  tipoPauta?: string;
  masterTipoEmp?: IMasterTipoEmp;
}

export const defaultValue: Readonly<IPauta> = {};
