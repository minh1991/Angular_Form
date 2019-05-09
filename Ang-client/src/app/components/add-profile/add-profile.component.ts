import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
// import {ProfileModel} from '../../models/profile.model';
import { Messenger } from './../../supposts/message';
import { String } from 'typescript-string-operations';
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
  dataFromConfirm: any = [];
  errorValidateFieldAddProfile: Array<any> = [];

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
      imgULR: ['']
    });
    this.dataFromConfirm = this.getDataFromConFirm();
    this.addProfileForm.patchValue(this.dataFromConfirm.value);
  }
  getDataFromConFirm() {
    const data = this.profileService.getData();
    console.log('dataBack--', data.source);
    return data.source;
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
    console.log('selectedSkillsValues--', this.selectedSkillsValues);
    this.skillsErrors = this.selectedSkillsValues.length > 0 ? false : true;
    console.log('skillsErrors--', this.skillsErrors);
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

  workOther(id) {
    if (id === 10) {
      this.checkWork = true;
    } else {
      this.checkWork = false;
    }
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
        worked: {
          id: '',
          comment: null
        },
        status: '',
        imgULR: ''
      };
    }
  }

  public get formAddProfile() {
    return this.addProfileForm.controls;
  }
  showErrors(messager) {
    // console.log(messager);
    this.errorValidateFieldAddProfile.push(messager);
    console.log(this.errorValidateFieldAddProfile);
  }
  onSubmitAddForm(addProfileForm) {
    // validate
    this.errorValidateFieldAddProfile = [];
    if (this.addProfileForm.invalid) {
      if (this.formAddProfile.fullname.errors) {
        if (this.formAddProfile.fullname.errors.required) {
          this.showErrors({ fullname: String.Format(Messenger.MSG0002, 'fullname') });
        }
      } else {
        this.showErrors({ fullname: '' });
      }

      if (this.formAddProfile.gender.errors) {
        if (this.formAddProfile.gender.errors.required) {
          this.showErrors({ gender: String.Format(Messenger.MSG0002, 'gender') });
        }
      } else {
        this.showErrors({ gender: '' });
      }

      if (this.formAddProfile.birthday.errors) {
        if (this.formAddProfile.birthday.errors.required) {
          this.showErrors({ birthday: String.Format(Messenger.MSG0002, 'birthday') });
        }
        if (this.formAddProfile.birthday.errors.pattern) {
          this.showErrors({birthday: String.Format(Messenger.MSG0001, 'birthday')});
        }
      } else {
        this.showErrors({ birthday: '' });
      }

      if (this.formAddProfile.address.errors) {
        if (this.formAddProfile.address.errors.required) {
          this.showErrors({ address: String.Format(Messenger.MSG0002, 'address') });
        }
      } else {
        this.showErrors({ address: '' });
      }

      if (this.formAddProfile.phone.errors) {
        if (this.formAddProfile.phone.errors.required) {
          this.showErrors({ phone: String.Format(Messenger.MSG0002, 'phone') });
        }
        if (this.formAddProfile.phone.errors.pattern) {
          this.showErrors({phone: String.Format(Messenger.MSG0001, 'phone')});
        }
      } else {
        this.showErrors({ phone: '' });
      }

      if (this.formAddProfile.degree.errors) {
        if (this.formAddProfile.degree.errors.required) {
          this.showErrors({ degree: String.Format(Messenger.MSG0002, 'degree') });
        }
      } else {
        this.showErrors({ degree: '' });
      }

      if (this.formAddProfile.salary.errors) {
        if (this.formAddProfile.salary.errors.required) {
          this.showErrors({ salary: String.Format(Messenger.MSG0002, 'salary') });
        }
      } else {
        this.showErrors({ salary: '' });
      }

      if (this.formAddProfile.skills.errors) {
        if (this.formAddProfile.skills.errors.required) {
          this.showErrors({ skills: String.Format(Messenger.MSG0002, 'skills') });
        }
      } else {
        this.showErrors({ skills: '' });
      }

      if (this.formAddProfile.worked.errors) {
        if (this.formAddProfile.worked.errors.required) {
          this.showErrors({ worked: String.Format(Messenger.MSG0002, 'worked') });
        }
      } else {
        this.showErrors({ worked: '' });
      }

      if (this.formAddProfile. status.errors) {
        if (this.formAddProfile. status.errors.required) {
          this.showErrors({  status: String.Format(Messenger.MSG0002, ' status') });
        }
      } else {
        this.showErrors({ status: '' });
      }
      return true;
    }

    this.addProfileForm.value.skills = this.selectedSkillsValues;
    // console.log("form data  ", addProfileForm.value);
    const formData = this.addProfileForm.value;
    this.profileService.pushData(formData);
    if (Number(formData.worked)) {
      formData.workedId = formData.worked;
    } else {
      formData.workedId = '10';
    }
    console.log('123' + formData);
    this.router.navigate(['confirm-profile']);
  }
}
