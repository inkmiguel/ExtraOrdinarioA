import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScriptComponent } from './components/script';

const routes: Routes = [
  { path: '', component: ScriptComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
