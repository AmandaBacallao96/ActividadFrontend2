import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {
    // Inicializamos el FormGroup con validaciones
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),  // Campo de email con validaciones
      password: new FormControl('', [Validators.required, Validators.minLength(6)])  // Campo de password con validaciones
    });
  }

  onSubmit() {
    // Verificamos si el formulario es válido antes de proceder
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      // Enviamos la solicitud POST al backend
      console.log('Enviando solicitud de login con credenciales:', credentials);
      
      this.http.post('http://localhost:8000/api/login', credentials).pipe(
        catchError((error) => {
          // Log del error
          console.error('Error en la solicitud:', error);
          
          if (error.status === 0) {
            this.errorMessage = 'No se pudo conectar con el servidor. Verifica tu conexión o el servidor.';
          } else if (error.status >= 400 && error.status < 500) {
            this.errorMessage = 'Error del cliente: ' + error.error?.message || error.message;
          } else if (error.status >= 500) {
            this.errorMessage = 'Error en el servidor. Inténtalo más tarde.';
          } else {
            this.errorMessage = 'Ha ocurrido un error inesperado. Intenta más tarde.';
          }

          return throwError(error);
        })
      ).subscribe(
        (response: any) => {
          console.log('Respuesta del servidor:', response);

          // Guardar el token JWT en localStorage
          localStorage.setItem('token', response.token);
          this.successMessage = 'Inicio de sesión exitoso. Redirigiendo...';
          this.errorMessage = '';  // Limpiar el mensaje de error
          
          // Redirigir al dashboard después de un pequeño retraso
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        },
        () => {
          console.log('Finalizó la solicitud');
        }
      );
    } else {
      // Si el formulario no es válido, mostrar un mensaje de error
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.successMessage = '';  // Limpiar el mensaje de éxito si lo hubiera
    }
  }
}
