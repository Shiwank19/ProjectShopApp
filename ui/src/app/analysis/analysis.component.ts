import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
  SelectItemGroup,
} from 'primeng/api';
import { AppService } from '../app.service';
import { Product } from '../classes/product';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class AnalysisComponent implements OnInit {
  basicData: any;

  basicOptions: any;

  groupedCities: SelectItemGroup[];

  selectedProduct: string;

  productDialog: boolean;
  products: Product[];
  product: Product;
  submitted: boolean;

  category_wise_item_count: any;
  chartOptions: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private appService: AppService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  loop(d: any) {
    console.log(d);
  }

  ngOnInit(): void {
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    this.groupedCities = [
      {
        label: 'Mobile',
        value: 'mobile',
        items: [
          { label: 'Nord', value: 'Nord' },
          { label: 'Oneplus', value: 'Oneplus' },
          { label: 'Samsung', value: 'Samsung' },
          { label: 'Redmi', value: 'Redmi' },
        ],
      },
      {
        label: 'Headphones',
        value: 'headphones',
        items: [
          { label: 'Boat', value: 'boat' },
          { label: 'JBL', value: 'JBL' },
          { label: 'Sennheiser', value: 'Sennheiser' },
          { label: 'Sony', value: 'Sony' },
        ],
      },
    ];

    this.appService.getMonthlyData().then((data) => {
      let monthly_data = data;
      console.log(monthly_data);
      for (let key in monthly_data) {
        let obj = { label: key, value: key, items: [] };
        //this.groupedCities.push(obj);
        this.loop(monthly_data[key]);
      }
    });
    this.appService.getProducts().then((data) => (this.products = data));

    this.primengConfig.ripple = true;

    this.appService.getCategoryWiseData().subscribe((jsonData) => {
      this.category_wise_item_count = {};
      this.category_wise_item_count.labels = Object.keys(jsonData);
      this.category_wise_item_count.datasets = [];

      let obj: any = {};
      let colors = [];
      let data = [];
      for (let i = 0; i < this.category_wise_item_count.labels.length; i++) {
        colors.push(this.gen_color());
        data.push(jsonData[this.category_wise_item_count.labels[i]]);
      }
      obj['data'] = data;
      obj['backgroundColor'] = colors;
      obj['hoverBackgroundColor'] = colors;
      this.category_wise_item_count.datasets.push(obj);
    });
    this.chartOptions = this.getLightTheme();
  }

  gen_color() {
    let out_color = '#';
    for (let i = 0; i < 6; i++) {
      out_color += Math.floor(Math.random() * 16).toString(16);
    }
    return out_color;
  }

  getLightTheme() {
    return {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
    };
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;
    let name = this.product.name?.trim() || '';
    if (name) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
