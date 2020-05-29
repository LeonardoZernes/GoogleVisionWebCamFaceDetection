import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class CameraService {
  constructor() {}

  public manageCamera(isCameraEnabled: boolean): boolean {
    const divVideo = document.getElementById("video");
    if (!isCameraEnabled) {
      const video = document.createElement("video");
      video.setAttribute("width", "500");
      video.setAttribute("height", "375");
      video.setAttribute("autoplay", "true");
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          video.srcObject = stream;
          video.play();
        });
      }
      divVideo.appendChild(video);
      return true;
    } else {
      const video = document.getElementsByTagName("video")[0];
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
      divVideo.removeChild(divVideo.lastChild);
      return false;
    }
  }

  public takeSnapshot(): string {
    const video = document.getElementsByTagName("video")[0];
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${video.width}`);
    canvas.setAttribute("height", `${video.height}`);
    canvas.setAttribute("id", "capture");
    canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height);
    return canvas.toDataURL();
  }
}
