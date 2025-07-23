import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialsService {

  private baseApiUrl = environment.apiBaseUrl;

  private materialsUrl = this.baseApiUrl + '/api/materials';

  constructor(private http: HttpClient) {}

  // Obtener materiales
  getMaterials(): Observable<any[]> {
    return this.http.get<any[]>(this.materialsUrl);
  }

  // 🔹 Agregar el método deleteMaterial()
  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${this.materialsUrl}/${id}`);
  }
}
