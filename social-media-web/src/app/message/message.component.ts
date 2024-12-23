import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from "../services/message.service";
import {Router} from "@angular/router";
import {SendMessageModel} from "../models/send-message.model";
import {UserResponseModel} from "../models/user-response.model";
import {AllMessagesBetweenTwoUserModel} from "../models/all-messages-between-two-user.model";
import {interval, Subscription} from "rxjs";
import {ProfileComponent} from "../profile/profile.component";


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {


  message!: string;
  receiver?: UserResponseModel;
  currentUser? = JSON.parse(localStorage.getItem('currentUser')!);
  allMessagesBetweenTwoUser?: AllMessagesBetweenTwoUserModel[];

  subscription?: Subscription;

  constructor(private messageService: MessageService,
              private router: Router) {

    this.receiver = router.getCurrentNavigation()?.extras.state?.data;
  }

  ngOnInit(): void {

    //emit value in sequence every 10 second
    const source = interval(1000);
    this.subscription = source.subscribe(val => {
      console.log(val);
      this.messageService.getAllMessagesBetweenTwoUser(this.currentUser.id, this.receiver?.id!).subscribe(value => {
        this.allMessagesBetweenTwoUser = value;
      });
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


  sendMessage() {
    let sendMessageModel: SendMessageModel = {
      messageContent: this.message,
      senderId: this.currentUser.id,
      receiverId: this.receiver?.id!,
    };

    this.messageService.sendMessage(sendMessageModel!).subscribe(() => {
        this.messageService.getAllMessagesBetweenTwoUser(this.currentUser.id, this.receiver?.id!).subscribe(value => {
          this.allMessagesBetweenTwoUser = value;
        });
      },
    );
    this.message = '';

  }

  goToReceiversProfile(receiverUser: UserResponseModel){
    this.router.navigate(['/profile', receiverUser.id], {
      state: {
        data: receiverUser
      }
    });
  }


}
