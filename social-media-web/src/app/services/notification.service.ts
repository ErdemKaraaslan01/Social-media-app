import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationModel} from "../models/notification.model";
import {FollowInvitationRequestModel} from "../models/follow-invitation-request.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private http: HttpClient) {
  }

  baseURL = 'http://localhost:8080/notifications/';


  /*login(dto: LoginRequestModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>(this.baseURL.concat('login'), dto);
  }

  getUserFollowers(id: number): Observable<UserResponseModel[]> {
    return this.http.get<UserResponseModel[]>(this.baseURL.concat('followersV2/', id.toString()));
  }*/

  getUserNotifications(userId: number): Observable<NotificationModel[]> {
    return this.http.get<NotificationModel[]>(this.baseURL.concat(userId.toString()));
  }

  updateFollowRequestNotificationToInfo(updateFollowRequest: FollowInvitationRequestModel): Observable<any> {
    return this.http.post<any>(this.baseURL.concat('updateFollowRequestNotificationToInfo'), updateFollowRequest);
  }

  deleteNotification(loggedInUserId: number, senderUserId: number): Observable<any> {
    return this.http.delete<any>(this.baseURL.concat('/delete/').concat(senderUserId.toString()).concat('/'.concat(loggedInUserId.toString())));
  }
}
