import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScriptComponent } from './components/script';
import { registerComponent } from './components/registro/script.component';
import { LoginComponent } from './components/log/script.component';

const routes: Routes = [
  { path: '', component: registerComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
