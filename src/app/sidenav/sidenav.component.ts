import { Component, OnInit } from '@angular/core';
import { POPULAR_CATEGORIES_ROUTES } from '../../configs/routes';
import { SiteRoute } from '../../models/route';

@Component({
  selector: 'bd-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  routes: SiteRoute[] = POPULAR_CATEGORIES_ROUTES;
  constructor() { }

  ngOnInit(): void {
  }

}