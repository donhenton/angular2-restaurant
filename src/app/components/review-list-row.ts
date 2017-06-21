import { Restaurant, ReviewDTO } from './../model/restaurant.interface';
import { Component, Input, EventEmitter, Output,ElementRef ,Inject } from '@angular/core';


@Component({
  selector: 'review-list-row',
  template: `
                     
                    <td class="rating"><span>{{review.starRating}}</span><i class="fa fa-star-o" aria-hidden="true"></i></td>
                    <td class="listing"><span>{{review.reviewListing}}</span>{{showMatch()}}</td>
                    <td class="actionButton">
                        <span>
                            <button  (click)="onClick($event,'EDIT')" class='btnEdit'>Edit</button> 
                        </span> 
                    </td> 
                    <td class="actionButton">
                        <span>
                            <button (click)="onClick($event,'DELETE')" class='btnDelete'>Delete</button>
                        </span>
                        
                    </td> 
  `
})
export class ReviewListRow { 



    @Input() review:ReviewDTO;
    @Input() idx:number;
    @Input() currentReview:ReviewDTO; //selected by the container if none, then this is null;

    @Output('edit-event') editChange = new EventEmitter();
    private domNode: HTMLElement = null;
    private its_me:string;

    constructor(@Inject(ElementRef) elementRef: ElementRef)
    {
       this.domNode = elementRef.nativeElement;

    }
    ngAfterViewInit()
    {
         //this.reportDom.emit({"dom": this.domNode});
        
    }

    showMatch():boolean
    {
        let hit:boolean = false;
        if (this.currentReview && this.currentReview.id === this.review.id)
        {
           hit = true;
        }

        return hit;
    }

    public getDom()
    {
      return this.domNode;
    }


     onClick(ev,type)
    {
          this.editChange.emit({"type": type,"selectedReview": this.review, idx: this.idx});
    }

 
}