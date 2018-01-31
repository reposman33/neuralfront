import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {UploadService} from './upload.service';
import {RouterModule} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PredictComponent } from './predict/predict.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PredictComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UploadService,
    FormBuilder,
    RouterModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
