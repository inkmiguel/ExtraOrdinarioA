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
  usuarioLogueado: string = '';
  auto: any = { id: '', modelo: '', ano: '', marca: '', categoria: '', placas: '', usuario: '' };
  autos: any[] = [];
  editando: boolean = false;
  idEditando: string = '';

  constructor(private firestore: Firestore, private router: Router) {
    // Obtener solo el nombre del usuario si es un JSON
    const usuario = localStorage.getItem('usuarioLogueado');
    if (usuario) {
      try {
        const userObj = JSON.parse(usuario);
        this.usuarioLogueado = userObj.usuario || userObj.nombre || userObj.email || 'Usuario';
        this.auto.usuario = this.usuarioLogueado;
      } catch {
        this.usuarioLogueado = usuario;
        this.auto.usuario = usuario;
      }
    } else {
      this.usuarioLogueado = 'Invitado';
      this.auto.usuario = 'Invitado';
    }
    this.obtenerAutos();
  }

  async agregarAuto() {
    if (this.editando) {
      // Actualizar auto existente
      const docId = this.idEditando;
      const docRef = (await import("@angular/fire/firestore")).doc(this.firestore, 'autos', docId);
      await (await import("@angular/fire/firestore")).updateDoc(docRef, this.auto);
      this.editando = false;
      this.idEditando = '';
    } else {
      await addDoc(collection(this.firestore, 'autos'), this.auto);
    }
    this.auto = { id: '', modelo: '', ano: '', marca: '', categoria: '', placas: '', usuario: this.usuarioLogueado };
    this.obtenerAutos();
  }

  async obtenerAutos() {
    const querySnapshot = await getDocs(collection(this.firestore, 'autos'));
    this.autos = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.data().id, docId: doc.id }));
  }

  editarAuto(car: any) {
    this.auto = { ...car };
    this.editando = true;
    this.idEditando = car.docId;
  }

  async eliminarAuto(id: string) {
    const car = this.autos.find(a => a.id === id);
    if (car) {
      const docRef = (await import("@angular/fire/firestore")).doc(this.firestore, 'autos', car.docId);
      await (await import("@angular/fire/firestore")).deleteDoc(docRef);
      this.obtenerAutos();
    }
  }
}