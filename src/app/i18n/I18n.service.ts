import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';
import {I18nModel} from '../../assets/I18n/I18n.model';

@Injectable()
export class I18nService {
  private languagePacks = <any>{};
  private NOT_FOUND = ' -- ';
  public languageSelector: Subject<any> = new Subject();

  constructor(private http: HttpClient) {
  }

  loadLanguagePack(): Promise<I18nModel> {
    const path = `../assets/I18n/I18n-${this.getSelectedLanguage()}.json`;
    return this.http.get(path, {responseType: 'json'})
      .toPromise()
      .then((language: I18nModel) => this.languagePacks[this.getSelectedLanguage()] = language
      )
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
    return this.languagePacks[this.getSelectedLanguage()][key].value || this.NOT_FOUND;
  }

  getKeyTitle(key) {
    return this.languagePacks[this.getSelectedLanguage()][key].title || this.NOT_FOUND;
  }

  changeDefaultLanguage(language) {
    this.storeSelectedLanguage(language);
    if (!this.languagePacks[this.getSelectedLanguage()]) {
      // retrieve language pack through http...
      this.loadLanguagePack()
        .then( () =>
          // ... and notify subscribers when data is retrieved
          this.languageSelector.next()
        )
    } else {
      // only notify subscribers
      this.languageSelector.next();
    }
  }
}
