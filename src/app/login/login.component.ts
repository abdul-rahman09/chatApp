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
  search:string = '';
  selectedRoom:string = ''; 
	user: string = '';
	room: string = '';
	disable:boolean = false;
	message;
	_room: string = '';
	messageArray:Array<{user:String,message:String }> = [];
  allMessages : Array<Array<{user:String,message:String}>> =[]; 
  rooms:Array<String>= [];
  roomsDisplayed:Array<String> = [];
  total_popups = 0;
  popups = [];




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
    if(this.selectedRoom == '' || this.user == ''){
      return;
    }
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
    this.roomsDisplayed = this.rooms;
  	this.rooms.push('1');
  	this.rooms.push('2');
  	this.rooms.push('3');
    this.rooms.push('4');
    this.rooms.push('5');
    this.rooms.push('6');
    this.rooms.push('7');
    this.rooms.push('8');
    this.rooms.push('9');
    this.rooms.push('10');
    this.rooms.push('11');
    this.rooms.push('12');
    this.rooms.push('13');
    this.rooms.push('14');
    this.rooms.push('15');

  }

  searching() {
    console.log(this.search);
    let found:boolean=false;
    this.roomsDisplayed = [];
    for (let j in this.rooms) {
      if(this.rooms[j].includes(this.search)) {
        this.roomsDisplayed.push(this.rooms[j]);
        found = true;
      }
    }
    if(!found){
      this.roomsDisplayed.push('Not found');
    }
  }
  select(temp){
    this.selectedRoom = temp;
    this.room = temp;
  }
}
