import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from '../Models/login.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private auth_token: string;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.auth_token = localStorage.getItem('token');
  }

  public setLogin(token: LoginModel) {
    if (!token || !token.access_token) {
      this.clearToken();
      return;
    }
    this.auth_token = token.access_token;
    localStorage.setItem('token', this.auth_token);
  }

  private clearToken() {
    this.auth_token = null;
    localStorage.removeItem('token');
  }

  public hasToken() {
    return Boolean(this.auth_token);
  }

  public get<T>(url: string): Observable<T> {
    return this._httpClient.get<T>(
      this.getUrl(url),
      this.getConfig()
    );
  }

  post<T>(url: string, data: Object = {}): Observable<T> {
    return this._httpClient.post<T>(
      this.getUrl(url),
      data,
      this.getConfig()
    );
  }

  put<T>(url: string, data: Object = {}): Observable<T> {
    return this._httpClient.put<T>(
      this.getUrl(url),
      data,
      this.getConfig()
    );
  }

  delete<T>(url: string): Observable<T> {
    return this._httpClient.delete<T>(
      this.getUrl(url),
      this.getConfig()
    );
  }

  private getUrl(path: string): string {
    return `${environment.apiUrl}/api${path}`;
  }

  private getConfig() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.auth_token}`
      })
    };
  }

}
