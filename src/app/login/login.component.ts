import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseApp } from 'angularfire2';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: []
})

export class LoginComponent implements OnInit {
  email : FormControl = new FormControl('', [Validators.required, Validators.email]);
  password : FormControl = new FormControl('', [Validators.required, Validators.minLength(6)])
  user : firebase.User = null;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.auth.getAuthState().subscribe(user => this.user = user);
  }

  getPWMessage() {
    return this.password.hasError('required') ? 'Enter a password' :
      this.password.hasError('minlength') ? 'Password must be at least 6 characters' :
        '';
  }

  getEmailMessage() {
    return this.email.hasError('required') ? 'Enter an email' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  loginGoogle() {
    this.auth.loginGoogle();
  }

  loginEmail() {
    this.auth.loginEmail(this.email.value, this.password.value);
  }
}
