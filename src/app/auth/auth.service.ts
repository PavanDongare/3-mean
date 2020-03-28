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
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        if(token) {
          this.token = token;
          this.authStatus.next(true);
          this.isAuthenticated = true;
        }


        console.log("sent");
        this.router.navigate(['/']);
      });
  }
}
