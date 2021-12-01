import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productName: string;
  category: string;
  description: string;
  cost: string;
  color: string;
  image_id: string;
  constructor() { }

  ngOnInit(): void {
    this.productName = 'Fantasy T-shirt';
    this.category = 'Shirts';
    this.description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
    sapiente illo. Sit error voluptas repellat rerum quidem, soluta enim
    perferendis voluptates laboriosam. Distinctio, officia quis dolore quos
    sapiente tempore alias.`;
    this.cost = '12.99';
    this.color = 'Black';
    this.image_id = '2';
  }

}
