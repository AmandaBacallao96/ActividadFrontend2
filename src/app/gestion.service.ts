import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  private apiUrl = 'http://localhost:8000/api/'; // URL de tu API en Laravel

  constructor(private http: HttpClient) { }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  // Método genérico para obtener todos los registros de un modelo
  getAll(modelo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${modelo}`).pipe(
      catchError(this.handleError<any>('getAll', []))
    );
  }

  // Método genérico para obtener un registro por ID
  getById(modelo: string, id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${modelo}/${id}`).pipe(
      catchError(this.handleError<any>('getById'))
    );
  }

  // Método genérico para crear un nuevo registro
  create(modelo: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.post<any>(`${this.apiUrl}${modelo}`, data).pipe(
      catchError(this.handleError<any>('create'))
    );
  }

  // Método genérico para actualizar un registro
  update(modelo: string, id: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.put<any>(`${this.apiUrl}${modelo}/${id}`, data).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  // Método genérico para eliminar un registro
  delete(modelo: string, id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${modelo}/${id}`).pipe(
      catchError(this.handleError<any>('delete'))
    );
  }
}
