import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoServiceService {

  public photo: UserPhoto = {  filepath:'',webviewPath: '', data:''};

  constructor() { }

  public async addNewToGallery() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    console.log('Captured photo:', capturedPhoto);


    const savedPhoto = await this.savePicture(capturedPhoto);

    // Store the saved photo information
    this.photo = {
      filepath: savedPhoto.filepath,
      webviewPath: savedPhoto.webviewPath,
      data: savedPhoto.data
    };

  }   

  public async savePicture(photo: Photo) {
    // Read photo into a base64 string
    const base64Data = await this.readAsBase64(photo);
    console.log('Base64 data:', base64Data);

    // Save photo to public directory (e.g., www/assets/images)
    const fileName = new Date().getTime() + '.png'; // Unique file name
   console.log(photo.format);
    const savedFile = await Filesystem.writeFile({
      path: `photos/${fileName}`, // Custom public path
      data: base64Data,
      directory: Directory.Data, // This may vary depending on where you intend to save
    });
    console.log('File path:', `photos/${fileName}`);
    console.log('Saved file:', savedFile.uri);
    return {
      filepath: savedFile.uri,
      webviewPath: photo.webPath,
      data:base64Data
    };
  }

  private async readAsBase64(photo: Photo): Promise<string> {
    // Convert photo to base64 string
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(',')[1];
        resolve(base64Data ?? '');
      };
      reader.onerror = (error) => reject(error);

      reader.readAsDataURL(blob);
    });
  }
}
