import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-confirm-profile',
  templateUrl: './confirm-profile.component.html',
  styleUrls: ['./confirm-profile.component.css']
})
export class ConfirmProfileComponent implements OnInit {
  addFromData: any = {};
  profileData: Array<any> = [];
  confirmProfileForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.addFromData = this.getAddFromData();
    this.profileData = this.addFromData.source.value;
    this.confirmProfileForm = this.formBuilder.group({
      _id: [],
      fullname: [],
      gender: [],
      birthday: [],
      address: [],
      phone: [],
      degree: [],
      salary: [],
      skills: [],
      worked: [],
      status: [],
      imgULR: []
    });
    console.log(this.addFromData);
    console.log(this.profileData);

  }
  getAddFromData() {
    const data = this.profileService.getData();
    return data;
  }
}
