import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  processFile(imgInput: any){
    debugger;
    console.log('processFile OK');
    const file: File = imgInput.files[0];
  }

}
