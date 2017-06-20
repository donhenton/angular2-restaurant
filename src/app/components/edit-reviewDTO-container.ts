import { Component } from '@angular/core';

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









}
