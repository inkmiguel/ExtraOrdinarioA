import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
    Firestore,
    collection,
    query,
    where,
    getDocs,
    addDoc
} from "@angular/fire/firestore";

@Component({
    selector: 'app-script',
    templateUrl: './index.html',
    styleUrls:['./styles.css']
})
export class ScriptComponent {

    constructor(private firestore: Firestore, private router: Router) {}

  guardarDato() {
    const datos = { nombre: 'Prueba', valor: 123 };
    const coleccion = collection(this.firestore, 'pruebas');
    addDoc(coleccion, datos)
      .then(() => alert('¡Dato guardado en Firestore!'))
      .catch(error => alert('Error: ' + error));
  }
}