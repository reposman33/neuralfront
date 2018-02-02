import {Component, ElementRef, ViewChild} from '@angular/core';
import {Form} from '@angular/forms';
import {UploadService} from '../upload.service';

@Component({
  selector: 'predict',
  templateUrl: './predict.component.html',
  styleUrls: ['./predict.component.css']
})

export class PredictComponent {
  fileToUpload: File;
  fileReader;
  img = {
    src: '',
    width: 320,
    alt: ''
  };
  imgsrc: string;
  classification: string;
  displayAbout = false;
  useClass = {fadeInFadeOut:false};
  constraints = { video: {width:640, height:480}, audio: false};

  constructor(private uploadService: UploadService) {
  }

  activateCamera() {
  // Get access to the camera!
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Not adding `{ audio: true }` since we only want video now
      navigator.mediaDevices.getUserMedia(this.constraints).then(function(stream) {
        const video = document.querySelector('video');
        video.srcObject = stream;
        video.onloadedmetadata = (e) => {video.play()};
      });
    }
  }

  onSubmit(form: Form) {
    if (!this.fileToUpload) {
      return;
    }

    this.classification = 'Classifying...';
    this.useClass = {'fadeInFadeOut': true};

    this.uploadService.uploadFile(this.fileToUpload, this.fileToUpload.name)
      .subscribe(response => {
        setTimeout(() => {
          this.classification = response['prediction'].join(',');
          this.useClass.fadeInFadeOut = false;
        },1000)
        },
        error => {
          console.log(error);
          this.classification = '';
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
