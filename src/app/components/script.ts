import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from "@angular/fire/firestore";

@Component({
    selector: 'app-script',
    templateUrl: './index.html',
    styleUrls:['./styles.css']
})
export class ScriptComponent {
  usuarioLogueado = '';
  auto = { id: '', modelo: '', ano: '', marca: '', categoria: '', placas: '', usuario: '' };
  autos: any[] = [];

  constructor(private firestore: Firestore) {
    // obtener el usuario logueado y si no existe, asignamos invitado
    const usuario = localStorage.getItem('usuarioLogueado');
    let userObj: any = {};
    if (usuario) {
      try {
        userObj = JSON.parse(usuario);
      } catch {
        userObj = { usuario };
      }
      this.usuarioLogueado = userObj.nombre || userObj.usuario || userObj.email || 'Usuario';
      this.auto.usuario = userObj.usuario || userObj.nombre || userObj.email || 'Usuario';
    } else {
      this.usuarioLogueado = 'Invitado';
      this.auto.usuario = 'Invitado';
    }
    this.obtenerAutos();
  }

  async agregarAuto() {
    // agregar en la tabla auto y le pasamos el usuario
    await addDoc(collection(this.firestore, 'autos'), this.auto);
    this.auto = { id: '', modelo: '', ano: '', marca: '', categoria: '', placas: '', usuario: this.auto.usuario };
    this.obtenerAutos();
  }

  async obtenerAutos() {
    const querySnapshot = await getDocs(collection(this.firestore, 'autos'));
    this.autos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id, docId: doc.id }));
  }


  async eliminarAuto(id: string) {
    const car = this.autos.find(a => a.id === id);
    if (car) {
      await deleteDoc(doc(this.firestore, 'autos', car.docId));
      this.obtenerAutos();
    }
  }
}