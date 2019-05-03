import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private cookie: CookieService) {}
  SetToken(token) {
    this.cookie.set('myToken', token);
  }
  GetToken() {
    return this.cookie.get('myToken');
  }
  DeleteToken() {
    return this.cookie.delete('myToken');
  }
}
