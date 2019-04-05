import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'nova', loadChildren: './cadastro/cadastro.module#CadastroModule' },
  { path: 'tabela', loadChildren: './tabela/tabela.module#TabelaModule' },
  { path: '', loadChildren: '../graphs/pie/pie.module#PieModule' },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
