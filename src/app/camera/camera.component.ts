import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
import { I18nService } from '../I18n/i18n.service';
import { CameraLanguagepack } from './camera.languagepack';
import { Router } from '@angular/router';

@Component({
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit, OnInit {
  @ViewChild('photoSnapModal') photoSnapModal: ModalDirective;
  i18nContent = {};

  constructor(private i18nService: I18nService, private router: Router) {
    this.i18nService.initialize(CameraLanguagepack)
    this.i18nService.languageSelector.subscribe(language => this.initializeLanguage(language));
  }

  ngOnInit() {
    this.initializeLanguage();
  }

  ngAfterViewInit() {
    this.photoSnapModal.show();
  }

  initializeLanguage(language?) {
    this.i18nContent['modal_camera_title'] = this.i18nService.getKey('modal_camera_title', language);
  }

    navigateTo(route) {
    this.router.navigate([route]);
  }
}
