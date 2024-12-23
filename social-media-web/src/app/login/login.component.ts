import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AngularToastrService} from "../services/angular-toastr.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private router: Router,
              private toastrService: AngularToastrService) {
    this.loginForm = fb.group({
      email: '',
      password: ''
    })
  }

  login() {
    this.userService.login(this.loginForm.value).subscribe(value => {
      localStorage.setItem('currentUser', JSON.stringify(value));
      this.router.navigate(['/', 'profile']);
    },error => {
      this.toastrService.showError(error.error.message, "Error");
    })
//test
  }


}
