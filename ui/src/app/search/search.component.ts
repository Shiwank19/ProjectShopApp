import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  allProducts: any[];
  searchText: string;
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getItemDetailsAllData().subscribe(data => {
      this.allProducts = data;
      console.log(this.allProducts);
    });
  }

}
