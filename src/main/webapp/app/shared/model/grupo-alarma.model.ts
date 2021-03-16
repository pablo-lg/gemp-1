import { IGrupoEmprendimiento } from 'app/shared/model/grupo-emprendimiento.model';
import { IGrupoUsuario } from 'app/shared/model/grupo-usuario.model';

export interface IGrupoAlarma {
  id?: number;
  nombreGrupo?: string;
  alarmaTiempo?: number;
  alarmaSva?: number;
  alarmaBusinesscase?: number;
  grupoEmprendimiento?: IGrupoEmprendimiento;
  grupoUsuario?: IGrupoUsuario;
}

export const defaultValue: Readonly<IGrupoAlarma> = {};
