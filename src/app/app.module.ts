import { BrowserModule } from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { UploadService } from './upload.service';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { UploadComponent } from './upload/upload.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { PhotoSnapComponent } from './photo-snap/photo-snap.component';
import { HomeComponent } from './home/home.component';
import { I18nService } from './i18n/I18n.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    UploadComponent,
    HeaderComponent,
    PhotoSnapComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    UploadService,
    FormBuilder,
    RouterModule,
    I18nService
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
