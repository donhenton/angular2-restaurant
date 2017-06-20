import { Component } from '@angular/core';
import * as postal from "postal";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';





@Component({
    selector: 'edit-reviewDTO-container',
    template: ` 
      <section class="editReviewContainer">
   <div>edit reviews</div>
    </section>
    
  `
})

export class EditReviewDTOContainer {

     


    constructor(fb: FormBuilder) {
        console.log("in restaurant con")

    }


    ngOnInit() {
        console.log("init")
        //  let s1:ISubscriptionDefinition = postal.subscribe(

        //   {channel:"test",
        //     topic: "test-topic",
        //     callback: function(data,envelope)
        //     {
        //       console.log("got data "+JSON.stringify(envelope));
        //     }


        //   }


        //  )
        let cc: IChannelDefinition = postal.channel('test-channel');
        let s1: ISubscriptionDefinition = cc.subscribe("*.test-topic", (data, envelope) => {
             console.log("got data in DTO "+JSON.stringify(envelope));
        })

    }







}
