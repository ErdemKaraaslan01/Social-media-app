import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserResponseModel} from "../models/user-response.model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-profile',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  userOldInfos?: UserResponseModel;
  //ToDo: form kullanılacak (login ekranında var)
  //ToDo: bu ekran kullanılmayacak
  userNewInfos: UserResponseModel = {};


  constructor(private router: Router,
              private userService: UserService,
              private toastrService: ToastrService) {
    this.userOldInfos = router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {
  }

  updateUser() {
    this.userNewInfos.id = this.userOldInfos?.id;
    this.userService.updateUser(this.userNewInfos!).subscribe(value => {
      localStorage.setItem('currentUser', JSON.stringify(value));
      this.router.navigate(['/profile']);
    },
      error => {
        this.toastrService.error(error.errorMessage?.toString(), 'Error');
      }
    )

  }

}
