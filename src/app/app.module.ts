import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {UploadService} from './upload.service';
import {RouterModule,Routes} from '@angular/router';
import { AboutComponent } from './about/about.component';
import { PredictComponent } from './predict/predict.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import { PhotoSnapComponent } from './photo-snap/photo-snap.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    PredictComponent,
    HeaderComponent,
    PhotoSnapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
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
