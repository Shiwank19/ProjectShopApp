import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

function _window(): any {
  // return the global native browser window object
  return window;
}
@Injectable({
  providedIn: 'root',
})
export class WindowRefService {
  private baseUrl = 'http://localhost:5000';
  private createOrderURL = `${this.baseUrl}/create-order`;
  private savePaymentDetailsURL = `${this.baseUrl}/save-payment-details`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) {}
  get nativeWindow(): any {
    return _window();
  }

  createOrder(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<any[]>(this.createOrderURL, { params: params }).pipe(
      tap((_) => console.log('fetched order id')),
      catchError(this.handleError<any[]>('createOrder', []))
    );
  }

  savePaymentDetails(obj: any) {
    return this.http.post<any>(this.savePaymentDetailsURL, obj, this.httpOptions).pipe(
      tap((_) => console.log('saved payment details ')),
      catchError(this.handleError<any[]>('savePaymentDetails', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
