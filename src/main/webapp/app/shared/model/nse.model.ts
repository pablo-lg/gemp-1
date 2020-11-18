export interface INSE {
  id?: number;
  descripcion?: string;
  activo?: boolean;
}

export const defaultValue: Readonly<INSE> = {
  activo: false,
};
