import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';

import {ChatService} from '../../services/chat.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
	user: string = '';
	room: string = '';
	disable:boolean = false;
	message;
	_room: string = '';
	messageArray:Array<{user:String,message:String}> = [];
    rooms:Array<String>= [];
  constructor(private chat: ChatService) {
  	this.chat.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));
    this.chat.newMessageReceived()
        .subscribe(data=>this.messageArray.push(data));
    this.chat.roomadded()
        .subscribe(data=>this.rooms.push(data));    
    this.chat.left()
        .subscribe(data=>this.messageArray.push(data));
   }

   join(){
   	this.disable = true;
   	this.chat.join({user:this.user, room:this.room});
   }
   leave(){
   	this.chat.leave({user:this.user, room:this.room});
   }
   sendMessage(){
   	this.chat.sendMessage({user:this.user, room:this.room, message:this.message});
   }
   addRoom(){
   	this.chat.addroom(this._room);
   }
  ngOnInit() {
  }

}
