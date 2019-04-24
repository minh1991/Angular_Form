import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./../components/auth/auth.component";
import { LoginComponent } from "./../components/login/login.component";
import { SignUpComponent } from "./../components/sign-up/sign-up.component";
@NgModule({
  declarations: [AuthComponent, LoginComponent, SignUpComponent],
  imports: [CommonModule],
  exports: [AuthComponent, LoginComponent, SignUpComponent]
})
export class AuthModule {}
