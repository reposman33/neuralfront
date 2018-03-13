import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {I18nModel} from '../../assets/I18n/I18n.model';

@Injectable()
export class I18nService {
  public languageSelector: Subject<any> = new Subject();
  private languagePacks = {};
  private LANGUAGE_KEY_NOT_FOUND = ' -- ';

  constructor(private http: HttpClient) {
  }

  private getSelectedLanguage() {
    const setCookie = document.cookie.split("; ").find(el => el.indexOf("selectedLanguage") > -1);
    if (setCookie) {
      return setCookie.split("=")[1];
    } else {
      // use browser language
      return navigator.language.split('-')[0];
    }
  }

  private storeSelectedLanguage(selectedLanguage) {
    document.cookie = "selectedLanguage=" + selectedLanguage + "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
  }

  getKeyValue(key) {
    return this.languagePacks[this.getSelectedLanguage()][key].value || this.LANGUAGE_KEY_NOT_FOUND;
  }

  getKeyTitle(key) {
    return this.languagePacks[this.getSelectedLanguage()][key].title || this.LANGUAGE_KEY_NOT_FOUND;
  }

  initialize(languagePack){
    this.languagePacks = {...this.languagePacks, ...languagePack};
  }

  changeDefaultLanguage(language){
    this.languageSelector.next(language);
  }

  getKey(key, language = 'en') {
    return (this.languagePacks[key][language] || this.LANGUAGE_KEY_NOT_FOUND);
  }
}
