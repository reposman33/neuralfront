import {Component, OnInit, ViewChild} from '@angular/core';
import {Form} from '@angular/forms';
import {UploadService} from '../upload.service';
import {ModalDirective} from 'angular-bootstrap-md/modals/modal.directive';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  fileToUpload: File;
  fileReader;
  img = {src: '', width: 320, alt: ''};
  classification: string;
  useClass = {fadeInFadeOut:false};
  @ViewChild('uploadPhoto') uploadPhoto: ModalDirective;

  constructor(private uploadService: UploadService) {
  }

  ngAfterViewInit() {

  }
  ngOnInit(){
    // this.uploadPhoto.show = true;
    console.log('this.uploadPhoto = ', this.uploadPhoto);
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
}
