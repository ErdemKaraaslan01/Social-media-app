export interface FollowInvitationResponseModel {

  id: number;
  senderId: number;
  receiverId: number;
  requestStatus: string | null;
  requestTime: Date;

}
