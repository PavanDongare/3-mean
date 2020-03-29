import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { retryWhen, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



export class ErrorInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any> , next: HttpHandler) {
    return next.handle(req).pipe( // handel gives stream of res
      catchError( (error)=> {
        console.log(error);
        alert(error.error.message);
        return throwError(error);
      })
    );
  }

}
