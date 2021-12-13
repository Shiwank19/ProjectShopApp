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

  category_wise_item_count: any;
  item_wise_item_count: any;
  chartOptions: any;

  multiAxisCategoryData: any;
  multiAxisItemData: any;
  multiAxisOptions: any;

  constructor(
    private primengConfig: PrimeNGConfig,
    private appService: AppService
  ) {}

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

    // this.appService.getMonthlyData().then((data) => {
    //   let monthly_data = data;
    //   for (let key in monthly_data) {
    //     let obj = { label: key, value: key, items: [] };
    //   }
    // });

    this.primengConfig.ripple = true;

    this.appService.getCategoryWiseCountData().subscribe((jsonData) => {
      this.category_wise_item_count = {};
      this.populatePieChart(jsonData, this.category_wise_item_count);
    });
    this.appService.getItemWiseCountData().subscribe((jsonData) => {
      this.item_wise_item_count = {};
      this.populatePieChart(jsonData, this.item_wise_item_count);
    });
    this.appService.getCategoryWisePurchaseData().subscribe((jsonData) => {
      let sales = jsonData['sale price'];
      this.multiAxisCategoryData = {};
      this.populateBarChart(sales, this.multiAxisCategoryData);
    });
    this.appService.getCategoryWisePurchaseData().subscribe((jsonData) => {
      let sales = jsonData['sale price'];
      this.multiAxisCategoryData = {};
      this.populateBarChart(sales, this.multiAxisCategoryData);
    });
    this.appService.getItemWisePurchaseData().subscribe((jsonData) => {
      let sales = jsonData['sale price'];
      this.multiAxisItemData = {};
      this.populateBarChart(sales, this.multiAxisItemData);
    });

    this.chartOptions = this.getLightTheme();
    this.multiAxisOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
        tooltips: {
          mode: 'index',
          intersect: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          grid: {
            drawOnChartArea: false,
            color: '#ebedef',
          },
          ticks: {
            min: 0,
            max: 100,
            color: '#495057',
          },
        },
      },
    };
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

  populateBarChart(jsonData: any, dataObj: any) {
    dataObj.labels = Object.keys(jsonData);
    dataObj.datasets = [];

    let obj: any = {};
    let colors = [];
    let data = [];
    for (let i = 0; i < dataObj.labels.length; i++) {
      colors.push(this.gen_color());
      data.push(jsonData[dataObj.labels[i]]);
    }
    obj['data'] = data;
    obj['label'] = 'Total Sale';
    obj['backgroundColor'] = colors;
    obj['yAxisID'] = 'y';
    dataObj.datasets.push(obj);
  }

  populatePieChart(jsonData: any, dataObj: any) {
    dataObj.labels = Object.keys(jsonData);
    dataObj.datasets = [];

    let obj: any = {};
    let colors = [];
    let data = [];
    for (let i = 0; i < dataObj.labels.length; i++) {
      colors.push(this.gen_color());
      data.push(jsonData[dataObj.labels[i]]);
    }
    obj['data'] = data;
    obj['backgroundColor'] = colors;
    obj['hoverBackgroundColor'] = colors;
    dataObj.datasets.push(obj);
  }
}
