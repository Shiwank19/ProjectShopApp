import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './classes/product';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cartSubject = new Subject();
  public cartProducts: any[] = [];
  public isAdmin: boolean;
  private baseUrl = 'http://localhost:5000';
  private categoryCountUrl = `${this.baseUrl}/category-wise-item-count`;
  private categoryPurchaseUrl = `${this.baseUrl}/category-wise-purchase`;
  private itemCountUrl = `${this.baseUrl}/item-wise-item-count`;
  private itemPurchaseUrl = `${this.baseUrl}/item-wise-purchase`;
  private itemsDetailsAllUrl = `${this.baseUrl}/item-details-all`;
  private itemsDetailsUrl = `${this.baseUrl}/item-details`;
  private addItemUrl = `${this.baseUrl}/add-item`;
  private predictUrl = `${this.baseUrl}/item-predict`
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private http: HttpClient) {}

  getProductsSmall() {
    return this.http
      .get<any>('assets/products-small.json')
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getProducts() {
    return this.http
      .get<any>('assets/products.json')
      .toPromise()
      .then((res) => <Product[]>res.data)
      .then((data) => {
        return data;
      });
  }

  getMonthlyData() {
    return this.http
      .get<any>('assets/monthly_data.json')
      .toPromise()
      .then((data) => {
        return data;
      });
  }

  getCartDetails() {
    if (!!this.cartProducts.length) {
      this.cartSubject.next({
        total: this.cartProducts.reduce((pv, cv) => {
          return Number(pv) + Number(cv.cost);
        }, 0),
        items: this.cartProducts.length,
      });
    } else {
      this.cartSubject.next({
        total: 0,
        items: 0,
      });
    }
  }

  getCategoryWiseCountData() {
    return this.http.get<any>(this.categoryCountUrl).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getCategoryWiseCountData', []))
    );
  }

  getCategoryWisePurchaseData() {
    return this.http.get<any>(this.categoryPurchaseUrl).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getCategoryWisePurchaseData', []))
    );
  }

  getItemWiseCountData() {
    return this.http.get<any>(this.itemCountUrl).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getItemWiseCountData', []))
    );
  }

  getItemWisePurchaseData() {
    return this.http.get<any>(this.itemPurchaseUrl).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getItemWisePurchaseData', []))
    );
  }

  getItemDetailsAllData() {
    return this.http.get<any>(this.itemsDetailsAllUrl).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getItemDetailsAllData', []))
    );
  }

  getItemDetails(id: string) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<any[]>(this.itemsDetailsUrl, { params: params }).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getItemDetailsAllData', []))
    );
  }

  getPrediction() {
    return this.http.get<any>(this.predictUrl).pipe(
      tap((_) => console.log('fetched data')),
      catchError(this.handleError<any[]>('getPrediction', []))
    );
  }
  
  addProduct(cartItem: any): boolean {
    if (!this.cartProducts.some((c: any) => c.id == cartItem.id)) {
      this.cartProducts.push(cartItem);
      return true;
    } else {
      return false;
    }
  }

  addNewProduct(img: any) {
    var formData = new FormData();
    formData.append('imageone', img, img.name);
    return this.http
      .post<any>(this.addItemUrl, formData)
      .pipe(
        tap((_) => console.log('new Product Added')),
        catchError(this.handleError<any[]>('addNewProduct', []))
      );
  }

  removeProduct(cartId: any) {
    this.cartProducts = this.cartProducts.filter(
      (item: any) => item.id != cartId
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
