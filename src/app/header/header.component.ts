import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {I18nService} from '../i18n/I18n.service';
import {ButtonI18nModel} from '../Shared/button-i18n.model';

@Component({
  selector: 'app-header',
  templateUrl: './header-new.component.html',
  styleUrls: ['./header-new.component.css']
})
export class HeaderComponent implements OnInit{
  buttonLabels: ButtonI18nModel;

  constructor(private router: Router, private i18nService: I18nService) {
  }

  ngOnInit(){
  }

  initializeI18n () {
    this.buttonLabels.texts.cameraButton.buttonText = this.i18nService.getKeyValue('header-button-camera');
    this.buttonLabels.texts.cameraButton.titleText = this.i18nService.getKeyTitle('header-button-camera');
    this.buttonLabels.texts.photoButton.buttonText = this.i18nService.getKeyValue('header-button-photo');
    this.buttonLabels.texts.photoButton.titleText = this.i18nService.getKeyTitle('header-button-photo');
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }

}
