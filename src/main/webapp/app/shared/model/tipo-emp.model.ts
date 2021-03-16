import { IMasterTipoEmp } from 'app/shared/model/master-tipo-emp.model';

export interface ITipoEmp {
  id?: number;
  descripcion?: string;
  valor?: string;
  masterTipoEmp?: IMasterTipoEmp;
}

export const defaultValue: Readonly<ITipoEmp> = {};
