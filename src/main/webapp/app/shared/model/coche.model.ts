import { Moment } from 'moment';
import { IPropietario } from './propietario.model';
export interface ICoche {
  id?: number;
  nombre?: string;
  modelo?: string;
  precio?: number;
  vendido?: boolean;
  fechaventa?: Moment;
  propietario?: IPropietario;
}

export class Coche implements ICoche {
  constructor(
    public id?: number,
    public nombre?: string,
    public modelo?: string,
    public precio?: number,
    public vendido?: boolean,
    public fechaventa?: Moment,
    public propietario?: IPropietario
  ) {
    this.vendido = this.vendido || false;
  }
}
