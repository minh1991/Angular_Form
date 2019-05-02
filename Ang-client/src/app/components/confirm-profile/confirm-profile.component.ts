import { Component, OnInit } from "@angular/core";
import { ProfileService } from "./../../services/profile.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-confirm-profile",
  templateUrl: "./confirm-profile.component.html",
  styleUrls: ["./confirm-profile.component.css"]
})
export class ConfirmProfileComponent implements OnInit {
  ProfileData: any = {};
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.ProfileData = this.getProfileData();
    console.log(this.ProfileData);

    // this.profileService.getData();
    // console.log(this.ProfileData.source._value);
  }
  getProfileData() {
    let data = this.profileService.getData();
    return data;
  }
}
