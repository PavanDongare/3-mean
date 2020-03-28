import { AuthService } from './auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retryWhen } from 'rxjs/operators';


// interceptor is kind of service
@Injectable() // so we can inject auth
export class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any> , next: HttpHandler){
    // return next.handle(req); // this just takes req & allow to continue, a valid interceptor

    const token = this.authService.getToken();
    // we have to clone the req before manipulating
    const authReqest = req.clone({
      headers :  req.headers.set('authorization', 'bearer ' +token),
    });

    return next.handle(authReqest);
  }

}
