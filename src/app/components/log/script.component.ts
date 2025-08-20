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
})
export class registerComponent {
    constructor(private firestore: Firestore, private router: Router) { }

    async registerUser(email: string, password: string) {
        try {
            const userRef = collection(this.firestore, 'users');
            await addDoc(userRef, { email, password });
            this.router.navigate(['/login']);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    }
}