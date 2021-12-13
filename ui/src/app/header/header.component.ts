import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  total: number;
  items: number;
  constructor(private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.total = 10;
    this.appService.cartSubject.subscribe((data: any) => {
      this.total = data.total;
      this.items = data.items;
    });
    this.appService.getCartDetails();
  }

  logout() {
    this.router.navigate(['/login'])
  }
}
