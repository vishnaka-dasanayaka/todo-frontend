import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GlobalVariable } from './globals';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private BaseAPIurl = GlobalVariable.BaseUrl + 'api/tasks';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse | any) {
    console.error('TaskService::handleError', error);
    return throwError(() => error);
  }

  createTask(obj: any) {
    let APIurl = this.BaseAPIurl;

    return this.http.post<any>(APIurl, obj).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getFiveTasks(): Observable<any> {
    let APIurl = this.BaseAPIurl;

    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateTaskStatus(obj: any) {
    console.log(obj);

    let APIurl = this.BaseAPIurl + '/' + obj.id + '/' + obj.status + '';

    return this.http.put<any>(APIurl, {}).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  updateTask(obj: any) {
    console.log(obj);

    let APIurl = this.BaseAPIurl;

    return this.http.put<any>(APIurl, obj).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }

  getDashboardData() {
    let APIurl = this.BaseAPIurl + '/data';

    return this.http.get<any>(APIurl).pipe(
      map((response) => {
        return response;
      }),
      catchError(this.handleError)
    );
  }
}
