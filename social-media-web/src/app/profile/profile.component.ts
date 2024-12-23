import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {UserResponseModel} from "../models/user-response.model";
import {Router} from "@angular/router";
import {NotificationService} from "../services/notification.service";
import {NotificationModel} from "../models/notification.model";
import {FollowRequestService} from "../services/follow-request.service";
import {FollowInvitationResponseModel} from "../models/follow-invitation-response.model";
import {FollowInvitationRequestModel} from "../models/follow-invitation-request.model";
import {FollowService} from "../services/follow.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userFollowers?: UserResponseModel[];
  userFollowings?: UserResponseModel[];
  userNotifications?: NotificationModel[];
  currentUser?: UserResponseModel;
  visitedUser?: UserResponseModel;
  temp?: UserResponseModel;
  loggedInUser?: UserResponseModel;
  followRequest?: FollowInvitationRequestModel = {receiverId: 0, senderId: 0};
  followStatus?: FollowInvitationResponseModel | null;
  saveFollow?: FollowInvitationRequestModel = {receiverId: 0, senderId: 0};
  updateFollowRequest?: FollowInvitationRequestModel = {receiverId: 0, senderId: 0}


  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private followRequestService: FollowRequestService,
              private followService: FollowService,
              private router: Router) {
    this.visitedUser = router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {

    if (this.visitedUser == null) {
      this.temp = this.userService.getCurrentUser();
      this.currentUser = this.userService.getCurrentUser();
    } else {
      this.temp = this.visitedUser;
    }

    this.loggedInUser = JSON.parse(localStorage.getItem('currentUser')!);


    this.userService.getUserFollowers(this.temp.id!).subscribe(value => {
      this.userFollowers = value;
    });

    this.userService.getUserFollowings(this.temp.id!).subscribe(value => {
      this.userFollowings = value;
    });

    if (this.temp?.id == this.currentUser?.id) {
      this.notificationService.getUserNotifications(this.temp.id!).subscribe(value => {
        this.userNotifications = value;
      });
    }

    this.followRequestService.checkFollowRequest(this.loggedInUser?.id!, this.visitedUser?.id!).subscribe(value => {
      this.followStatus = value;
    })


  }

  goToMessagePage(receiver: UserResponseModel) {
    this.router.navigate(['/message'], {
      state: {
        data: receiver
      }
    });
  }


  goToEditPage(userInfo: UserResponseModel) {
    this.router.navigate(['/edit'], {
      state: {
        data: userInfo
      }
    });
  }

  goToUserlistPage(loggedInUser: UserResponseModel) {
    this.router.navigate(['/userlist'], {
      state: {
        data: loggedInUser
      }
    });
  }

  sendFollowRequest(senderId: number, receiverId: number) {

    this.followRequest!.senderId = senderId;
    this.followRequest!.receiverId = receiverId;
    this.followRequestService.sendFollowRequest(this.followRequest!).subscribe(value => {
      this.followStatus!.requestStatus = value.requestStatus;
    });
  }


  cancelFollowRequest(loggedInUserId: number, visitedUserId: number) {
    this.followRequestService.cancelFollowRequest(loggedInUserId, visitedUserId).subscribe(value => {
      //this.followStatus!.requestStatus = null;
      this.followStatus = null;
    });
  }

  cancelFollow(loggedInUserId: number, visitedUserId: number) {
    this.followRequestService.cancelFollow(loggedInUserId, visitedUserId).subscribe();
    this.followService.cancelFollow(loggedInUserId, visitedUserId).subscribe(value => {
      this.followStatus!.requestStatus = null
    });
  }


  acceptFollowRequest(loggedInUserId: number, requestSenderId: number) {
    this.followRequestService.acceptFollowRequest(loggedInUserId, requestSenderId).subscribe();

    this.saveFollow!.senderId = requestSenderId;
    this.saveFollow!.receiverId = loggedInUserId;
    this.followService.saveFollow(this.saveFollow!).subscribe();

    this.updateFollowRequest!.senderId = requestSenderId;
    this.updateFollowRequest!.receiverId = loggedInUserId;
    this.notificationService.updateFollowRequestNotificationToInfo(this.updateFollowRequest!).subscribe();

  }

  rejectFollowRequest(loggedInUserId: number, senderUserId: number) {
    this.followRequestService.deleteFollowRequest(loggedInUserId, senderUserId).subscribe();
    this.notificationService.deleteNotification(loggedInUserId, senderUserId).subscribe()
  }

  logout() {
    localStorage.setItem('currentUser', '');
    this.router.navigate(['/login']);
  }


}
