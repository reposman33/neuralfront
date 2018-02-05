import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadService} from '../upload.service';
import {unescape} from 'querystring';

@Component({
  selector: 'app-photo-snap',
  templateUrl: './photo-snap.component.html',
  styleUrls: ['./photo-snap.component.css']
})
export class PhotoSnapComponent implements OnInit {
  constraints = {video: {width: 320, height: 240}, audio: false};
  video;
  photo;
  canvas;
  startButton;
  displayText = '';0
  imgSrc;
  displayButtonUpload = false;
  streaming = false;
  classification: string;
  useClass = {fadeInFadeOut: false};
  feedbackText = {videoNotAvailable: 'Video is not available'};

  constructor(private uploadService: UploadService) {
  }

  ngOnInit() {
    this.video = document.getElementById('video');
    this.photo = document.getElementById('photo');
    this.canvas = document.getElementById('canvas');
    this.startButton = document.getElementById('startButton');

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
    // this.clearPhoto();
  }

  takePhoto = (ev) => {
    this.takePicture();
  }

  takePicture = () => {
    if (this.constraints.video.width && this.constraints.video.height) {
      let context = this.canvas.getContext('2d');
      context.drawImage(this.video, 0, 0, this.constraints.video.width, this.constraints.video.height);

      const imgSrc = this.canvas.toDataURL('image/jpeg');

      this.canvas.toBlob((imgSrc) => {
        this.imgSrc = imgSrc;
        this.displayButtonUpload = true;
      }, 'image/jpeg');

      // display captured photo uder video stream
      this.photo.setAttribute('src', imgSrc);
      this.photo.setAttribute('name', 'uploadFile.jpeg');
      // display text
/*
      this.useClass.fadeInFadeOut = true;
      this.classification = 'Classifying...';
*/
    }
    else {
      this.clearPhoto();
    }
  }

  uploadPhoto = () => {
    // send photo to server for recognition
    this.uploadService.uploadFile(this.imgSrc, 'photo.jpg')
      .subscribe(response => {
          this.classification = response['prediction'].join(',');
          this.useClass.fadeInFadeOut = false;
        },
        error => {
          console.log(error);
          this.classification = '';
        });
  }

  clearPhoto = () => {
    const context = this.canvas.getContext('2d');
    context.fillStyle = '#AAA';
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const data = this.canvas.toDataURL('image/png');
    this.photo.setAttribute('src', data);
  }

  dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {type: mimeString});
  }
}
