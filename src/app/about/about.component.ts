import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "angular-bootstrap-md/modals/modal.directive";
import { Router } from "@angular/router";
import { I18nService } from "../i18n/I18n.service";
import { AboutLanguagepack } from "./about.languagepack";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"]
})
export class AboutComponent implements OnInit {
  @ViewChild("aboutModal") aboutModal: ModalDirective;
  i18nContent = {};

  constructor(private router: Router, private i18nService: I18nService) {
    this.i18nService.initialize(AboutLanguagepack);
    this.i18nService.languageSelector.subscribe(language =>
      this.initializeLanguage(language)
    );
  }

  ngOnInit() {
    this.initializeLanguage();
  }

  initializeLanguage(language?) {
    this.i18nContent["modal_credits_body"] = this.i18nService.getKey(
      "modal_credits_body",
      language
    );
    this.i18nContent["popup_title"] = this.i18nService.getKey(
      "popup_title",
      language
    );
    this.i18nContent["popup_body"] = this.i18nService.getKey(
      "popup_body",
      language
    );
    this.i18nContent["button_credits_text"] = this.i18nService.getKey(
      "button_credits_text",
      language
    );
    this.i18nContent["button_howitworks_text"] = this.i18nService.getKey(
      "button_howitworks_text",
      language
    );
    this.i18nContent["modal_credits_title"] = this.i18nService.getKey(
      "modal_credits_title",
      language
    );
    this.i18nContent["modal_howitworks_title"] = this.i18nService.getKey(
      "modal_howitworks_title",
      language
    );
    this.i18nContent["modal_howitworks_body"] = this.i18nService.getKey(
      "modal_howitworks_body",
      language
    );
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
