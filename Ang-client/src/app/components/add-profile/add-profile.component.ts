import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
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
  skillsOrders = [
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

  constructor(
    // private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.resetForm();
    // this.addProfileForm = this.formBuilder.group({
    //   _id: [],
    //   fullname: ["", Validators.required],
    //   gender: ["", Validators.required],
    //   birthday: ["", Validators.required],
    //   address: ["", Validators.required],
    //   phone: ["", Validators.required],
    //   degree: ["", Validators.required],
    //   salary: ["", Validators.required],
    //   skills: [],
    //   worked: ["", Validators.required],
    //   status: ["", Validators.required],
    //   imgULR: ["", Validators.required]
    // });
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

  onSubmitAddForm(form: NgForm) {
    if (form.value._id == "") {
      this.profileService.postProfile(form.value).subscribe(data => {
        console.log(data);
        this.router.navigate(["confirm-profile"]);
      });
    } else {
      this.profileService.updatePutProfile(form.value).subscribe(data => {
        console.log(data);
        this.router.navigate(["confirm-profile"]);
      });
    }
  }

  // onSubmitAddForm() {
  //   this.submitted = true;
  //   this.profileService
  //     .addProfile(this.addProfileForm.value)
  //     .subscribe(data => {
  //       console.log(data);
  //       this.router.navigate(["all"]);
  //     });
  // }
}
