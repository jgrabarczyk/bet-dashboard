import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketballComponent } from './pages/basketball/basketball.component';
import { FootbalComponent } from './pages/footbal/footbal.component';
import { HomeComponent } from './pages/home/home.component';
import { TenisComponent } from './pages/tenis/tenis.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'football', component: FootbalComponent },
  { path: 'tenis', component: TenisComponent },
  { path: 'basketball', component: BasketballComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
