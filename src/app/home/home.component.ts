import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {I18nService} from '../I18n/i18n.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  about_card_text: string;
  upload_card_text: string;
  camera_card_text: string;
  introduction_text: string;

  constructor(private router: Router, private i18nService: I18nService) {
    this.i18nService.languageSelector.subscribe(() => this.initializeI18n());
  }

  ngOnInit() {
    this.initializeI18n();
  }

  initializeI18n() {
    this.about_card_text = this.i18nService.getKeyValue('about-card');
    this.upload_card_text = this.i18nService.getKeyValue('upload-card');
    this.camera_card_text = this.i18nService.getKeyValue('camera-card');
    this.introduction_text = this.i18nService.getKeyValue('introduction')
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
