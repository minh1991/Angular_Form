import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
// import {ProfileModel} from '../../models/profile.model';
import { Messenger } from './../../supposts/message';
import { Constant } from './../../supposts/constant';


@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.css']
})
export class AddProfileComponent implements OnInit {
  addProfileForm: FormGroup;
  checkWork = false;
  submitted = false;
  formArr: Array<any> = [];
  selectedSkillsValues = [];
  // tslint:disable-next-line:ban-types
  skillsErrors: Boolean = true;
  degreeOrders: Array<any> = Constant.DEGREEORDERS;
  salaryOrders: Array<any> = Constant.SALARYORDERS;
  skillsOrders: Array<any> = Constant.SKILLSORDERS;
  worksOrders: Array<any> = Constant.WORKSORDERS;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.resetForm();
    this.addProfileForm = this.formBuilder.group({
      _id: [],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', [Validators.required, Validators.pattern(Constant.PATTERN.DATE)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(Constant.PATTERN.NUMBER)]],
      degree: ['', Validators.required],
      salary: ['', Validators.required],
      skills: this.addSkillsControls(),
      worked: ['', Validators.required],
      workedId: [],
      status: ['', Validators.required],
      image: ['', Validators.required]
    });
  }
  workOther(id) {
    console.log('workOther');
    if (id == 10) {
      this.checkWork = true;
    } else {
      this.checkWork = false;
    }
  }

  addSkillsControls() {
    const arr = this.skillsOrders.map(elm => {
      this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
  get skillsArr() {
    return this.addProfileForm.get('skills') as FormArray;
  }
  getSelectedSkillsValue() {
    this.selectedSkillsValues = [];
    this.skillsArr.controls.forEach((control, i) => {
      if (control.value) {
        this.selectedSkillsValues.push(this.skillsOrders[i]);
      }
    });
    console.log(this.selectedSkillsValues);

    this.skillsErrors = this.selectedSkillsValues.length > 0 ? false : true;
  }
  checkSkillsTouched() {
    let flg = false;
    this.skillsArr.controls.forEach(control => {
      if (control.touched) {
        flg = true;
      }
    });
    return flg;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.profileService.selectedProfile = {
        _id: '',
        fullname: '',
        gender: '',
        birthday: null,
        address: '',
        phone: null,
        degree: '',
        salary: '',
        skills: '',
        worked: '',
        status: '',
        image: ''
      };
    }
  }

  onSubmitAddForm(addProfileForm) {
    this.addProfileForm.value.skills = this.selectedSkillsValues;
    // console.log("form data  ", addProfileForm.value);
    const formData = this.addProfileForm.value;
    this.profileService.pushData(formData);
    if (Number(formData.worked)) {
      formData.workedId = formData.worked;
    } else {
      formData.workedId = 10;
    }
    console.log(formData);
    this.router.navigate(['confirm-profile']);

    // if (formData._id == "") {
    //   this.profileService.postProfile(formData).subscribe(data => {
    //     console.log(`Creat New dataForm: ${data}`);
    //     this.router.navigate(["confirm-profile"]);
    //   });
    // } else {
    //   this.profileService.updatePutProfile(formData).subscribe(data => {
    //     console.log(`Update dataForm: ${data}`);
    //     this.router.navigate(["confirm-profile"]);
    //   });
    // }
  }
}
