import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ScrollTopModule } from 'primeng/scrolltop';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { OrderListModule } from 'primeng/orderlist';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ListboxModule } from 'primeng/listbox';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './nav-bar/nav-bar.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ContactComponent } from './contact/contact.component';
import { AppService } from './app.service';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { AdminConsoleComponent } from './admin-console/admin-console.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ProductComponent } from './product/product.component';
import { WindowRefService } from './window-ref.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SliderComponent,
    FooterComponent,
    CartComponent,
    SearchComponent,
    AnalysisComponent,
    ContactComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    AdminConsoleComponent,
    InventoryComponent,
    ProductComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    MessagesModule,
    MessageModule,
    TabMenuModule,
    DataViewModule,
    ScrollTopModule,
    ButtonModule,
    RatingModule,
    ChartModule,
    ToastModule,
    PanelModule,
    TableModule,
    OrderListModule,
    DropdownModule,
    DialogModule,
    ListboxModule,
    InputTextModule,
    RippleModule,
    AccordionModule,
    ConfirmDialogModule,
  ],
  providers: [
    AppService,
    MessageService,
    ConfirmationService,
    WindowRefService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
