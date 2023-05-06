import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CvDownloadService {

  constructor(private http: HttpClient) { }

  url= environment.URL+ "cv/download";

  downloadCv() {
    window.open(this.url, '_blank');}
}
