import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScriptComponent } from './components/script';
import { registerComponent } from './components/registro/script.component';
import { LoginComponent } from './components/log/script.component';

const routes: Routes = [
  //Rutas para el registro, login y la pagina principal
  { path: '', component: registerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: ScriptComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
