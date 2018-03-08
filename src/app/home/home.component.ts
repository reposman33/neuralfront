import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from '../I18n/i18n.service';
import { HomeLanguagepack } from './home.languagepack';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private i18nService: I18nService) {
    this.i18nService.initialize(HomeLanguagepack);
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
