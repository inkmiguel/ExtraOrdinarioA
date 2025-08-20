import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { provideFirebaseApp, initializeApp} from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptComponent } from './components/script';

import { environment } from 'src/environments/environment';
import { registerComponent } from './components/registro/script.component';
import { LoginComponent } from './components/log/script.component';

@NgModule({
  declarations: [
    //Declaracion de cada componente de angular typescript
    AppComponent,
    ScriptComponent,
    registerComponent,
    LoginComponent
  ],
  imports: [
    //Declaraciones de angular y firebase
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(()=> initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
