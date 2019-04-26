import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../../services/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TokenService } from "./../../services/token.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  public signUpUser: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.signUpUser = this.formBuilder.group({});
  }
}
