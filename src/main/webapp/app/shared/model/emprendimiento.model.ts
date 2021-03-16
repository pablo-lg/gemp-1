import { Moment } from 'moment';
import { IObra } from 'app/shared/model/obra.model';
import { ITipoObra } from 'app/shared/model/tipo-obra.model';
import { ITipoEmp } from 'app/shared/model/tipo-emp.model';
import { IEstado } from 'app/shared/model/estado.model';
import { ICompetencia } from 'app/shared/model/competencia.model';
import { IDespliegue } from 'app/shared/model/despliegue.model';
import { INSE } from 'app/shared/model/nse.model';
import { ISegmento } from 'app/shared/model/segmento.model';
import { ITecnologia } from 'app/shared/model/tecnologia.model';
import { IEjecCuentas } from 'app/shared/model/ejec-cuentas.model';
import { IDireccion } from 'app/shared/model/direccion.model';

export interface IEmprendimiento {
  id?: number;
  nombre?: string;
  contacto?: string;
  fechaFinObra?: string;
  elementosDeRed?: string;
  clientesCatv?: string;
  clientesFibertel?: string;
  clientesFibertelLite?: string;
  clientesFlow?: string;
  clientesCombo?: string;
  lineasVoz?: string;
  mesesDeFinalizado?: string;
  altasBC?: string;
  penetracionVivLot?: string;
  penetracionBC?: string;
  demanda1?: string;
  demanda2?: string;
  demanda3?: string;
  demanda4?: string;
  lotes?: string;
  viviendas?: string;
  comProf?: string;
  habitaciones?: string;
  manzanas?: string;
  demanda?: string;
  fechaDeRelevamiento?: string;
  telefono?: string;
  anoPriorizacion?: string;
  contratoOpen?: string;
  negociacion?: boolean;
  estadoBC?: string;
  fecha?: string;
  codigoDeFirma?: string;
  fechaFirma?: string;
  observaciones?: string;
  comentario?: string;
  estadoFirma?: string;
  obra?: IObra;
  tipoObra?: ITipoObra;
  tipoEmp?: ITipoEmp;
  estado?: IEstado;
  competencia?: ICompetencia;
  despliegue?: IDespliegue;
  nSE?: INSE;
  segmento?: ISegmento;
  tecnologia?: ITecnologia;
  ejecCuentas?: IEjecCuentas;
  direccion?: IDireccion;
}

export const defaultValue: Readonly<IEmprendimiento> = {
  negociacion: false,
};
