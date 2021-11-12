import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Product } from '../product';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  products: Product[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getProductsSmall().then((products) => {
      this.products = products;
    });
  }
}
