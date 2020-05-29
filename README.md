# Google Vision: Face Detection with Webcam snapshot (Angular)

El proyecto consta de una interfaz web diseñada en Angular 9, a partir de la cual seremos capaces de subir imágenes y hacerle peticiones a la API de Google Vision para obtener respuesta de si se han detectado rostros en la imagen o no. Para analizar la respuesta de los rostros, repintaremos la imagen con la posición de los mismos que nos devuelve la API.

En primer lugar, la estructura se basa en un componente principal google-test en el que encontraremos 2 servicios esenciales:
-	camera.service.ts
-	google-vision-api.service.ts

El servicio de Google visión como el mismo nombre indica se encarga de hacer las peticiones a la api a modo de observable (peticiones asíncronas). Se define el body o cuerpo de la petición y se crea la dirección URL a la que se tiene que hacer referencia.

En este punto es importante definir nuestra propia clave de acceso a la api que nos debe de proporcionar Google Cloud Services. Para ello hay que crearse una cuenta de acceso gratuito y solicitar una clave de acceso a la api de visión, clave que guardaremos en un archivo googleCloudVisionApi.ts, dentro de la carpeta /config y que importaremos a este módulo de servicio.
```Javascript
export const googlecloudvisionapi = {
  googleCloudVisionApiKey: "TU CLAVE",
};
```
La dirección HTTP sería: 
```Javascript
"https://vision.googleapis.com/v1/images:annotate?key=" + googlecloudvisionapi.googleCloudVisionApiKey
```
Por la parte del HTML, definiremos una interfaz sencilla de un input de archivos en el que comprobaremos que se sube una imagen. Esta imagen será procesada y enviada como cuerpo de la petición a la API.

