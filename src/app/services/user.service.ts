import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalVariable } from './globals';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private BaseAPIurl = GlobalVariable.BaseUrl + 'api/users';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse | any) {
    console.error('UserService::handleError', error);
    return throwError(() => error);
  }

  createUser(obj: any) {
    let APIurl = this.BaseAPIurl;

    return this.http.post<any>(APIurl, obj).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
