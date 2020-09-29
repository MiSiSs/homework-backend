import { DetalleVenta } from './detalleVenta';
import { Persona } from './persona';
export class Venta{
    idVenta: number;
    persona: Persona;
    importe: number;
    fecha: string;
    detalleVenta: DetalleVenta[];
}