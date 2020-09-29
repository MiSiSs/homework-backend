import { switchMap } from 'rxjs/operators';
import { Producto } from './../../../_model/producto';
import { ProductoService } from './../../../_service/producto.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombre': new FormControl(''),
      'marca': new FormControl('')
    });

    this.route.params.subscribe((data: Params)=> {
      this.id = data['id'];
      this.edicion = data['id']!= null;
      this.initFrom();
    })
  }

  initFrom(){ 
    if(this.edicion){
      this.productoService.listarPorId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          "id": new FormControl(data.idProducto),
          'nombre':new FormControl(data.nombre),
          'marca': new FormControl(data.marca)
        })
      })
    }
  }

  operar(){
    if (this.form.invalid) { return; }
    console.log(this.form);
    let producto = new Producto();
    producto.idProducto = this.form.value['id'];
    producto.nombre = this.form.value['nombre'];
    producto.marca = this.form.value['marca'];

    if(this.edicion){
      this.productoService.modificar(producto).pipe(switchMap(()=>{
        return this.productoService.listar();
      })).subscribe(data => {
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio("Se modificó");
      })
    }else{
      this.productoService.registrar(producto).pipe(switchMap(()=>{
        return this.productoService.listar();
      })).subscribe(data =>{
        this.productoService.setProductoCambio(data);
        this.productoService.setMensajeCambio("Se registró");
      })
    }

    this.router.navigate(['producto']);
  }
}
