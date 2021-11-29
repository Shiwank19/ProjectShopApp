import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allProducts: any[];
  filteredProducts: any[];
  searchText: string;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getItemDetailsAllData().subscribe(data => {
      this.allProducts = data;
      this.filter({'value': ''});
    });
  }

  filter(event: any) {
    const val = event.value;
    if (!!val) {
      this.filteredProducts = this.allProducts.filter(obj => obj[0].toLowerCase().startsWith(val.toLowerCase()) );
    } else {
      this.filteredProducts = this.allProducts;
    }
  }
}
