import { Component } from '@angular/core';
import * as postal from "postal";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import PubSubService, { PubSubSystem } from './../services/pubsub.service';
import { SAVE_REVIEW_COMMIT_TOPIC, EDIT_RESTAURANT_TOPIC, WAIT_TOPIC, REFRESH_REVIEW_TOPIC, CRUD_RESTAURANT_WILDCARD_TOPIC } from './../services/pubsub.service'
import { WaitRequest, Restaurant, ReviewDTO, ReviewPayload } from "../model/restaurant.interface";
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

               <tr [ngClass]="{dimmed: dimThisRow(review)}" [attr.data-id]="review.id"   *ngFor="let review of this.reviewList; let indexVal = index">
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
    private reviewBackup: ReviewDTO = null;

    constructor(fb: FormBuilder, private subProvider: PubSubService) {
        // console.log("in DTO con")
        this.sub = subProvider.getService();
        let s1 = this.sub.getChannel().subscribe(CRUD_RESTAURANT_WILDCARD_TOPIC,
            (data: any, envelope: IEnvelope) => this.handleCrudOperation(data.selectedRestaurant, envelope));

        let s2 = this.sub.getChannel().subscribe(REFRESH_REVIEW_TOPIC,
            (data: any, envelope: IEnvelope) => this.handleRefresh(data.selectedRestaurant, envelope));

        this.subscriptions.push(s1);
        this.subscriptions.push(s2);

    }

    sendWait(state: boolean) {
        var waitMessage = <WaitRequest>{};
        waitMessage.state = state;
        this.sub.getChannel().publish(WAIT_TOPIC, waitMessage);
    }

    handleRefresh(data:Restaurant, envelope: IEnvelope) {
         this.backUp = { ...data  };
         this.reviewList = this.backUp.reviewDTOs;
         this.reviewBackup = null;
         this.sendWait(false);
    }

    dimThisRow(currentReview) {
        if (this.reviewBackup) {
            if (this.reviewBackup.id === currentReview.id) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }

    handleCrudOperation(data: Restaurant, envelope: IEnvelope) {

        let action = envelope.topic.split('.')[0];
        console.log("receiving crud " + JSON.stringify(envelope))
        if (action === "EDIT") {
            // console.log("data " + JSON.stringify(data.reviewDTOs))

            this.backUp = { ...data };
            this.reviewList = this.backUp.reviewDTOs;
            this.reviewBackup = null;
        }
        if (action === "DELETE") {
            // console.log("data " + JSON.stringify(data.reviewDTOs))

            this.backUp = null;
            this.reviewList = null;
            this.reviewBackup = null;
        }

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


    onEditChangeEvent(ev) {

        if (this.reviewBackup && this.reviewBackup.id !== ev.selectedReview.id) {
            return;
        } //end if review matches current review


        if (ev.type == "DELETE") {
            let sure = window.confirm("Are you sure you want to delete the current review?");
            if (sure) {

            }
            return;
        }



        console.log("review container " + JSON.stringify(ev));
        this.reviewBackup = { ...ev.selectedReview };

        if (ev.type == "CANCEL") {
            this.reviewBackup = null;
            let t: IEnvelope = <IEnvelope>{};
            t.topic = EDIT_RESTAURANT_TOPIC;
            this.handleCrudOperation(this.backUp, t);

            return;
        }
        if (ev.type === 'SAVE') {
            //console.log("the review listing is "+ev.selectedReview.reviewListing)
            let payload: ReviewPayload = <ReviewPayload>{};
            payload.restaurantId = this.backUp.id;
            payload.reviewDTO = ev.selectedReview;

            this.sub.getChannel().publish(SAVE_REVIEW_COMMIT_TOPIC, payload);


        }









    }






}
