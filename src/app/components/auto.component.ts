import { Component } from "@angular/core";
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "@angular/fire/firestore";

@Component({
  selector: 'app-auto',
  templateUrl: './auto.html',
})
export class AutoComponent {
  auto: any = { id: '', modelo: '', año: '', marca: '', categoria: '', placas: '', usuario: '' };
  autos: any[] = [];
  editando: boolean = false;
  idEditando: string = '';

  constructor(private firestore: Firestore) {
    this.obtenerAutos();
    const usuario = localStorage.getItem('usuarioLogueado');
    if (usuario) {
      try {
        const userObj = JSON.parse(usuario);
        this.auto.usuario = userObj.usuario || userObj.nombre || userObj.email || 'Usuario';
      } catch {
        this.auto.usuario = usuario;
      }
    }
  }

  async agregarAuto() {
    if (this.editando) {
      await updateDoc(doc(this.firestore, 'autos', this.idEditando), this.auto);
      this.editando = false;
      this.idEditando = '';
    } else {
      await addDoc(collection(this.firestore, 'autos'), this.auto);
    }
    this.auto = { id: '', modelo: '', año: '', marca: '', categoria: '', placas: '', usuario: this.auto.usuario };
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
      await deleteDoc(doc(this.firestore, 'autos', car.docId));
      this.obtenerAutos();
    }
  }
}
