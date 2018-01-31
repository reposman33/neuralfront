import {Component, OnInit} from '@angular/core';
import {UploadService} from './predict/upload.service';
import {Form} from '@angular/forms';
import {RouteReuseStrategy, RouterModule, Routes} from '@angular/router';

@Component({
  selector: 'predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})

export class PredictComponent implements OnInit {
  fileToUpload: File;
  fileReader;
  img = {
    src: '',
    width: 320,
    height: 250,
    alt: ''
  };
  imgsrc: string;
  classification: string;
  displayAbout = false;

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
  }

  onSubmit(form: Form) {
    if (!this.fileToUpload) {
      console.log('!this.fileToUpload: ', this.fileToUpload);
      return;
    }

    this.classification = 'Classifying...';

    this.uploadService.uploadFile(this.fileToUpload, this.fileToUpload.name)
      .subscribe(response => {
        console.log('response = ', response['prediction']);
        this.classification = response['prediction'].join(',');
      },
        error => {
        console.log(error);
      });
  }

  fileSelected(uploadFiles, input) {
    this.fileToUpload = uploadFiles[0];
    // toon geselecteerde image in pagina on change event
    this.fileReader = new FileReader();
    this.fileReader.readAsDataURL(this.fileToUpload);
    this.fileReader.onload = (e) => {
      this.img.src = this.fileReader.result;
      this.img.alt = this.fileToUpload.name;
    };
  }
}
