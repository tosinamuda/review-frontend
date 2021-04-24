import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Constant } from '../../../utilities/constant';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private router: Router) {}

  public isAuthenticated(): boolean {    const token = localStorage.getItem(Constant.ACCESS_TOKEN);
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  get token(): string {
    return localStorage.getItem(Constant.ACCESS_TOKEN);
  }

}
