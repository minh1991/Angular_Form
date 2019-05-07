import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';
import { Messenger } from './../../supposts/message';
import { Constant } from './../../supposts/constant';
import { String } from 'typescript-string-operations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // public errorMessage: string;
  errorValidateField: Array<any> = [];
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.init();
  }
  init() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Constant.PATTERN.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(Constant.PATTERN.PASSWORD)]]
    });
  }


  public get form() {
    return this.loginForm.controls;
  }

  showErrors(messager) {
    // console.log(messager);
    this.errorValidateField.push(messager);
    console.log(this.errorValidateField);
  }

  loginUser() {
    // this.errorValidateField = new Object();
    this.errorValidateField = [];
    if (this.loginForm.invalid) {
      if (this.form.email.errors) {
        if (this.form.email.errors.required) {
          this.showErrors({ email: String.Format(Messenger.MSG0002, 'Email') });
        }
        if (this.form.email.errors.pattern) {
          this.showErrors({ email: String.Format(Messenger.MSG0001, 'Email') });
        }
      } else {
        this.showErrors({ email: '' });
      }
      if (this.form.password.errors) {
        if (this.form.password.errors.required) {
          this.showErrors({ password: String.Format(Messenger.MSG0002, 'Password') });
        }
        if (this.form.password.errors.pattern) {
          this.showErrors({ password: String.Format(Messenger.MSG0001, 'Password') });
        }
      } else {
        this.showErrors({ password: '' });
      }
      return true;
    }

    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        console.log(data);
        this.loginForm.reset();
        this.router.navigate(['all']);
      },
      err => {
        console.log(err.error);
        // this.errorMessage = err.error;
      }
    );
  }
}
