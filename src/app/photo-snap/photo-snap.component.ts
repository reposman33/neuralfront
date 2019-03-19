import { I18nService } from "../i18n/I18n.service";
import { Component, OnInit } from "@angular/core";
import { UploadService } from "../Shared/upload.service";
import { PhotoSnapLanguagepack } from "./photo-snap.languagepack";

@Component({
  selector: "app-photo-snap",
  templateUrl: "./photo-snap.component.html",
  styleUrls: ["./photo-snap.component.css"]
})
export class PhotoSnapComponent implements OnInit {
  // @ViewChild('video') video: HTMLElement;
  // @ViewChild('photo') photo: HTMLElement;
  // @ViewChild('canvasElement') canvasElement: CanvasRenderingContext2D;

  constraints = { video: { width: 320, height: 240 }, audio: false };
  video;
  photo: HTMLElement;
  canvas;
  startButton: HTMLElement;
  imgSrc: HTMLElement;
  displayButtonUpload: boolean;
  streaming: boolean;
  classification: string;
  useClass = { fadeInFadeOut: false };
  i18nContent = {};

  constructor(
    private uploadService: UploadService,
    private i18nService: I18nService
  ) {
    this.i18nService.languageSelector.subscribe(language =>
      this.initializeLanguage(language)
    );
    this.i18nService.initialize(PhotoSnapLanguagepack);
  }

  ngOnInit() {
    // get a rference to the DOM elements
    this.video = document.getElementById("video");
    this.photo = document.getElementById("photo");
    this.canvas = document.getElementById("canvas");
    this.startButton = document.getElementById("startButton");
    this.streaming = false;

    // should we display button
    this.displayButtonUpload = false;
    // should the animation class be used
    this.useClass.fadeInFadeOut = false;
    // hide photo until user takes photo
    this.photo.setAttribute("style", "display: none");
    this.video.setAttribute("style", "display: block");

    this.video.addEventListener("canplay", ev => {
      if (!this.streaming) {
        this.canvas.setAttribute("width", this.constraints.video.width);
        this.canvas.setAttribute("height", this.constraints.video.height);
        this.streaming = true;
      }
    });

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // dislay webcam video stream
      navigator.mediaDevices
        .getUserMedia(this.constraints)
        .then(stream => {
          this.video.srcObject = stream;
          this.video.onloadedmetadata = e => {
            this.video.play();
          };
        })
        .catch(error => {
          console.log("ERROR: ", error);
        });
    }
    this.initializeLanguage();
  }

  initializeLanguage(language?) {
    this.i18nContent["modal_camera_take_button_text"] = this.i18nService.getKey(
      "modal_camera_take_button_text",
      language
    );
    this.i18nContent[
      "modal_camera_video_unavailable_text"
    ] = this.i18nService.getKey(
      "modal_camera_video_unavailable_text",
      language
    );
    this.i18nContent["modal_camera_img_alt_text"] = this.i18nService.getKey(
      "modal_camera_img_alt_text",
      language
    );
    this.i18nContent[
      "modal_camera_button_upload_text"
    ] = this.i18nService.getKey("modal_camera_button_upload_text", language);
  }

  // user takes photo
  takePhoto = ev => {
    // initialize text with fruit class
    this.classification = "";
    // don't use animation class on classification text yet
    this.useClass.fadeInFadeOut = false;
    this.displayButtonUpload = false;
    this.video.setAttribute("style", "display: none");

    this.takePicture();
  };

  takePicture = () => {
    // create still
    if (this.constraints.video.width && this.constraints.video.height) {
      let context = this.canvas.getContext("2d");
      context.drawImage(
        this.video,
        0,
        0,
        this.constraints.video.width,
        this.constraints.video.height
      );
      // create src of image to display
      const displayimgSrc = this.canvas.toDataURL("image/jpeg");

      this.canvas.toBlob(imgSrc => {
        // create binary blob of img to upload later
        this.imgSrc = imgSrc;
        this.displayButtonUpload = true;
      }, "image/jpeg");
      // display photo
      this.photo.setAttribute("style", "display: block");
      this.photo.setAttribute("src", displayimgSrc);
      this.photo.setAttribute("name", "uploadFile.jpeg");
    } else {
    }
  };

  uploadPhoto = () => {
    // animate the classification placeholdertext until server response
    this.useClass.fadeInFadeOut = true;
    this.classification = "Classifying...";
    // send photo to server for recognition
    this.uploadService.uploadFile(this.imgSrc, "photo.jpg").subscribe(
      response => {
        // display server response
        this.classification = response["prediction"].join(",");
        // stop animating classification text
        this.useClass.fadeInFadeOut = false;
      },
      error => {
        this.classification = "ERROR uploading file";
        console.log(error);
      }
    );
  };
}
