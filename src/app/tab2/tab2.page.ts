import {Component, OnInit, ViewChild} from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { CropperComponent} from 'angular-cropperjs';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    currentImage: any;
    cropperOptions: {};
    public photos: Photo[] = [];
    @ViewChild('angularCropper')
    public angularCropper: CropperComponent;

    constructor(
        public photoService: PhotoService,
        public camera: Camera,
        public storage: Storage
    ) {  }

    ngOnInit() {
        this.photoService.loadSaved();
        this.cropperOptions = {
            dragMode: 'move',
            aspectRatio: 1,
            autoCrop: true,
            autoCropArea: 1,
            cropBoxResizable: false
        };
    }

    takePicture() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            // Add new photo to gallery
            this.photos.unshift({
                data: 'data:image/jpeg;base64,' + imageData
            });

            // Save all photos for later viewing
            this.storage.set('photos', this.photos);
        }, (err) => {
            // Handle error
            console.log('Camera issue: ' + err);
        });

    }
}

class Photo {
    data: any;
}
