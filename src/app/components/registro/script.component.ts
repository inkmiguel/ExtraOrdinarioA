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

import { User } from "src/app/template/registro";
import { genereteID } from "../../plugins/id";


const user:User = {
    id: '',
    password: '',
    email: '',
    modelo: '',
    año: 2025,
    category: '',
    placas: ''
}

@Component({
    selector: 'app-script',
    templateUrl: './index.html',
    styleUrls: ['./styles.css']
})
export class registerComponent {
    id: string = '';
    usuario: string = '';
    correo: string = '';
    contrasena: string = '';

    constructor(private firestore: Firestore, private router: Router) { }

    async onSubmit() {
        try {
            this.id = genereteID();
            const userRef = collection(this.firestore, 'users');
            await addDoc(userRef, {
                id: this.id,
                usuario: this.usuario,
                email: this.correo,
                password: this.contrasena
            });
            alert('Usuario registrado exitosamente');
            this.router.navigate(['/login']);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }
}
