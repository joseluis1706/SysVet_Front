import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseApiUrl = environment.apiBaseUrl;

  private userUrl = this.baseApiUrl + '/api/users';

  constructor(private http: HttpClient) {}

  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.post(`${this.userUrl}/${userId}/change-password`, {
      oldPassword,
      newPassword,
    });
  }
}
