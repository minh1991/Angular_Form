import { Component, OnInit } from '@angular/core';
import {ImagesService} from '../../services/images.service';


class ImageSnippet {
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
    // debugger;
    const file: File = imgInput.files[0];
    const render = new FileReader();
    // debugger;
    render.addEventListener('load', (event: any) => {
      this.selectFile = new ImageSnippet(event.target.result, file);
      this.imagesService.uploadImage(this.selectFile.file).subscribe(
        (res) => {
          console.log( 'img           ' + JSON.stringify(res));
        },
        (err) => {
          console.log(err);
        }
      );
    });
    // debugger;
    render.readAsDataURL(file);
    // console.log('file---' + JSON.stringify(file));
    // console.log('render---' + JSON.stringify(render));
  }
}
