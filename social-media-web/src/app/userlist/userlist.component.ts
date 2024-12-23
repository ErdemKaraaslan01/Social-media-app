import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserResponseModel} from "../models/user-response.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  allUsers?: UserResponseModel[];
  loggedInUser: UserResponseModel = {};
  constructor(private userService: UserService,
              private router: Router) {
    this.loggedInUser = router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(value => {
      this.allUsers = value;
    })
  }


  visitProfile(userToVisit: UserResponseModel) {
    this.router.navigate(['/profile', userToVisit.id], {
      state: {
        data: userToVisit
      }
    });
  }

  logout() {
    localStorage.setItem('currentUser', '');
    this.router.navigate(['/login']);
  }
}
