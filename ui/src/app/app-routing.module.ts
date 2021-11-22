import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis/analysis.component';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'home', component: HomeComponent },
      { path: 'search', component: SearchComponent },
      { path: 'products', component: CatalogueComponent },
      { path: 'analysis', component: AnalysisComponent },
      { path: '', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
