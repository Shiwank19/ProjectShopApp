import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  @Input() isAnalysis: boolean;
  constructor() {}

  ngOnInit(): void {
    console.log(this.isAnalysis);
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/main/home'] },
      { label: 'Search', icon: 'pi pi-fw pi-search', routerLink: ['/main/search'] },
      { label: 'Catalogue', icon: 'pi pi-fw pi-calendar', routerLink: ['/main/products'] },
      { label: 'Cart', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/main/cart'] },
      { label: 'Analysis', icon: 'pi pi-fw pi-chart-line', routerLink: ['/main/analysis'] },
      { label: 'Contact', icon: 'pi pi-fw pi-cog' },
    ];
    if (!this.isAnalysis) {
      this.items = this.items.filter(data => data.label != 'Analysis');
    }
  }
}
