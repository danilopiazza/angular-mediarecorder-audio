import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MediaDevicesService } from './media-devices/media-devices.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  recording = false;
  trustedAudioURL?: SafeUrl;
  private mediaRecorder!: MediaRecorder;
  private chunks: Blob[] = [];
  private unsafeAudioURL?: string;

  constructor(private mediaDevicesService: MediaDevicesService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.mediaDevicesService.getAudioUserMedia().subscribe(
      stream => {
        this.mediaRecorder = new MediaRecorder(stream);
        this.mediaRecorder.addEventListener('start', e => this.onStart(e));
        this.mediaRecorder.addEventListener('dataavailable', e => this.onDataAvailable(e));
        this.mediaRecorder.addEventListener('stop', e => this.onStop(e));
      });
  }

  ngOnDestroy() {
    this.releaseAudioURL();
  }

  start() {
    this.mediaRecorder.start();
    this.recording = true;
  }

  stop() {
    this.mediaRecorder.stop();
    this.recording = false;
  }

  private onStart(_: Event) {
    this.chunks = [];
  }

  private onDataAvailable(e: BlobEvent) {
    this.chunks.push(e.data);
  }

  private onStop(_: Event) {
    this.releaseAudioURL();
    this.unsafeAudioURL = URL.createObjectURL(new Blob(this.chunks));
    this.trustedAudioURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeAudioURL);
    console.log('audioURL', this.trustedAudioURL);
  }

  private releaseAudioURL() {
    if (this.unsafeAudioURL) {
      URL.revokeObjectURL(this.unsafeAudioURL);
    }
  }
}
