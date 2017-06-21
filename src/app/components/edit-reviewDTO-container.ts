import { Component } from '@angular/core';
import * as postal from "postal";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import PubSubService, { PubSubSystem } from './../services/pubsub.service';
import { CRUD_WILDCARD_TOPIC } from './../services/pubsub.service'




@Component({
    selector: 'edit-reviewDTO-container',
    template: ` 
      <section class="editReviewContainer">
   <div>edit reviews</div>
    </section>
    
  `
})

export class EditReviewDTOContainer {

     
     private subscriptions: ISubscriptionDefinition[] = [];
     private sub: PubSubSystem;

    constructor(fb: FormBuilder,private subProvider: PubSubService) {
        console.log("in DTO con")
        this.sub = subProvider.getService();
        let s1 = this.sub.getChannel().subscribe(CRUD_WILDCARD_TOPIC,
            (data: any, envelope: IEnvelope) => this.handleCrudOperation(data, envelope));
            
        this.subscriptions.push(s1);

    }


    handleCrudOperation(data:any,envelope:IEnvelope)
    {
        console.log("DTO saw "+envelope.topic);
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







}
