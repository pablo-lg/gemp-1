export interface IGrupoEmprendimiento {
  id?: number;
  descripcion?: string;
  esProtegido?: boolean;
}

export const defaultValue: Readonly<IGrupoEmprendimiento> = {
  esProtegido: false,
};
