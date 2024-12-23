import {UserResponseModel} from "./user-response.model";

export interface NotificationModel {

    id: number;
    notificationType: string;
    causingUser: UserResponseModel;
    receiverUser: UserResponseModel;
    content: string;
    sentTime: Date;


}
