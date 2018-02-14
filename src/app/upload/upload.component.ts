import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';
import { Router } from '@angular/router';

import { UploadService } from '../Shared/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements AfterViewInit {
  @ViewChild('uploadPhotoModal') uploadPhotoModal: ModalDirective;

  fileToUpload: File;
  fileReader: FileReader;
  img = {src: '', width: 160, alt: ''};
  classification: string;
  useClass = {fadeInFadeOut:false};

  constructor(private uploadService: UploadService, private router: Router) {}

  ngAfterViewInit() {
    this.uploadPhotoModal.show();
  }

  uploadFile(form: Form) {
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
          this.classification = 'ERROR uploading file';
        });
  }

  fileSelected(uploadFiles) {
    this.fileToUpload = uploadFiles[0];
    // display the selected photo below video
    this.fileReader = new FileReader();
    this.fileReader.readAsDataURL(this.fileToUpload);
    this.fileReader.onload = (e) => {
      this.img.src = this.fileReader.result;
      this.img.alt = this.fileToUpload.name;
    };
  }

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
