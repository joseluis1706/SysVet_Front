import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PersonaDTO {
  idPersona: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  direccion: string;
  contraseña: string;
}

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  private baseUrl = 'http://localhost:8080/api/Personas';

  constructor(private http: HttpClient) {}

  crearPersona(persona: PersonaDTO): Observable<PersonaDTO> {
    return this.http.post<PersonaDTO>(`${this.baseUrl}/Crear`, persona);
  }
}