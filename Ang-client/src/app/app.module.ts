import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AuthModule } from "./modules/auth.module";
import { AppComponent } from "./app.component";
import { AuthRoutingModule } from "./modules/auth-routing.module";
import { CookieService } from "ngx-cookie-service";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AuthModule, AuthRoutingModule],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
