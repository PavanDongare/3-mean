import { ErrorComponent } from './error/error/error.component';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { retryWhen, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import {  MatDialog } from '@angular/material';

// dynamically creating error component

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{

  constructor(private matDialog : MatDialog){}



  intercept(req: HttpRequest<any> , next: HttpHandler) {
    return next.handle(req).pipe( // handel gives stream of res
      catchError( (error)=> {
        console.log(error);
        this.matDialog.open(ErrorComponent);
        alert(error.error.message);
        return throwError(error);
      })
    );
  }

}
