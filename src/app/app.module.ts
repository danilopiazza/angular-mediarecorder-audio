import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MediaDevicesModule } from './media-devices/media-devices.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MediaDevicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
