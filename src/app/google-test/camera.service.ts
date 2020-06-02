import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class CameraService {
  constructor() {}

  public manageCamera(isCameraEnabled: boolean): boolean {
    const video = document.getElementById("video") as HTMLVideoElement;
    if (!isCameraEnabled) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
          video.srcObject = stream;
          video.play();
        });
      }
      return true;
    } else {
      const stream = video.srcObject as MediaStream;
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      video.srcObject = null;
      return false;
    }
  }

  public takeSnapshot(): string {
    const video = document.getElementById("video") as HTMLVideoElement;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${video.width}`);
    canvas.setAttribute("height", `${video.height}`);
    canvas.setAttribute("id", "capture");
    canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height);
    return canvas.toDataURL();
  }
}
