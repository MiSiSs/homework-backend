import { Venta } from './../../_model/venta';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetalleVenta } from './../../_model/detalleVenta';
import { ProductoService } from './../../_service/producto.service';
import { PersonaService } from './../../_service/persona.service';
import { VentaService } from './../../_service/venta.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/_model/persona';
import { Producto } from 'src/app/_model/producto';
import * as moment from 'moment';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  persona$: Observable<Persona[]>;
  producto$: Observable<Producto[]>;

  idPersonaSeleccionada: number;
  idProductoSelccionado: number;

  importe: number;
  cantidad: number;

  maxFecha: Date = new Date();
  fechaSeleccionada: Date = new Date();
  detalleSeleccionados: DetalleVenta[]=[];

  constructor(
    private ventaService: VentaService,
    private personaService: PersonaService,
    private productoService: ProductoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.persona$ = this.personaService.listar();
    this.producto$ = this.productoService.listar();  
  }

  cambieFecha(e: any){}

  agregar(){

    if(this.idProductoSelccionado > 0 && this.cantidad != null){
      
      let cont = 0;

      for(let i = 0; i < this.detalleSeleccionados.length; i++){
        
        let detalle = this.detalleSeleccionados[i];

        if(detalle.producto.idProducto === this.idProductoSelccionado){
          cont++;
          break;
        }
      }

      if(cont > 0){
        let mensaje = 'El producto ya se encuentra en el carrito';
        this.snackBar.open(mensaje, "Aviso", {duration: 2000});
      }else{
        this.productoService.listarPorId(this.idProductoSelccionado).subscribe(data => {
          let det = new DetalleVenta();
          det.producto = data;
          det.cantidad = this.cantidad;
          this.detalleSeleccionados.push(det);
        });
      }
    }
  }

  remover(index: number){
    this.detalleSeleccionados.splice(index, 1);
  }

  aceptar(){
    let persona = new Persona();
    persona.idPersona = this.idPersonaSeleccionada;

    let venta = new Venta();

    venta.persona = persona;
    venta.importe = this.importe;
    venta.fecha = moment(this.fechaSeleccionada).format('YYYY-MM-DDTHH:mm:ss');
    venta.detalleVenta = this.detalleSeleccionados;

    this.ventaService.registrar(venta).subscribe( () =>{
      this.snackBar.open("Se registró","Aviso",{duration: 2000});

      setTimeout(()=>{
        this.limpiarControles();
      }, 2000);
    })
  }

  limpiarControles(){
    this.detalleSeleccionados = [];
    this.importe = null;
    this.idPersonaSeleccionada = 0;
    this.idProductoSelccionado = 0;
    this.cantidad = null;
  }

  estadoBotonRegistro(){
    return (this.detalleSeleccionados.length === 0 || 
      this.idPersonaSeleccionada === 0 || this.importe === 0);
  }
}
