import { Component, OnInit } from "@angular/core";
import { CameraService } from "./camera.service";
import * as faceapi from "face-api.js";

@Component({
  selector: "app-google-test",
  templateUrl: "./google-test.component.html",
  styleUrls: ["./google-test.component.css"],
})
export class GoogleTestComponent implements OnInit {
  public image: File;
  public fuente: any;
  public description: any;
  public cameraEnabled: boolean = false;
  public cameraButtonTitle: string = "Enable Camera";

  constructor(private cameraService: CameraService) {}

  ngOnInit(): void {
    this.loadModels();
  }

  public manageCamera() {
    this.cameraEnabled = this.cameraService.manageCamera(this.cameraEnabled);
    this.intervalFaceDetect();
    this.cameraEnabled
      ? (this.cameraButtonTitle = "Disable Camera")
      : (this.cameraButtonTitle = "Enable Camera");
  }

  public takeSnapshot() {
    this.fuente = this.cameraService.takeSnapshot();
  }

  private async loadModels() {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("../../assets/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("../../assets/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("../../assets/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("../../assets/models"),
      faceapi.nets.ageGenderNet.loadFromUri("../../assets/models"),
    ]);
  }

  public intervalFaceDetect() {
    const video = document.getElementById("video") as HTMLVideoElement;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const displaySize = { width: video.width, height: video.height };
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions()
      );
      // Si no hay caras, detections es un array vacío: []
      // if (detections.length > 0) {
      //   this.takeSnapshot();
      // }
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      canvas.getContext("2d").drawImage(video, 0, 0, video.width, video.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }, 100);
  }
}
