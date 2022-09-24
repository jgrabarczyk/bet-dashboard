import { Component, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../configs/languages';
import { SidenavService } from '../sidenav/sidenav.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'bd-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  languages = LANGUAGES;
  currentLang = 'pl';

  get isVisible() {
    return this.sidenavService.isMobile
  }

  constructor(
    private translate: TranslateService,
    private sidenavService: SidenavService,
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
