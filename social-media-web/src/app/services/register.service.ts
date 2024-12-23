import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {RegisterRequestModel} from "../models/register-request.model";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) {
  }

  baseURL = 'http://localhost:8080/users/';

  register(dto: RegisterRequestModel): Observable<any> {
    console.log("servisteki register metoduna girdi");
    return this.http.post<any>(this.baseURL.concat('register'), dto)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server-side error: ${error.status} ${error.error.message}`;
    }
    // Return an observable with a user-facing error message
    return throwError({errorMessage: errorMessage});
  }

}
