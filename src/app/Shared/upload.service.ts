import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PredictResponse {
  predict: string;
}

@Injectable()
export class UploadService {
  url: string;
  APIKEY = 'ABC';
  constructor(private httpClient: HttpClient) {
    // this.url = 'http://192.168.0.101:8085/predict';
    this.url = 'https://www.lindabergman.world/service/predict';
  }

  uploadFile(file, fileName: string) {
    const form = new FormData();
    form.append('file', file, fileName);
    form.append('apikey', this.APIKEY);
    return this.httpClient.post<PredictResponse[]>(this.url, form);
  }

}
