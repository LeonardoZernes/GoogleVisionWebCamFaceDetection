import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import Swal from "sweetalert2";
import { GoogleVisionApiService } from "./google-vision-api.service";
import { CameraService } from "./camera.service";

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

  constructor(
    private visionApi: GoogleVisionApiService,
    private cameraService: CameraService
  ) {}

  ngOnInit(): void {}

  private isEmpty(obj: Object): boolean {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  public selectPic(event: any): void {
    if (event.target.files[0].type.indexOf("image") >= 0) {
      this.image = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        this.fuente = e.target.result;
        this.detectFaces();
      };
      reader.readAsDataURL(this.image);
    } else {
      this.fuente = null;
      this.image = null;
      Swal.fire(
        "Error al seleccionar la imagen",
        "El tipo de archivo seleccionado no corresponde con una imagen. Pruebe formatos '.jpeg', '.jpg' o '.png'.",
        "error"
      );
    }
  }

  private detectFaces(): void {
    // Hay que eliminar la parte de la fuente que pone "data:image/png;base64," ya que la API no lo necesita.
    // Como en base 64 no hay comas, podemos hacer split en la misma y coger la parte de la img codificada.
    this.visionApi
      .detectFace(this.fuente.split(",")[1])
      .subscribe((response) => {
        if (this.isEmpty(response.responses[0])) {
          Swal.fire(
            "No se han detectado caras",
            "La petición se ha completado con éxito pero no se han detectado caras",
            "warning"
          );
        } else {
          this.highlightFaces(response.responses[0].faceAnnotations);
        }
      });
  }

  private async highlightFaces(faces: any) {
    // Open the original image into a canvas
    const img = new Image();
    img.src = this.fuente;

    // Look for the element to append
    // const divCanvas = document.getElementById("canvas");

    // Create Canvas and set attributes with the img ones
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${img.width}`);
    canvas.setAttribute("height", `${img.height}`);
    canvas.setAttribute("id", "hightlight-img");
    const ctx = canvas.getContext("2d");

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0, img.width, img.height);

    // Now draw boxes around all the faces
    ctx.strokeStyle = "rgba(0,255,0,0.8)";
    ctx.lineWidth = 5;

    // We loop over the response api, which contains the position of the faces
    faces.forEach((face) => {
      ctx.beginPath();
      let origX = 0;
      let origY = 0;
      face.boundingPoly.vertices.forEach((bounds, i) => {
        if (i === 0) {
          origX = bounds.x;
          origY = bounds.y;
        }
        ctx.lineTo(bounds.x, bounds.y);
      });
      ctx.lineTo(origX, origY);
      ctx.stroke();
    });

    // Write the result to a file
    // divCanvas.removeChild(divCanvas.lastChild);
    // divCanvas.appendChild(canvas);
    this.fuente = canvas.toDataURL();
  }

  public manageCamera() {
    this.cameraEnabled = this.cameraService.manageCamera(this.cameraEnabled);
    this.cameraEnabled
      ? (this.cameraButtonTitle = "Disable Camera")
      : (this.cameraButtonTitle = "Enable Camera");
  }

  public takeSnapshot() {
    this.fuente = this.cameraService.takeSnapshot();
    this.detectFaces();
  }
}
