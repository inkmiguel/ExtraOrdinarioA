import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
    Firestore,
    collection,

    addDoc
} from "@angular/fire/firestore";

import { genereteID } from "../../plugins/id";

@Component({
    selector: 'app-script',
    templateUrl: './index.html',
    styleUrls: ['./styles.css']
})
export class registerComponent {
    nombre = '';
    usuario = '';
    correo = '';
    contrasena = '';

    constructor(private firestore: Firestore, private router: Router) {}

    async onSubmit() {
        try {
            // gaurdamos el usuario en users
            const userRef = collection(this.firestore, 'users');
            await addDoc(userRef, {
                id: genereteID(),
                nombre: this.nombre,
                usuario: this.usuario,
                email: this.correo,
                password: this.contrasena
            });
            alert('Usuario registrado exitosamente');
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Error registering user:', error);
        }
    }
}
