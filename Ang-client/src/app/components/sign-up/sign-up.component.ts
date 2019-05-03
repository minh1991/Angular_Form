import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from './../../services/token.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signupForm: FormGroup;
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
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.authService.signUpUser(this.signupForm.value).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        console.log(data);
        this.signupForm.reset();
        this.router.navigate(['all']);
      },
      err => {
        console.log(err);

        this.errorMessage = JSON.stringify(err.error.message);
      }
    );
  }
}
