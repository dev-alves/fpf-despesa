import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarComponent } from './editar.component';
import { EditarRoutingModule } from './editar.routing.module';

@NgModule({
  declarations: [EditarComponent],
  imports: [
    CommonModule,
    FormsModule,
    EditarRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EditarModule { }
