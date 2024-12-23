import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Config} from "../models/Config";
import {MessageResponseModel} from "../models/message-response.model";
import {SendMessageModel} from "../models/send-message.model";
import {AllMessagesBetweenTwoUserModel} from "../models/all-messages-between-two-user.model";


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {
  }

  baseURL = 'http://localhost:8080/messages/';

//ToDo: string döndüğü zaman ne yapmak lazım araştırılacak.

  sendMessage(model: SendMessageModel): Observable<SendMessageModel>{
    return this.http.post<SendMessageModel>('http://localhost:8080/sent-messages/send-message', model);
  }

  getAllMessagesBetweenTwoUser(UserId1: number, UserId2: number): Observable<AllMessagesBetweenTwoUserModel[]>{
    return this.http.get<AllMessagesBetweenTwoUserModel[]>('http://localhost:8080/sent-messages/users-all-messages/'
      .concat(UserId1.toString()) + '/' .concat(UserId2.toString()));
  }


}

