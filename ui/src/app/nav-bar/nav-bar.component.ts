import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  constructor() {}

  ngOnInit(): void {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      { label: 'Search', icon: 'pi pi-fw pi-search' },
      { label: 'Cart', icon: 'pi pi-fw pi-calendar', routerLink: ['/cart'] },
      { label: 'Checkout', icon: 'pi pi-fw pi-pencil' },
      { label: 'Analysis', icon: 'pi pi-fw pi-chart-line' },
      { label: 'Contact', icon: 'pi pi-fw pi-cog' },
    ];
  }
}
