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



  // profileModel: ProfileModel = new ProfileModel();
  addProfileForm: FormGroup;
  checkWork = false;
  submitted = false;
  formArr: Array<any> = [];
  skillsOrders: Array<any> = [
    { name: 'HTML', id: 1 },
    { name: 'CSS', id: 2 },
    { name: 'JAVASCRIPT', id: 2 },
    { name: 'NODE JS', id: 3 },
    { name: 'PHP', id: 4 },
    { name: 'ANGULAR', id: 5 },
    { name: 'REACT JS', id: 6 },
    { name: 'VUE JS', id: 7 },
    { name: 'NO-SQL', id: 8 },
    { name: 'SQL', id: 9 }
  ];
  selectedSkillsValues = [];
  // tslint:disable-next-line:ban-types
  skillsErrors: Boolean = true;

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

  degreeOrders = [
    { name: 'Trên Đại học', id: 1 },
    { name: 'Tốt nghiệp đại học', id: 2 },
    { name: 'Đang học đại học', id: 2 },
    { name: 'Tốt nghiệp cấp 3', id: 3 },
    { name: 'Chưa tốt nghiệp cấp 3', id: 4 },
  ];

  salaryOrders = [
    'Trên 2000$',
    'Trên 1000$',
    'Trên 500$',
    'Trên 100$',
    'Chưa có lương cố định'
  ];

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
    console.log('fasjfauihf');
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
