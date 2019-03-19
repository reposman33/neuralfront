import { Component } from "@angular/core";
import { I18nService } from "../i18n/I18n.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  constructor(private i18nService: I18nService) {}

  changeDefaultLanguage(language) {
    this.i18nService.changeDefaultLanguage(language);
  }
}
