import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  NgForm
} from "@angular/forms";
import { ProfileService } from "./../../services/profile.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-profile",
  templateUrl: "./add-profile.component.html",
  styleUrls: ["./add-profile.component.css"]
})
export class AddProfileComponent implements OnInit {
  addProfileForm: FormGroup;
  submitted = false;
  formArr: Array<any> = [];
  skillsOrders: Array<any> = [
    { name: "HTML", id: 1 },
    { name: "CSS", id: 2 },
    { name: "JAVASCRIPT", id: 2 },
    { name: "NODE JS", id: 3 },
    { name: "PHP", id: 4 },
    { name: "ANGULAR", id: 5 },
    { name: "REACT JS", id: 6 },
    { name: "VUE JS", id: 7 },
    { name: "NO-SQL", id: 8 },
    { name: "SQL", id: 9 }
  ];
  selectedSkillsValues = [];
  skillsErrors: Boolean = true;

  worksOrders = [
    { name: "Nông dân", value: "Nông dân" },
    { name: "Kỹ sư", value: "Kỹ sư" },
    { name: "kinh doanh", value: "kinh doanh" },
    { name: "Công nhân", value: "Công nhân" },
    { name: "Quản lý", value: "Quản lý" },
    { name: "An ninh", value: "An ninh" },
    { name: "Y tế", value: "Y tế" },
    { name: "Giáo viên", value: "Giáo viên" },
    { name: "Học sinh, Sinh viên", value: "Học sinh, Sinh viên" }
  ];

  degreeOrders = [
    "Trên Đại học",
    "Tốt nghiệp đại học",
    "Đang học đại học",
    "Tốt nghiệp cấp 3",
    "Chưa tốt nghiệp cấp 3"
  ];

  salaryOrders = [
    "Trên 2000$",
    "Trên 1000$",
    "Trên 500$",
    "Trên 100$",
    "Chưa có lương cố định"
  ];

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.resetForm();
    this.addProfileForm = this.formBuilder.group({
      _id: [],
      fullname: ["", Validators.required],
      gender: ["", Validators.required],
      birthday: ["", Validators.required],
      address: ["", Validators.required],
      phone: ["", Validators.required],
      degree: ["", Validators.required],
      salary: ["", Validators.required],
      skills: this.addSkillsControls(),
      worked: ["", Validators.required],
      status: ["", Validators.required],
      imgULR: ["", Validators.required]
    });
  }

  addSkillsControls() {
    const arr = this.skillsOrders.map(elm => {
      this.formBuilder.control(false);
    });
    return this.formBuilder.array(arr);
  }
  get skillsArr() {
    return <FormArray>this.addProfileForm.get("skills");
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
        _id: "",
        fullname: "",
        gender: true,
        birthday: null,
        address: "",
        phone: null,
        degree: "",
        salary: "",
        skills: "",
        worked: "",
        status: "",
        imgULR: ""
      };
    }
  }

  onSubmitAddForm(addProfileForm) {
    this.addProfileForm.value.skills = this.selectedSkillsValues;
    // console.log("form data  ", addProfileForm.value);
    const formData = this.addProfileForm.value;
    this.profileService.pushData(formData);
    console.log(formData);
    this.router.navigate(["confirm-profile"]);

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
