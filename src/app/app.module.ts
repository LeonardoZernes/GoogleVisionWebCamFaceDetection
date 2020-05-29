import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { GoogleTestComponent } from "./google-test/google-test.component";
import { GoogleVisionApiService } from "./google-test/google-vision-api.service";
import { CameraService } from "./google-test/camera.service";

@NgModule({
  declarations: [AppComponent, GoogleTestComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, HttpClientModule],
  providers: [GoogleVisionApiService, CameraService],
  bootstrap: [AppComponent],
})
export class AppModule {}
