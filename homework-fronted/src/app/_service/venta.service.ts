import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Venta } from './../_model/venta';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VentaService extends GenericService<Venta>{

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/ventas`
    )
   }
}
