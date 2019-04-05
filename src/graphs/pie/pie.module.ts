import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieComponent } from './pie.component';
import { PieRoutingModule } from './pie.routing.module';

@NgModule({
  declarations: [PieComponent],
  imports: [
    CommonModule,
    PieRoutingModule,
  ]
})
export class PieModule { }
