import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I18nService } from "../i18n/I18n.service";
import { HomeLanguagepack } from './home.languagepack';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  i18nContent = {};

  constructor(private router: Router, private i18nService: I18nService) {
    this.i18nService.initialize(HomeLanguagepack);
    this.i18nService.languageSelector.subscribe(language => this.initializeLanguage(language));
  }

  ngOnInit(){
    this.initializeLanguage();
  }

  initializeLanguage(language?) {
    this.i18nContent['title'] = this.i18nService.getKey('title', language);
    this.i18nContent['intro'] = this.i18nService.getKey('intro', language);
    this.i18nContent['card_camera_title'] = this.i18nService.getKey('card_camera_title', language);
    this.i18nContent['card_camera_body'] = this.i18nService.getKey('card_camera_body', language);
    this.i18nContent['card_camera_button_text'] = this.i18nService.getKey('card_camera_button_text', language);
    this.i18nContent['card_upload_title'] = this.i18nService.getKey('card_upload_title', language);
    this.i18nContent['card_upload_body'] = this.i18nService.getKey('card_upload_body', language);
    this.i18nContent['card_upload_button_text'] = this.i18nService.getKey('card_upload_button_text', language);
    this.i18nContent['card_about_title'] = this.i18nService.getKey('card_about_title', language);
    this.i18nContent['card_about_body'] = this.i18nService.getKey('card_about_body', language);
    this.i18nContent['card_about_button_text'] = this.i18nService.getKey('card_about_button_text', language);
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
