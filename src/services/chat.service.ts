import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class ChatService {
	SERVER_URL = 'http://localhost:3001';
	private socket;

  constructor() {
    this.socket = io(this.SERVER_URL); 
  }
  join(data){
  	this.socket.emit('join',data);
  }
  leave(data){
  	this.socket.emit('leave',data);
  }
  newUserJoined()
  {
  	let observable = new Observable<{user:String, message:String}>(observer=>{
  		this.socket.on('new user joined', (data)=>{
  			observer.next(data);
  		});
  		return () => {this.socket.disconnect();}
  	});
  	return observable;
  }
  left(){
  	let observable = new Observable<{user:String, message:String}>(observer=>{
  		this.socket.on('left', (data)=>{
  			observer.next(data);
  		});
  		return () => {this.socket.disconnect();}
  	});
  	return observable;
  }
  sendMessage(data)
  {
  	this.socket.emit('message',data);
  }
  newMessageReceived(){
  	let observable = new Observable<{user:String, message:String}>(observer=>{
  		this.socket.on('new message', (data)=>{
  			
  			observer.next(data);
  		});
  		return () => {this.socket.disconnect();}
  	});

  	return observable;
  }
  roomadded(){
  	let observable = new Observable<String>(observer=>{
  		this.socket.on('roomadded', (data)=>{
  			observer.next(data);
  		});
  		return () => {this.socket.disconnect();}
  	});
  	return observable;
  }
  addroom(room){
  	this.socket.emit('addroom',room);
  }
}
