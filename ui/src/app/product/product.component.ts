import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng//api';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';
import { WindowRefService } from '../window-ref.service';

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
  order: any;
  isAdmin: boolean;
  constructor(
    private appService: AppService,
    private webService: WindowRefService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.msgs = [];
    this.added = false;
    this.isAdmin = this.appService.isAdmin;
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

  submit() {
    this.webService.createOrder(this.image_id).subscribe((data: any) => {
      console.log(data);
      this.order = data;
      this.payWithRazor();
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
        this.show(
          `Product '${this.productName}' has been added to the cart.`,
          'success'
        );
      else
        this.show(`Product '${this.productName}' already in the cart.`, 'warn');
    } else {
      this.appService.removeProduct(this.image_id);
      this.show(
        `Product '${this.productName}' has been removed from the cart.`,
        'success'
      );
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

  payWithRazor() {
    const options: any = {
      key: this.order.key,
      amount: 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: this.productName, // company name or product name
      description: '', // product description
      image: './assets/img/online-shop-logo.jpg', // company logo or product image
      order_id: this.order.id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#0c238a',
      },
    };
    options.handler = (response: any, error: any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      this.webService
        .savePaymentDetails({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        })
        .subscribe((data) => {
          this.show(
            `Product 'Transaction Success. Returning To homepage...`,
            'success'
          );
          setTimeout(() => {
            this.appService.cartProducts = [];
            this.appService.getCartDetails();
            this.router.navigate(['/main/home']);
          }, 1000);
        });
      // call your backend api to verify payment signature & capture transaction
    };
    options.modal.ondismiss = () => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    };
    const rzp = new this.webService.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
