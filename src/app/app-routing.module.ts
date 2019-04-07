import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DespesaResolverGuard } from './guards/despesa-resolver.guard';

const routes: Routes = [
  { path: 'nova', loadChildren: './cadastro/cadastro.module#CadastroModule'},
  { path: 'editar/:id', loadChildren: './editar/editar.module#EditarModule', resolve: { despesa: DespesaResolverGuard } },
  { path: 'tabela', loadChildren: './tabela/tabela.module#TabelaModule' },
  { path: '', loadChildren: './graph/graph.module#GraphModule' },
  { path: '', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
