import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Firestore, collection, query, where, getDocs } from "@angular/fire/firestore";

@Component({
    selector: 'app-script',
    templateUrl: './index.html',
})
export class LoginComponent {
    correo: string = '';
    contrasena: string = '';

    constructor(private firestore: Firestore, private router: Router) { }

    async onLogin() {
        try {
            const userRef = collection(this.firestore, 'users');
            const q = query(userRef, where('email', '==', this.correo), where('password', '==', this.contrasena));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                alert('¡Login exitoso!');
                this.router.navigate(['/home']);
            } else {
                alert('Correo o contraseña incorrectos');
            }
        } catch (error) {
            alert('Error al iniciar sesión');
            console.error("Error logging in:", error);
        }
    }
}