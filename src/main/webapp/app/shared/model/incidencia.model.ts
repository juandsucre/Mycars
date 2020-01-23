import { ICoche } from 'app/shared/model/coche.model';

export interface IIncidencia {
  id?: number;
  descripcion?: string;
  tipo?: string;
  incidenciacoche?: ICoche;
}

export class Incidencia implements IIncidencia {
  constructor(public id?: number, public descripcion?: string, public tipo?: string, public incidenciacoche?: ICoche) {}
}
