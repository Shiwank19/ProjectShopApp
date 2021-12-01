import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[];
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.items = this.appService.cartProducts;
  }

}
