import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[];
  total: number;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.items = this.appService.cartProducts;
    this.appService.cartSubject.subscribe((data: any) => {
      this.total = data.total;
    });
    this.appService.getCartDetails();
  }

  remove(id: number) {
    this.appService.removeProduct(id);
    this.appService.getCartDetails();
    this.items = this.appService.cartProducts;
  }
}
