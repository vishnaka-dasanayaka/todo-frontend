import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { env } from '../../envs/env';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser: { token?: string } | null = null;

    if (this.isBrowser) {
      const user = localStorage.getItem(
        `CognitoIdentityServiceProvider.${env.cognito.ClientId}.LastAuthUser`
      );
      const authToken = localStorage.getItem(
        `CognitoIdentityServiceProvider.${env.cognito.ClientId}.${user}.accessToken`
      );

      if (user && authToken) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
