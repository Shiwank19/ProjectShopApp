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
  displayBasic2: boolean;
  uploadedFile: any;
  constructor(
    private primengConfig: PrimeNGConfig,
    private appService: AppService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const status = ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];
    this.appService.getProducts().then((data) => (this.products = data));
    this.appService.getItemDetailsAllData().subscribe((data: any[]) => {
      let products = [];
      for (let i = 0; i < data.length; i++) {
        products.push({
          name: data[i][0],
          description: 'Description',
          price: data[i][3],
          category: data[i][1],
          rating: Math.floor(Math.random() * 6),
          inventoryStatus: status[Math.floor(Math.random() * 3)],
        });
      }
      this.products = products;
    });
    this.primengConfig.ripple = true;
  }
  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  add() {
    this.displayBasic2 = false;
  }

  onBasicUpload(event: any) {
    this.uploadedFile = event.files[0];
    this.appService.addNewProduct(this.uploadedFile).subscribe((data) => {
      console.log('added product');
    });
  }

  cancel() {
    this.product = {};
    this.displayBasic2 = false;
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
