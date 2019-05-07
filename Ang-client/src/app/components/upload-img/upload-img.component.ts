import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../../services/images.service';


class ImageSnippet {
  // tslint:disable-next-line:no-inferrable-types
  pending: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  status: string = 'init';

  constructor(
    public src: string,
    public file: File
  ) {}
}

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  selectFile: ImageSnippet;

  constructor(
    private imagesService: ImagesService
  ) { }

  ngOnInit() {
  }

  processFile(imgInput: any) {
    const file: File = imgInput.files[0];
    const render = new FileReader();
    render.addEventListener('load', (event: any) => {
      this.selectFile = new ImageSnippet(event.target.result, file);
      this.selectFile.pending = true;
      this.imagesService.uploadImage(this.selectFile.file).subscribe(
        (res) => {
          console.log( 'img           ' + JSON.stringify(res));

        },
        (err) => {
          console.log(err);

        }
      );
    });
    render.readAsDataURL(file);
  }
}
