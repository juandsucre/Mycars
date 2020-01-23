import { Moment } from 'moment';

export interface ICoche {
  id?: number;
  nombre?: string;
  modelo?: string;
  precio?: number;
  vendido?: boolean;
  fechaventa?: Moment;
  owner?: string;
}

export class Coche implements ICoche {
  constructor(
    public id?: number,
    public nombre?: string,
    public modelo?: string,
    public precio?: number,
    public vendido?: boolean,
    public fechaventa?: Moment,
    public owner?: string
  ) {
    this.vendido = this.vendido || false;
  }
}
