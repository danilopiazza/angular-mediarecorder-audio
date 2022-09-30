import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: MediaDevices, useValue: navigator.mediaDevices }
  ]
})
export class MediaDevicesModule { }
