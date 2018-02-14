import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md/modals/modal.directive';

import { UploadService } from '../Shared/upload.service';

@Component({
  selector: 'app-photo-snap',
  templateUrl: './photo-snap.component.html',
  styleUrls: ['./photo-snap.component.css']
})
export class PhotoSnapComponent implements OnInit, AfterViewInit {
  @ViewChild('photoSnapModal') photoSnapModal: ModalDirective;
  constraints = {video: {width: 320, height: 240}, audio: false};
  video; // HTMLElement;
  photo: HTMLElement;
  canvas; // HTMLCanvasElement;
  startButton: HTMLElement;
  displayText: string;
  imgSrc: HTMLElement;
  displayButtonUpload: boolean;
  streaming: boolean;
  classification: string;
  useClass = {fadeInFadeOut: false};
  feedbackText = {videoNotAvailable: 'Video is not available'};

  constructor(private uploadService: UploadService, private router: Router) {}

  ngOnInit() {
    this.video = document.getElementById('video');
    this.photo = document.getElementById('photo');
    this.canvas = document.getElementById('canvas');
    this.startButton = document.getElementById('startButton');
    this.feedbackText = {videoNotAvailable: 'Video is not available'};
    this.streaming = false;

    this.displayButtonUpload = false;
    this.displayText = '';
    this.useClass.fadeInFadeOut = false;
    this.photo.setAttribute('style', 'visibility: hidden');

    this.video.addEventListener('canplay', (ev) => {
      if (!this.streaming) {
        this.canvas.setAttribute('width', this.constraints.video.width);
        this.canvas.setAttribute('height', this.constraints.video.height);
        this.streaming = true;
      }
    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia(this.constraints)
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.onloadedmetadata = (e) => {
            this.video.play()
          };
        })
        .catch(error => {
          console.log('ERROR: ', error);
          this.displayText = this.feedbackText.videoNotAvailable;
        })
    }
  }

  ngAfterViewInit() {
    this.photoSnapModal.show();
  }

  takePhoto = (ev) => {
    this.classification = '';
    this.useClass.fadeInFadeOut = false;
    this.displayButtonUpload = false;
    this.displayText = '';
    this.useClass = {fadeInFadeOut: false};
    this.photo.setAttribute('style', 'visibility: hidden');

    this.takePicture();
  };

  takePicture = () => {
    if (this.constraints.video.width && this.constraints.video.height) {
      let context = this.canvas.getContext('2d');
      context.drawImage(this.video, 0, 0, this.constraints.video.width, this.constraints.video.height);

      const imgSrc = this.canvas.toDataURL('image/jpeg');

      this.canvas.toBlob((imgSrc) => {
        // assign photo to img element
        this.imgSrc = imgSrc;
        this.displayButtonUpload = true;
      }, 'image/jpeg');

      this.photo.setAttribute('style', 'visibility: visible');
      this.photo.setAttribute('src', imgSrc);
      this.photo.setAttribute('name', 'uploadFile.jpeg');
    } else {
    }
  };

  uploadPhoto = () => {
    this.useClass.fadeInFadeOut = true;
    this.classification = 'Classifying...';
    // send photo to server for recognition
      this.uploadService.uploadFile(this.imgSrc, 'photo.jpg')
        .subscribe(response => {
            this.classification = response['prediction'].join(',');
            this.useClass.fadeInFadeOut = false;
          },
          error => {
            this.classification = 'ERROR uploading file';
            console.log(error);
          });
  };

  navigateTo(route) {
    this.router.navigate([route]);
  }
}
