import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.currentUser = null;
      }
    });
  }

  // return the current authentication state of the user
  getAuthState() {
    return this.authState;
  }

  // create new user with email/password
  signup(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.navigate('');
    })
    .catch(err => {
      return err.message;
    });

    return 'Invalid email or password';
  }

  // popup to login with google account
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    ).then(() => {
      this.navigate('home');
    })
    .catch(err => {
      return err.message;
    });
  }

  // log in with an email and password
  loginEmail(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.navigate('home');
    })
    .catch(err => {
      return err.message;
    });
  }

  // log out (returns a promise) and return to the home (login) page
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.navigate('');
    });
  }

  // navigate the user to a new page
  navigate(location: string) {
    this.router.navigate([location]);
  }
}