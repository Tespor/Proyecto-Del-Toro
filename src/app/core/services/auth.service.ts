import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'jwt'

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, { email, password });
  }
  // login(email: string, password: string): Observable<any>{
  //   return this.http.post<any>('http://localhost:3000/login', {email, password}).pipe(
  //     tap(response => {
  //       if(response.token){
  //         console.log(`Este es tu token:`, response.token);
  //         this.setToken(response.token);
  //       }
  //     })
  //   )
  // }

  seveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if(!token){
      return false;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000; // convertir a milisegundos
      return Date.now() < exp;
    } catch (e) {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

  


}
