import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthComponent } from "./../components/auth/auth.component";
import { LoginComponent } from "./../components/login/login.component";
import { SignUpComponent } from "./../components/sign-up/sign-up.component";
import { AuthService } from "./../services/auth.service";
import { TokenService } from "./../services/token.service";
@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],

  exports: [AuthComponent, LoginComponent, SignUpComponent],
  providers: [AuthService, TokenService]
})
export class AuthModule {}
