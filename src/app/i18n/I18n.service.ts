import {HttpClient} from '@angular/common/http';
import {Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {I18nModel} from '../Shared/i18n.model';

@Injectable()
export class I18nService {
  selectedLanguage: string;
  I18nLanguages: object;
  I18nLanguageURI = {en: 'assets/I18n/I18n-en.json', nl: 'assets/I18n/I18n-nl.json'};

  constructor(private http: HttpClient) {
    this.getLanguageFile('nl')
  }

  getLanguageFile(language) {
    this.http.get(this.I18nLanguageURI[language])
      .subscribe(response => this.I18nLanguages = response);
  }

  getKeyValue(key) {
    return this.I18nLanguages[this.selectedLanguage][key].value;
  }

  getKeyTitle(key) {
    return this.I18nLanguages[this.selectedLanguage][key].title;
  }

  initializeLanguage(language) {
    this.selectedLanguage = language;
  }

  getLanguage() {
    return this.selectedLanguage;
  }
}
