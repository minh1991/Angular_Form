import { BrowserModule } from "@angular/platform-browser";

import { NgModule } from "@angular/core";
import { AuthModule } from "./modules/auth.module";
import { AppComponent } from "./app.component";
import { AuthRoutingModule } from "./modules/auth-routing.module";
import { CookieService } from "ngx-cookie-service";
import { ProfileModule } from "./modules/profile.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ZipValidatorDirective } from "./directives/zip-validator.directive";

@NgModule({
  declarations: [AppComponent, ZipValidatorDirective],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    ProfileModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
