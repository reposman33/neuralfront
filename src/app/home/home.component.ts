import { Component, OnInit } from '@angular/core';
import {UploadService} from '../upload.service';
import {Form} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

/* ============ START copy from src/app/home/home.component.ts ============ */

  fileToUpload: File;
  fileReader;
  img = {src: '', width: 320, alt: ''};
  classification: string;
  useClass = {fadeInFadeOut:false};

  constructor(private uploadService: UploadService) {
  }

  onSubmit(form: Form) {
    if (!this.fileToUpload) {
      return;
    }

    this.classification = 'Classifying...';
    this.useClass.fadeInFadeOut = true;
    this.uploadService.uploadFile(this.fileToUpload, this.fileToUpload.name)
      .subscribe(response => {
          setTimeout(() => {
            this.classification = response['prediction'].join(',');
            this.useClass.fadeInFadeOut = false;
          },1000)},
        error => {
          console.log(error);
          this.classification = '';
        });
  }

  fileSelected(uploadFiles) {
    this.fileToUpload = uploadFiles[0];
    // toon geselecteerde image in pagina on change event
    this.fileReader = new FileReader();
    // display selected photo in page
    this.fileReader.readAsDataURL(this.fileToUpload);
    this.fileReader.onload = (e) => {
      this.img.src = this.fileReader.result;
      this.img.alt = this.fileToUpload.name;
    };
  }

  /* ============ END copy from src/app/home/home.component.ts ============ */

}
