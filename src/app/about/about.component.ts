import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @ViewChild('aboutModal') aboutModal: ModalDirective;

  constructor(private router: Router) { }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
