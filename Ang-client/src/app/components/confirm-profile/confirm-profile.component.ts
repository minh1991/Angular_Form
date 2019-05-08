import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
// import { Constant } from './../../supposts/constant';

@Component({
  selector: 'app-confirm-profile',
  templateUrl: './confirm-profile.component.html',
  styleUrls: ['./confirm-profile.component.css']
})
export class ConfirmProfileComponent implements OnInit {
  addFromData: any = {};
  profileData: Array<any> = [];
  confirmProfileForm: FormGroup;
  degreeOrders: any;
  worksOrders = [
    { value: 'Nông dân', id: 1, comment: '' },
    { value: 'Kỹ sư', id: 2, comment: '' },
    { value: 'kinh doanh', id: 3, comment: '' },
    { value: 'Công nhân', id: 4, comment: '' },
    { value: 'Quản lý', id: 5, comment: '' },
    { value: 'An ninh', id: 6, comment: '' },
    { value: 'Y tế', id: 7, comment: '' },
    { value: 'Giáo viên', id: 8, comment: '' },
    { value: 'Học sinh, Sinh viên', id: 9, comment: '' },
    { value: 'other', id: 10, comment: '' }
  ];
  checkWork = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    // private constant: Constant,
  ) { }

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
    // this.workOther(this.profileData.workedId);
    console.log(this.addFromData);
    console.log('profileData', this.profileData);
    // console.log('profileData', this.profileData.worked);
    // console.log('profileData', this.profileData.workedId);
  }
  getAddFromData() {
    const data = this.profileService.getData();
    return data;
  }

  getDedasd() {
    // this.degreeOrders = this.constant.degreeOrders;
    // console.log('degree--', this.degreeOrders);
  }

  workOther(id) {
    console.log('fasjfauihf');
    if (id == 10) {
      this.checkWork = true;
    } else {
      this.checkWork = false;
    }
  }
}
