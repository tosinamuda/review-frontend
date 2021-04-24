import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Path } from '../../utilities/path';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(public authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.authService.token){
      request = this.addToken(request, this.authService.token);
    }

    // return next.handle(request);

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.error(error);
        return throwError(error);
      })
    );
  }

  addToken(request: HttpRequest<any>, token) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  error(error: HttpErrorResponse) {
    if (error.status == 401) {
      this.router.navigate([Path.LOGIN]);
    }
  }

}
