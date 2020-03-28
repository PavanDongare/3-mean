import { Router } from '@angular/router';
import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated: boolean ;
  private tokenTimer: any;
  private now : Date = new Date;

  private authStatus = new Subject<boolean>();
  getToken() {
    return this.token;
  }

  getAuthStatus() {
    return this.authStatus.asObservable();
  }

  getAuthStatusFirst() {
    return this.isAuthenticated;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
    this.router.navigate(['/']);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }

  constructor(private router : Router ,private http: HttpClient) { }






  createUser(email: string, password: string ) {
      const authData: AuthData = { email, password};
      this.http.post('http://localhost:3000/api/user/signup', authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

  login(email: string , password: string) {
    const authData: AuthData = { email , password } ;
    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        if (token) {
          const expiresIn = response.expiresIn * 1000;
          this.tokenTimer = setTimeout(()=> {
            this.logout();
          },expiresIn)
          this.token = token;
          this.authStatus.next(true);
          this.isAuthenticated = true;
          const expirationDate = new Date(this.now.getTime()+ expiresIn)
          this.saveAuthData(token, expirationDate);
          console.log(expirationDate);
          console.log("time",this.now.getTime());
          this.router.navigate(['/']);
        }
      });
  }

  private saveAuthData (token: string, expirationDate){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

}
