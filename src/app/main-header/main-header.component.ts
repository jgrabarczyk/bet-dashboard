import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../configs/languages';

@Component({
  selector: 'bd-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  languages = LANGUAGES;
  currentLang = 'pl';
  constructor(
    private translate: TranslateService,

  ) {
    this.initializeTranslations();

  }

  setLanguage(lang: string) {
    this.currentLang = lang
    this.translate.use(this.currentLang);
  }

  private initializeTranslations() {
    this.translate.addLangs(this.languages);
    this.translate.setDefaultLang(this.currentLang);
    this.translate.use(this.currentLang);
  }
}
