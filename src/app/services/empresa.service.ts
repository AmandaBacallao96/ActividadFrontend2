import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  constructor(private http: HttpClient) {}

  getAll(endpoint: string): Observable<any> {
    return this.http.get(`/api/${endpoint}`);
  }
}
