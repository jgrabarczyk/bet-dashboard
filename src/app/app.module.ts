import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';

import { MatTableModule } from '@angular/material/table';
import { TenisComponent } from './pages/tenis/tenis.component';
import { BasketballComponent } from './pages/basketball/basketball.component';
import { HomeComponent } from './pages/home/home.component';
import { FootbalComponent } from './pages/footbal/footbal.component';
import { SidenavService } from './sidenav/sidenav.service';
import { PageService } from './pages/abstract/page.service';
import { BasketComponent } from './basket/basket.component';
import { MatBottomSheetModule, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BasketCardComponent } from './basket-card/basket-card.component';
import { MatCardModule } from '@angular/material/card';
import { CartBetPipe } from './pipes/cart.pipe';
import { DecimalPipe } from '@angular/common';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const material = [
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatToolbarModule,
  // MatSlideToggleModule
  MatMenuModule,
  MatIconModule,
  MatTableModule,
  MatBottomSheetModule,
  MatCardModule
]

const materialProviders = [
  { provide: MatBottomSheetRef, useValue: {} },
  { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} }
]
@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    MainHeaderComponent,
    HomeComponent,
    TableComponent,
    FootbalComponent,
    TenisComponent,
    BasketballComponent,
    BasketComponent,
    BasketCardComponent,
    CartBetPipe
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    ...material
  ],
  providers: [SidenavService, PageService, ...materialProviders, CartBetPipe, DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
