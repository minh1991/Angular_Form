import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray, NgForm} from '@angular/forms';
import {FileDropDirective, FileUploader} from 'ng2-file-upload';
import { ProfileService } from './../../services/profile.service';
import { Router } from '@angular/router';
// import {ProfileModel} from '../../models/profile.model';

const uri = 'http://localhost:3000/api/profile/';
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
    { value: 'Nông dân', id: 1 },
    { value: 'Kỹ sư', id: 2 },
    { value: 'kinh doanh', id: 3  },
    { value: 'Công nhân', id: 4 },
    { value: 'Quản lý', id: 5  },
    { value: 'An ninh', id: 6 },
    { value: 'Y tế', id: 7  },
    { value: 'Giáo viên', id: 8  },
    { value: 'Học sinh, Sinh viên', id: 9  },
    // { value: 'other', id: 10  }
  ];

  degreeOrders = [
    'Trên Đại học',
    'Tốt nghiệp đại học',
    'Đang học đại học',
    'Tốt nghiệp cấp 3',
    'Chưa tốt nghiệp cấp 3'
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
  ) {}

  ngOnInit() {
    this.resetForm();
    this.addProfileForm = this.formBuilder.group({
      _id: [],
      fullname: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      address: [ '', Validators.required],
      phone: [ '', Validators.required],
      degree: ['', Validators.required],
      salary: [ '', Validators.required],
      skills: this.addSkillsControls(),
      worked: ['', Validators.required],
      status: [ '', Validators.required],
      image: ['', Validators.required]
    });
  }
  workOther() {
    console.log('fasjfauihf');
    this.checkWork = !this.checkWork;
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
