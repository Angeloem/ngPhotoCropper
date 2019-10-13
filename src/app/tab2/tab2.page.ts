import {Component, OnInit, ViewChild} from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { CropperComponent} from 'angular-cropperjs';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
    currentImage: any;
    cropperOptions: {};
    @ViewChild('angularCropper')
    public angularCropper: CropperComponent;

    constructor(public photoService: PhotoService) {  }

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


}
