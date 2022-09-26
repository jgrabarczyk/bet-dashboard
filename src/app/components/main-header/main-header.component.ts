import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointService } from 'src/app/services/breakpoint-service';
import { LANGUAGES } from 'src/configs/languages';
import { SidenavService } from '../sidenav/sidenav.service';

@Component({
  selector: 'bd-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  languages = LANGUAGES;
  currentLang = 'pl';

  get isVisible() {
    return this.breakpointService.isMobile
  }

  constructor(
    private translate: TranslateService,
    private breakpointService: BreakpointService,
    private sidenavService: SidenavService
  ) {
    this.initializeTranslations();
  }

  setLanguage(lang: string) {
    this.currentLang = lang
    this.translate.use(this.currentLang);
  }

  toggleSideNav() {
    this.sidenavService.toggle();
  }

  private initializeTranslations() {
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }
}
