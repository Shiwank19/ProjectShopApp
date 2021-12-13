import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css'],
})
export class PredictionComponent implements OnInit {
  discounted:any[];
  nextPurchase:any[];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getPrediction().subscribe((data) => {
      this.discounted = data.discount_id;
      this.nextPurchase = data.next_purchase_id;
    });
  }
}
