import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productName: string;
  category: string;
  description: string;
  cost: string;
  color: string;
  image_id: string;
  msgs: any[];
  added: boolean;
  constructor(
    private appService: AppService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.msgs = [];
    this.added = false;
    const id = this.activatedRoute.snapshot.params['id'];
    this.appService.getItemDetails(id).subscribe((d: any[]) => {
      d = d[0];
      this.productName = d[0];
      this.category = d[1];
      this.image_id = d[2];
      this.cost = d[3];
      this.description = d[4];
      this.color = d[5];
    });
  }

  add() {
    if (!this.added) {
      const newlyAdded: boolean = this.appService.addProduct({
        id: this.image_id,
        cost: this.cost,
        productName: this.productName,
      });
      if (newlyAdded)
        this.show(`Product '${this.productName}' has been added to the cart.`, 'success');
      else 
        this.show(`Product '${this.productName}' already in the cart.`, 'warn');
      
    } else {this.appService.removeProduct(this.image_id);
      this.show(`Product '${this.productName}' has been removed from the cart.`, 'success');
    }
    this.added = !this.added;
    setTimeout(() => {
      this.messageService.clear();
      this.appService.getCartDetails();
    }, 2000);
  }

  show(msg: string, severity: string) {
    this.messageService.add({
      severity: severity,
      summary: 'Cart Message',
      detail: msg,
    });
  }
}
