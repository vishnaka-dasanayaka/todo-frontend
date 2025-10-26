import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { signOut } from 'aws-amplify/auth';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Convert async signOut() to Observable using `from()`
          return from(
            (async () => {
              try {
                await signOut();
              } catch (e) {
                console.error('Error signing out:', e);
              }

              localStorage.clear();
              this.router.navigate(['/signin']).then(() => {
                location.reload();
              });
            })()
          ).pipe(
            // After signOut completes, rethrow an error so app flow continues
            switchMap(() => throwError(() => err))
          );
        }

        const error = err.error?.message || err.statusText;
        return throwError(() => error);
      })
    );
  }
}
