import { Component, OnInit } from '@angular/core';
import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';  
import { Message } from './models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  private client: Client;
  public connected: boolean;

  public message: Message = new Message();
  public messages: Message[] = [];

  constructor() { }

  ngOnInit() {
    this.client = new Client();
    this.client.webSocketFactory= () => {
      return new SockJS('http://localhost:8080/chat-websocket');
    }

    this.client.onConnect = ( frame ) => {
      console.log('Connected: ' + this.client.connected + ' : ' + frame);
      this.connected = true;
      this.client.subscribe('/chat/message', e => {
        let message: Message = JSON.parse(e.body) as Message;
        message.date = new Date(message.date);
        this.messages.push(message);
      });

      this.message.type = "CONNECTED";
      this.client.publish({destination: '/app/message', body: JSON.stringify(this.message)});
    }

    this.client.onDisconnect = ( frame ) => {
      console.log('Disconnected: ' + !this.client.connected + ' : ' + frame);
      this.connected = false;
    }
  }

  connect() {
    this.client.activate();
  }

  disconnect() {
    this.client.deactivate();
  }

  send() {
    this.message.type = "MESSAGE";
    this.client.publish({destination: '/app/message', body: JSON.stringify(this.message)});
    this.message.message = '';
  }
}
