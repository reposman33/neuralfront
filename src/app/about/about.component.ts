import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
import { Router } from '@angular/router';
import {I18nService} from '../I18n/i18n.service';
import { AboutLanguagepack } from './about.languagepack';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @ViewChild('aboutModal') aboutModal: ModalDirective;

  constructor(private router: Router, private i18nService: I18nService) {
    this.i18nService.initialize(AboutLanguagepack)
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
