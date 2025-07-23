import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Application } from '../../model/application.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsService {
  private applicationsSubject = new BehaviorSubject<Application[]>([]);
  public applications$ = this.applicationsSubject.asObservable();

  private baseApiUrl = environment.apiBaseUrl;
  
  private applicationUrl = this.baseApiUrl + '/api/applications';

  constructor(private http: HttpClient) {}

  // Método para obtener una aplicación por nombre
  getApplicationByName(strName: string): Observable<Application> {
    return this.http.get<Application>(`${this.applicationUrl}/${strName}`);
  }

  // Obtener una aplicación y sus opciones de menú por nombre de aplicación y nombre de rol
  getApplicationByNameAndRol(applicationName: string, rolName: string): Observable<Application> {
    const url = `${this.applicationUrl}/${applicationName}/rol/${rolName}`;    
    return this.http.get<Application>(url);
  }
}
