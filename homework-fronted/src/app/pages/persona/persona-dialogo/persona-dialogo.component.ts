import { PersonaService } from './../../../_service/persona.service';
import { Persona } from './../../../_model/persona';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-persona-dialogo',
  templateUrl: './persona-dialogo.component.html',
  styleUrls: ['./persona-dialogo.component.css']
})
export class PersonaDialogoComponent implements OnInit {

  persona: Persona;

  constructor(
    private personaService: PersonaService,
    private dialogRef: MatDialogRef<PersonaDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Persona) { }

  ngOnInit(): void {
    this.persona = new Persona();
    this.persona.idPersona = this.data.idPersona;
    this.persona.nombres = this.data.nombres;
    this.persona.apellidos = this.data.apellidos;
  
  }

  operar(){
    if(this.persona != null && this.persona.idPersona > 0){
      this.personaService.modificar(this.persona).pipe(switchMap(()=> {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio("Se modificó");
      });
    }else{
      this.personaService.registrar(this.persona).pipe(switchMap(()=> {
        return this.personaService.listar();
      })).subscribe(data => {
        this.personaService.setPersonaCambio(data);
        this.personaService.setMensajeCambio("Se Registro");
      });
    }
    this.cerrar();
  }

  cerrar(){
    this.dialogRef.close();
  }
}
