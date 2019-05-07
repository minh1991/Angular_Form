import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { TokenService } from './../../services/token.service';
import { Messenger } from './../../supposts/message';
import { Constant } from './../../supposts/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string;
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
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(Constant.PATTERN.EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(Constant.PATTERN.PASSWORD)]]
    });
  }

  loginUser() {
    this.authService.loginUser(this.loginForm.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        console.log(data);
        this.loginForm.reset();
        this.router.navigate(['all']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}
