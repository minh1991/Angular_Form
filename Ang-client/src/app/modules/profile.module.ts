import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableComponent } from "./../components/table/table.component";
import { ProfileService } from "./../services/profile.service";
import { AddProfileComponent } from "./../components/add-profile/add-profile.component";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [TableComponent, AddProfileComponent],
  exports: [TableComponent, AddProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [ProfileService]
})
export class ProfileModule {}
