import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { AuthData } from './auth.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const BackendUrl = environment.apiUrl + '/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router ,private http: HttpClient) { }
  private token: string;
  private isAuthenticated: boolean ;
  private userId: string; // can use new user model to hold more data
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

  getUserId(){
    return this.userId;
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatus.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    this.userId = null;
    clearTimeout(this.tokenTimer);
  }

  createUser(email: string, password: string ) {
      const authData: AuthData = { email, password};
      return this.http.post( BackendUrl + '/signup', authData).subscribe(
        () => {
        // tslint:disable-next-line: no-unused-expression
        this.router.navigate['/'];
      }, error => {
        this.authStatus.next(false);
        console.log('signal to loader off');
      });
  }

  login(email: string , password: string) {
    const authData: AuthData = { email , password } ;
    this.http.post<{token: string, expiresIn: number, userId: string }>(BackendUrl + '/login', authData)
      .subscribe(response => {
        console.log(response);
        const token = response.token;
        if (token) {
          const expiresIn = response.expiresIn;
          this.setAuthTimer(expiresIn);
          this.token = token;
          this.authStatus.next(true);
          this.isAuthenticated = true;
          this.userId = response.userId;
          const expirationDate = new Date(this.now.getTime() + expiresIn * 1000);// since api res in in sec and we need milisec
          this.saveAuthData(token, expirationDate,this.userId);
          // console.log('backend expire time',expiresIn);
          // console.log('login current time',new Date(this.now.getTime()));
          // console.log('login setting, expires in ', new Date(this.now.getTime()+ expiresIn));
          this.router.navigate(['/']);
          console.log(expirationDate);
          console.log('time',this.now.getTime());

        }
      });
  }


  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log('authinfo is ', authInformation);
    const now = new Date();
    if(!authInformation) { return; } // to avoid error on next line
    const expiresIn : number = authInformation.expiration.getTime() - now.getTime() ;
    console.log('auto auth, expires in ', expiresIn);
    console.log('auto auth, store time,date ', new Date(authInformation.expiration));
    console.log('auto auth, present time, date ',new Date(now.getTime()) );
    if ( expiresIn > 0 ) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.authStatus.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  private setAuthTimer(duration: number) {
    console.log('expires in seconds',duration);
    this.tokenTimer = setTimeout (() => {
      this.logout();
    }, duration * 1000 );
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId =  localStorage.getItem('userId');
    if (!(token && expirationDate)) { return ; }

    return {
      token,
      expiration: new Date(expirationDate),
      userId
    };
  }

  private saveAuthData(token: string, expirationDate, userId: string){
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

}
