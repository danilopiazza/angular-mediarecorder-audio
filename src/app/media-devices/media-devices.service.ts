import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaDevicesService {
  constructor(private mediaDevices: MediaDevices) { }

  getAudioUserMedia() {
    return from(
      this.mediaDevices.getUserMedia({
        audio: true,
        video: false
      })
    );
  }
}
