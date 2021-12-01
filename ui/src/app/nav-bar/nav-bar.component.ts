import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  @Input() isAdminConsole: boolean;
  constructor() {}

  ngOnInit(): void {
    if (this.isAdminConsole) {
      this.items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/main/home'] },
        { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/main/search'] },
        { label: 'Admin-Console', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/admin-console'] },
        { label: 'Contact', icon: 'pi pi-fw pi-cog', routerLink: ['/main/contact'] },
      ];
    } else {
      this.items = [
        { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/main/home'] },
        { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/main/search'] },
        { label: 'Cart', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/main/cart'] },
        { label: 'Contact', icon: 'pi pi-fw pi-cog', routerLink: ['/main/contact'] },
      ];
    }
  }
}
