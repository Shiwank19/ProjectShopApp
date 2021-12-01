import { HttpClient, HttpParams } from '@angular/common/http';
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
  private baseUrl = 'http://localhost:5000';
  private categoryCountUrl = `${this.baseUrl}/category-wise-item-count`;
  private categoryPurchaseUrl = `${this.baseUrl}/category-wise-purchase`;
  private itemCountUrl = `${this.baseUrl}/item-wise-item-count`;
  private itemPurchaseUrl = `${this.baseUrl}/item-wise-purchase`;
  private itemsDetailsAllUrl = `${this.baseUrl}/item-details-all`;
  private itemsDetailsUrl = `${this.baseUrl}/item-details`;

  productNames: string[] = [
    'Bamboo Watch',
    'Black Watch',
    'Blue Band',
    'Blue T-Shirt',
    'Bracelet',
    'Brown Purse',
    'Chakra Bracelet',
    'Galaxy Earrings',
    'Game Controller',
    'Gaming Set',
    'Gold Phone Case',
    'Green Earbuds',
    'Green T-Shirt',
    'Grey T-Shirt',
    'Headphones',
    'Light Green T-Shirt',
    'Lime Band',
    'Mini Speakers',
    'Painted Phone Case',
    'Pink Band',
    'Pink Purse',
    'Purple Band',
    'Purple Gemstone Necklace',
    'Purple T-Shirt',
    'Shoes',
    'Sneakers',
    'Teal T-Shirt',
    'Yellow Earbuds',
    'Yoga Mat',
    'Yoga Set',
  ];

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
    this.cartSubject.next({ total: 100, items: 3 });
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
