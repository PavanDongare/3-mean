import { Router } from '@angular/router';
import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router ,private http: HttpClient) { }

createUser(email: string, password: string ) {
      const authData : AuthData = { email :email, password:password};
      this.http.post("http://localhost:3000/api/user/signup",authData)
      .subscribe(response => {
        console.log(response);
        this.router.navigate(['/']);
      });
  }

  login(email: string , password: string) {
    const authData : AuthData = { email:email, password:password};
    this.http.post("http://localhost:3000/api/user/login",authData)
      .subscribe(result=>{
        console.log(result);
        this.router.navigate(['/']);
      });
  }
}
