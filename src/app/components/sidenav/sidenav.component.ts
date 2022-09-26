import { Component, OnInit } from '@angular/core';


import { SidenavService } from './sidenav.service';
import { SiteRoute } from '../../../models/route';
import { POPULAR_CATEGORIES_ROUTES } from 'src/configs/routes';

@Component({
  selector: 'bd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes: SiteRoute[] = POPULAR_CATEGORIES_ROUTES;
  constructor(private sidenavService: SidenavService) { }

  ngOnInit(): void {
  }
  closeSidenav() {
    this.sidenavService.close();
  }
}
