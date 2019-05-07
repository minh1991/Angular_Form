import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';
import { Messenger } from './../../supposts/message';
import { Constant } from './../../supposts/constant';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  // public errorMessage: string;
  errorValidateFieldSignUp: Array<any> = [];
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.init();
  }
  init() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(Constant.PATTERN.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(Constant.PATTERN.PASSWORD)]]
    });
  }

  public get formSignUp() {
    // console.log(this.signupForm.controls);
    return this.signupForm.controls;
  }

  showErrors(messager) {
    // console.log(messager);
    this.errorValidateFieldSignUp.push(messager);
    console.log(this.errorValidateFieldSignUp);
  }

  onSubmitSignUp() {
    // console.log('đămng ksau');
    this.errorValidateFieldSignUp = [];
    if (this.signupForm.invalid) {
      if (this.formSignUp.username.errors) {
       if (this.formSignUp.username.errors.required) {
        this.showErrors({username: String.Format(Messenger.MSG0002, 'Username')});
       }
      }
      if (this.formSignUp.email.errors) {
        if (this.formSignUp.email.errors.required) {
          this.showErrors({email: String.Format(Messenger.MSG0002, 'Email')});
        }
        if (this.formSignUp.email.errors.pattern) {
          this.showErrors({email: String.Format(Messenger.MSG0001, 'Email')});
        }
      }
      if (this.formSignUp.password.errors) {
        if (this.formSignUp.password.errors.required) {
          this.showErrors({password: String.Format(Messenger.MSG0002, 'Password')});
        }
        if (this.formSignUp.password.errors.pattern) {
          this.showErrors({password: String.Format(Messenger.MSG0001, 'Password')});
        }
      }
      return true;
    }
    this.authService.signUpUser(this.signupForm.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        console.log(data);
        this.signupForm.reset();
        this.router.navigate(['all']);
      },
      err => {
        console.log(err);
        // this.errorMessage = JSON.stringify(err.error.message);
      }
    );
  }
}
