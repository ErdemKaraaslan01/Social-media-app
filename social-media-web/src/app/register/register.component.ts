import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RegisterService} from "../services/register.service";
import {GenderRadioMenu} from "../models/gender-radio-menu";
import {RegisterRequestModel} from "../models/register-request.model";
import {AngularToastrService} from "../services/angular-toastr.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm?: FormGroup;
  genderMenu: GenderRadioMenu[] = [{text: "Erkek", value: 0}, {text: "Kadın", value: 1}]
  isRegistered: boolean = false;
  registerForm2?: RegisterRequestModel;
  isFieldsFull: boolean = false;

  constructor(fb: FormBuilder,
              private registerService: RegisterService,
              private toastrService: AngularToastrService,
              private router: Router) {
    this.registerForm = fb.group({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: [],
      about: '',
      password: ''
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.registerForm2 = this.registerForm?.value;

    if (!this.registerForm2?.email || !this.registerForm2?.password || !this.registerForm2?.firstName
      || !this.registerForm2?.lastName || !this.registerForm2?.username) {
      this.toastrService.showError("Fields with asterisks must be filled", "Error");
    } else {
      this.registerService.register(this.registerForm2).subscribe(
        (response) => {
          // Handle successful registration
          this.toastrService.showSuccess('Registration successful!', 'Success');
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle error response
          this.toastrService.showError(error.errorMessage?.toString(), 'Error');
        }
      );
    }
  }
}













