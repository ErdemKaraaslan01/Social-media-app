import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FollowInvitationRequestModel} from "../models/follow-invitation-request.model";
import {FollowInvitationResponseModel} from "../models/follow-invitation-response.model";

@Injectable({
  providedIn: 'root',
})
export class FollowRequestService {

  constructor(private http: HttpClient) {
  }

  baseURL = 'http://localhost:8080/follow-requests';

  sendFollowRequest(followRequest: FollowInvitationRequestModel): Observable<FollowInvitationResponseModel> {
    return this.http.post<FollowInvitationResponseModel>(this.baseURL, followRequest);
  }

  checkFollowRequest(senderId: number, receiverId: number): Observable<FollowInvitationResponseModel> {
    return this.http.get<FollowInvitationResponseModel>(this.baseURL.concat('/').concat(senderId.toString()).concat('/', receiverId.toString()));
  }

  cancelFollowRequest(senderId: number, receiverId: number): Observable<any> {
    return this.http.delete<any>(this.baseURL.concat('/delete/').concat(senderId.toString()).concat('/', receiverId.toString()));
  }

  cancelFollow(loggedInUserId: number, visitedUserId: number): Observable<any> {
    return this.http.delete<any>(this.baseURL.concat('/delete/').concat(loggedInUserId.toString()).concat('/', visitedUserId.toString()));
  }

  acceptFollowRequest(loggedInUserId: number, requestSenderId: number): Observable<any> {
    return this.http.post<any>(this.baseURL.concat('/accept/').concat((requestSenderId).toString()).concat('/', String(loggedInUserId)), {})
  }

  deleteFollowRequest(loggedInUserId: number, senderUserId: number): Observable<any> {
    return this.http.delete<any>(this.baseURL.concat('/delete/').concat(senderUserId.toString()).concat('/').concat(loggedInUserId.toString()));
  }
}
