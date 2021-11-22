import { Component, OnInit } from '@angular/core';
import { SelectItem, PrimeNGConfig } from 'primeng/api';
import { Product } from '../classes/product';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
})
export class CatalogueComponent implements OnInit {
  products: Product[];

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  sortKey: any;
  
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.products = [
      {
        category: 'Accessories',
        code: 'f230fh0g3',
        description: 'Product Description',
        id: '1000',
        image: 'bamboo-watch.jpg',
        inventoryStatus: 'INSTOCK',
        name: 'Bamboo Watch',
        price: 65,
        quantity: 24,
        rating: 5,
      },
      {
        category: 'Accessories',
        code: 'f230fh0g3',
        description: 'Product Description',
        id: '1000',
        image: 'bamboo-watch.jpg',
        inventoryStatus: 'INSTOCK',
        name: 'Bamboo Watch',
        price: 65,
        quantity: 24,
        rating: 5,
      },
      {
        category: 'Accessories',
        code: 'f230fh0g3',
        description: 'Product Description',
        id: '1000',
        image: 'bamboo-watch.jpg',
        inventoryStatus: 'INSTOCK',
        name: 'Bamboo Watch',
        price: 65,
        quantity: 24,
        rating: 5,
      },
      {
        category: 'Accessories',
        code: 'f230fh0g3',
        description: 'Product Description',
        id: '1000',
        image: 'bamboo-watch.jpg',
        inventoryStatus: 'INSTOCK',
        name: 'Bamboo Watch',
        price: 65,
        quantity: 24,
        rating: 5,
      },
      {
        category: 'Accessories',
        code: 'f230fh0g3',
        description: 'Product Description',
        id: '1000',
        image: 'bamboo-watch.jpg',
        inventoryStatus: 'INSTOCK',
        name: 'Bamboo Watch',
        price: 65,
        quantity: 24,
        rating: 5,
      },
    ];

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
