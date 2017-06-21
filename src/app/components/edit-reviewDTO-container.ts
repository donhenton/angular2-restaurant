import { Component } from '@angular/core';
import * as postal from "postal";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import PubSubService, { PubSubSystem } from './../services/pubsub.service';
import { CRUD_RESTAURANT_WILDCARD_TOPIC } from './../services/pubsub.service'
import { Restaurant,ReviewDTO } from "../model/restaurant.interface";
import { ReviewListRow } from './review-list-row';



@Component({
    selector: 'edit-reviewDTO-container',
    template: ` 
     
     <section [hidden]="backUp === null" class="editReviewContainer">
            <span class="editHeader">Reviews</span>
            <button class="editButton addButton">Add Review</button>
    
    
    
            <div id="reviewTableHeaderContainer">
               <table>
                <tbody>
                <tr><th class="rating">Stars</th><th class="listing">Review</th><th class="actionButton">&nbsp;</th><th class="actionButton">&nbsp;</th></tr>
                </tbody>
                </table> 
            </div>
    
    
    
              
              <div id="reviewTableBodyContainer">
              <table>
              <tbody>

               <tr  [attr.data-id]="review.id"   *ngFor="let review of this.reviewList; let indexVal = index">
                  <review-list-row [idx]="indexVal" [currentReview]="reviewBackup" (edit-event)="onEditChangeEvent($event)"   [review]="review"></review-list-row>
                  </tr>

              </tbody>
              </table>
              </div>
    </section>          
    
  `
})

export class EditReviewDTOContainer {


    private subscriptions: ISubscriptionDefinition[] = [];
    private sub: PubSubSystem;
    private reviewList: ReviewDTO[];
    private backUp: Restaurant = null;
    private reviewBackup:ReviewDTO;

    constructor(fb: FormBuilder, private subProvider: PubSubService) {
        // console.log("in DTO con")
        this.sub = subProvider.getService();
        let s1 = this.sub.getChannel().subscribe(CRUD_RESTAURANT_WILDCARD_TOPIC,
            (data: any, envelope: IEnvelope) => this.handleCrudOperation(data.selectedRestaurant, envelope));

        this.subscriptions.push(s1);

    }


    handleCrudOperation(data: Restaurant, envelope: IEnvelope) {

         let action = envelope.topic.split('.')[0];
         if (action === "EDIT")
         {
             console.log("data "+JSON.stringify(data.reviewDTOs))
         }
          this.backUp = { ...data };
          this.reviewList = this.backUp.reviewDTOs;

    }

    ngOnDestroy() {

        this.subscriptions.forEach(s => {
            if (s) {

                s.unsubscribe();
                s = null;
            }
        })

    }

    ngOnInit() {
        console.log("init")


    }


    onEditChangeEvent(ev)
    {
        console.log("review container "+JSON.stringify(ev));
        this.reviewBackup = {...ev.selectedReview};
    }






}
