import PubSubService,{PubSubSystem} from './pubsub.service';
import { RestaurantService } from './restaurant.service';
import { WaitRequest, Restaurant, messageType, RefreshMessage } from './../model/restaurant.interface';
import { Injectable } from '@angular/core';
import FeedbackMessageImpl from './../model/FeedbackMessageImpl';

@Injectable()
export class RestaurantActionService {

/*
    private refreshListSubject: Subject<RefreshMessage>;
    private saveSubscription: Subject<any>;
    private newRestaurantSubscription: Subject<any>;
    private deleteRestaurantSubscription: Subject<any>;
    private waitRequestSubject: Subject<WaitRequest>;
    private feedbackSubject: Subject<any>;
    private editSubject: Subject<any>;
    */
    private sub:PubSubSystem;

    constructor(private restaurantService: RestaurantService,
        private subProvider: PubSubService) {

        this.sub = subProvider.getService();
        var channel = this.sub.getChannel();
        /*
        this.feedbackSubject = channel.subject(this.sub.getMessageTopic());
        this.waitRequestSubject = channel.subject(this.sub.getWaitTopic());
        this.refreshListSubject = channel.subject(this.sub.getRefreshTopic());
        this.editSubject = channel.subject("edit.update." + this.sub.getRestaurantEditTopic());
        this.saveSubscription = channel.observe("save." + this.sub.getRestaurantEditTopic());
        this.newRestaurantSubscription = channel.observe("new." + this.sub.getRestaurantEditTopic());
        this.deleteRestaurantSubscription = channel.observe("delete." + this.sub.getRestaurantEditTopic());

        this.deleteRestaurantSubscription
            .subscribe(
            (data) => {

                this.handleDelete(data);

            },
            (error) => {
                console.log(JSON.stringify(error))
            }

            );

        this.saveSubscription
            .subscribe(
            (data) => {

                this.handleSave(data);

            },
            (error) => {
                console.log(JSON.stringify(error))
            }

            );
        this.newRestaurantSubscription
            .subscribe(
            (data) => {

                this.handleNewRestaurant(data);

            },
            (error) => {
                console.log(JSON.stringify(error))
            }

            );
*/
    }

    handleDelete(data) {
        this.restaurantService.deleteRestaurant(data.selectedRestaurant).subscribe(

            () => {

                var waitMessage = <WaitRequest>{};
                waitMessage.state = true;
             //   this.waitRequestSubject.next(waitMessage);
                let f = new FeedbackMessageImpl();
                f.message = "Restaurant Deleted";
                f.show = true;
                f.type = messageType.info;
               // this.feedbackSubject.next(f);
               // this.refreshListSubject.next({ doRefresh: true, selectedRestaurantId: null })


            },
            err => { console.log(JSON.stringify(err)) }

        )
    }

    handleNewRestaurant(data) {
        let f = new FeedbackMessageImpl();
        f.message = "Restaurant Added";
        f.show = true;
        f.type = messageType.info;
        var waitMessage = <WaitRequest>{};
        waitMessage.state = true;
       // this.waitRequestSubject.next(waitMessage);
        this.restaurantService.addRestaurant(data).subscribe(

            (idInfo) => {
               // this.feedbackSubject.next(f);
               // this.refreshListSubject.next({ doRefresh: true, selectedRestaurantId: idInfo.id })
                let newItem: Restaurant = { ...data };
                newItem.id = idInfo.id;
               // this.editSubject.next({ selectedRestaurant: newItem });

            },
            err => { console.log(JSON.stringify(err)) }

        )
    }


    handleSave(data) {

        console.log("in save " + JSON.stringify(data, null, " "))
        let f = new FeedbackMessageImpl();
        f.message = "Save completed";
        f.show = true;
        f.type = messageType.info;
        var waitMessage = <WaitRequest>{};
        waitMessage.state = true;
       // this.waitRequestSubject.next(waitMessage);
        this.restaurantService.saveResaurant(data).subscribe(

            () => {
               // this.feedbackSubject.next(f);
               // this.refreshListSubject.next({ doRefresh: true, selectedRestaurantId: data.id })
            },
            err => { console.log(JSON.stringify(err)) }

        )



    }

}