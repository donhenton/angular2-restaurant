import { Component } from '@angular/core';
import * as postal from "postal";
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';





@Component({
    selector: 'edit-restaurant-container',
    template: ` 
     <section class="editRestaurantContainer">
    <div>edit restaurant</div>
    
    </section>
  `
})

export class EditRestaurantContainer {

    editForm: FormGroup;


    constructor(fb: FormBuilder) {
        console.log("in restaurant con")

        this.editForm = fb.group({
            city: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            state: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            zipCode: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            version: [1, Validators.required],
            id: [-1]




        })






    }


    ngOnInit() {
        console.log("init")
      
        let cc: IChannelDefinition = postal.channel('test-channel');
        let s1: ISubscriptionDefinition = cc.subscribe("*.test-topic", (data, envelope) => {
             console.log("got data in main "+JSON.stringify(envelope));
        })

    }






}
