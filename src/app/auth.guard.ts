import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // Si el token está presente, el usuario está autenticado
      return true;
    } else {
      // Si no hay token, redirigir al login
      this.router.navigate(['/login']);
      return false;
    }
  }
}
