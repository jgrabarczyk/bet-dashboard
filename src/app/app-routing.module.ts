import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketballComponent } from './pages/basketball/basketball.component';
import { FootbalComponent } from './pages/footbal/footbal.component';
import { HomeComponent } from './pages/home/home.component';
import { TenisComponent } from './pages/tenis/tenis.component';
import { BetsResolver } from './services/bets.resolver';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'football', component: FootbalComponent, resolve: { bets: BetsResolver } },
  { path: 'tenis', component: TenisComponent, resolve: { bets: BetsResolver } },
  { path: 'basketball', component: BasketballComponent, resolve: { bets: BetsResolver } }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
