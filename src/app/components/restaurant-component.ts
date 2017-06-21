import { Component } from '@angular/core';
import { RestaurantList } from './restaurant-list'
import { EditRestaurantContainer } from './edit-restaurant-container'
import {EditReviewDTOContainer} from './edit-reviewDTO-container'
import { RestaurantActionService } from './../services/restaurant-action.service';
import { WaitIndicator } from './wait-indicator';
import PubSubService,{PubSubSystem} from './../services/pubsub.service';
import { Subject } from "rxjs/Subject";
import {FeedbackMessage} from './../model/restaurant.interface';
import * as postal from 'postal';

@Component({
  selector: 'restaurant-component',
  styles: [` 

     .restaurantApp   #mainDisplayMessage { 
       font-size: 20px;  
       margin: 20px;
       border: thin solid #ddd;
       height: 40px;
       
      }

    .restaurantApp   #mainDisplayMessage.success {
      color: blue; }
    .restaurantApp   #displayMessage.error {
      color: red; }



  `],
  template: `
  
  <h3>Restaurant List</h3>
    <div id="reactRestaurantContainer">
        <div class="restaurantApp grouping">
            <wait-indicator [isProcessing]="true"></wait-indicator>
            <div id="mainDisplayMessage">
                {{displayMessage}}
                <button (click)="sendMessage()" class="btn btn-primary">Send Message</button>
            </div>
            <restaurant-list></restaurant-list>
            <div id="editControlGroup" class="grouping">
                    <edit-restaurant-container></edit-restaurant-container>
                    <edit-reviewDTO-container></edit-reviewDTO-container>
            </div>

             
        

        </div>


      
    </div>
 
  
  `
})
export class RestaurantComponent    {

  displayMessage: string;
  private   cc:IChannelDefinition  = postal.channel('test-channel');

  constructor( ) {
 
    this.displayMessage = "get a job, bozo";

  }

  ngOnInit()
  {
    console.log("init")
 
      
      
  }

  sendMessage()
  {
     this.cc.publish("fred.test-topic", {message: 'get a job'})
     
  }
   



}
