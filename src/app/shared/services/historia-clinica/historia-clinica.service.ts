import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface HistoriaClinicaDTO {
  fechaCreacion: string;
  sintomas: string;
  diagnostico: string;
  tratamiento: string;
  fechaUltimaActualizacion: string;
  observaciones: string;
  idMascota: number;
  idPersona: number;
}

@Injectable({
  providedIn: 'root',
})
export class HistoriaClinicaService {
  private baseUrl = 'http://localhost:8080/api/HistoriaClinica';

  constructor(private http: HttpClient) {}

  guardarHistoria(historia: HistoriaClinicaDTO): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Guardar`, historia);
  }
}