import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  // Método para verificar si el usuario está autenticado verificando el token en localStorage
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('token');
  }
}
