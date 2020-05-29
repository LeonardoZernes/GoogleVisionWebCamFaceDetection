import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { googlecloudvisionapi } from "../../config/googleCloudVisionApi";

@Injectable()
export class GoogleVisionApiService {
  constructor(private http: HttpClient) {}

  public test(): void {}

  public detectFace(image: any): Observable<any> {
    const body = {
      requests: [
        {
          image: {
            content: image,
          },
          features: [
            {
              type: "FACE_DETECTION",
            },
          ],
        },
      ],
    };
    return this.http.post(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        googlecloudvisionapi.googleCloudVisionApiKey,
      body
    );
  }
}
