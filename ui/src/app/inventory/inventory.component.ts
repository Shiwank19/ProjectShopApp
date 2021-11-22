import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { AppService } from '../app.service';
import { Product } from '../classes/product';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class InventoryComponent implements OnInit {
  productDialog: boolean;
  products: Product[];
  product: Product;
  submitted: boolean;
  constructor(
    private primengConfig: PrimeNGConfig,
    private appService: AppService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.appService.getProducts().then((data) => (this.products = data));
    this.primengConfig.ripple = true;
  }

  saveProduct() {}

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }
}
