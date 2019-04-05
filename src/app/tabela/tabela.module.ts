import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaRoutingModule } from './tabela.routing.module';
import { TabelaComponent } from './tabela.component';

@NgModule({
  declarations: [TabelaComponent],
  imports: [
    CommonModule,
    TabelaRoutingModule,
  ]
})
export class TabelaModule { }
