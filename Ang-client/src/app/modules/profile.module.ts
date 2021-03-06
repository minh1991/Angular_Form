import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { TableComponent } from './../components/table/table.component';
import { ProfileService } from './../services/profile.service';
import { AddProfileComponent } from './../components/add-profile/add-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmProfileComponent } from './../components/confirm-profile/confirm-profile.component';
import { UploadImgComponent } from './../components/upload-img/upload-img.component';
import { EditProfileComponent } from './../edit-profile/edit-profile.component';



@NgModule({
  declarations: [TableComponent, AddProfileComponent, ConfirmProfileComponent, UploadImgComponent, EditProfileComponent],
  exports: [TableComponent, AddProfileComponent, UploadImgComponent],
  imports: [
  CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    FileUploadModule],
providers: [ProfileService]
})
export class ProfileModule {}
