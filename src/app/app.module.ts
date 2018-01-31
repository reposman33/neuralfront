import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormBuilder, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import {UploadService} from './upload.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,  ],
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
