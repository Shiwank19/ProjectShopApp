import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { Product } from './classes/product';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  cartSubject = new Subject();

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
    this.cartSubject.next({total: 100, items: 3});
  }
}
