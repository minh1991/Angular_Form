import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Constant } from './../../supposts/constant';

@Component({
  selector: 'app-confirm-profile',
  templateUrl: './confirm-profile.component.html',
  styleUrls: ['./confirm-profile.component.css']
})
export class ConfirmProfileComponent implements OnInit {

  addFromData: any = {};
  profileData: any = [];
  confirmProfileForm: FormGroup;
  degreeOrders: Array<any> = Constant.DEGREEORDERS;
  salaryOrders: Array<any> = Constant.SALARYORDERS;
  skillsOrders: Array<any> = Constant.SKILLSORDERS;
  worksOrders: Array<any> = Constant.WORKSORDERS;
  checkWork = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.addFromData = this.getAddFromData();
    this.profileData = this.coverData();
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
      workedId: [],
      status: [],
      imgULR: []
    });
    this.workOther(this.profileData.workedId);
    console.log('profileData', this.profileData);
    // console.log('addFromData---', this.addFromData);
    this.coverData();
  }
  getAddFromData() {
    const data = this.profileService.getData();
    return data;
  }

  coverData() {
    const dataCoved = {
      _id : this.addFromData.source.value._id,
      fullname: this.addFromData.source.value.fullname,
      gender: this.addFromData.source.value.gender,
      birthday: this.addFromData.source.value.birthday,
      address: this.addFromData.source.value.address,
      phone: this.addFromData.source.value.phone,
      degree: this.degreeOrders.filter(item => {
        if (this.addFromData.source.value.degree && item.id === Number(this.addFromData.source.value.degree)) {
          return item.id === Number(this.addFromData.source.value.degree);
        }
      }),
      salary: this.salaryOrders.filter(item => {
        if (this.addFromData.source.value.salary && item.id === Number(this.addFromData.source.value.salary)) {
          return item.id === Number(this.addFromData.source.value.salary);
        }
      }),
      skills: this.addFromData.source.value.skills,
      worked: this.addFromData.source.value.worked,
      workedId: this.addFromData.source.value. workedId,
      status: this.addFromData.source.value.status,
      imgULR: this.addFromData.source.value.imgULR,
    };
    // console.log('dataCoved---', dataCoved);
    return dataCoved;
  }

  workOther(id) {
    console.log('workOther confirm');
    if (this.profileData.workedId !== null) {
      if (Number(id) === 10) {
        this.checkWork = true;
      } else {
        this.checkWork = false;
      }
    }
  }
}
