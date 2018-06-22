import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user : firebase.User = null;
  loginText : string = "Login";
  constructor(private auth: AuthService, private router : Router) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => {
      this.user = user;
      if (user == null) {
        this.loginText = "Login";
      }
      else {
        this.loginText = "Logout";
      }
    });
  }

  directUser() {
    if (this.user == null) {
      this.router.navigate(['']); // login page
    }
    else {
      this.auth.logout();
    }
  }
}
