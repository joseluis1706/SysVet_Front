import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonaDTO } from '../persona/persona.service';

export interface MascotaDTO {
  nombreMascota: string;
  especieMascota: string;
  razaMascota: string;
  colorMascota: string;
  fechaNacimiento: string;
  sexoMascota: string;
  pesoMascota: number;
  estadoMascota: string;
  fotoMascota: string;
  idPersona: PersonaDTO;
}

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  private baseUrl = 'http://localhost:8080/api/Mascotas';

  constructor(private http: HttpClient) {}

  guardarMascota(mascota: MascotaDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Guardar`, mascota);
  }
}
