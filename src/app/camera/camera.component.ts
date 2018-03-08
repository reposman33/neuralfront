import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
import { I18nService } from '../I18n/i18n.service';
import { CameraLanguagepack } from './camera.languagepack';
import { Router } from '@angular/router';

@Component({
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit {
  @ViewChild('photoSnapModal') photoSnapModal: ModalDirective;

  constructor(private i18nService: I18nService, private router: Router) {
    this.i18nService.initialize(CameraLanguagepack)
  }

  ngAfterViewInit() {
    this.photoSnapModal.show();
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
