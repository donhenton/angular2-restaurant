import PubSubService, { PubSubSystem } from './pubsub.service';
import { RestaurantService } from './restaurant.service';
import { WaitRequest, Restaurant, messageType, RefreshMessage } from './../model/restaurant.interface';
import { Injectable } from '@angular/core';
import FeedbackMessageImpl from './../model/FeedbackMessageImpl';
import { DELETE_RESTAURANT_TOPIC,FEEDBACK_TOPIC, REFRESH_TOPIC, EDIT_RESTAURANT_TOPIC,COMMIT_WILDCARD_TOPIC, WAIT_TOPIC, 
    ADD_COMMIT_TOPIC, DELETE_COMMIT_TOPIC, SAVE_COMMIT_TOPIC } from './../services/pubsub.service'


@Injectable()
export class RestaurantActionService {

    
    private sub: PubSubSystem;

    constructor(private restaurantService: RestaurantService,
        private subProvider: PubSubService) {

        this.sub = subProvider.getService();
       
        this.sub.getChannel().subscribe(COMMIT_WILDCARD_TOPIC, (data, envelope: IEnvelope) => {

            let action = envelope.topic.split(".")[0];
           // console.log(`got action ${action} in restaurant-action-service`)
            if (action === "ADD") {
                this.handleAdd(data);
            }
            if (action === "SAVE") {
                this.handleSave(data);
            }
            if (action === "DELETE") {
                this.handleDelete(data);
            }



        });
 
    }

    sendWait(state: boolean) {
        var waitMessage = <WaitRequest>{};
        waitMessage.state = state;
        this.sub.getChannel().publish(WAIT_TOPIC, waitMessage);
    }

    sendFeedback(f: FeedbackMessageImpl) {
        this.sub.getChannel().publish(FEEDBACK_TOPIC, f);
    }

    sendRefresh(refreshRequest)
    {
        this.sub.getChannel().publish(REFRESH_TOPIC, refreshRequest);
    }


    handleDelete(data) {
       
        this.restaurantService.deleteRestaurant(data.selectedRestaurant).subscribe(

            () => {


                this.sendWait(true);

                let f = new FeedbackMessageImpl();
                f.message = "Restaurant Deleted";
                f.show = true;
                f.type = messageType.info;
                this.sendFeedback(f);
                this.sendRefresh({ doRefresh: true, selectedRestaurantId: null });
                this.sub.getChannel().publish(DELETE_RESTAURANT_TOPIC, {});


            },
            err => { console.log(JSON.stringify(err)) }

        )
    }

    handleAdd(data) {
        let f = new FeedbackMessageImpl();
        f.message = "Restaurant Added";
        f.show = true;
        f.type = messageType.info;
        this.sendWait(true);
        this.restaurantService.addRestaurant(data).subscribe(

            (idInfo) => {
                this.sendFeedback(f);
                this.sendRefresh({ doRefresh: true, selectedRestaurantId: idInfo.id })
                let newItem: Restaurant = { ...data };
                newItem.id = idInfo.id;
                this.sub.getChannel().publish(EDIT_RESTAURANT_TOPIC,{ selectedRestaurant: newItem })

            },
            err => { console.log(JSON.stringify(err)) }

        )
    }


    handleSave(data) {

        let f = new FeedbackMessageImpl();
        f.message = "Save completed";
        f.show = true;
        f.type = messageType.info;
        this.sendWait(true)
        this.restaurantService.saveResaurant(data).subscribe(

            () => {
                this.sendFeedback(f);
                this.sendRefresh({ doRefresh: true, selectedRestaurantId: data.id })
            },
            err => { console.log(JSON.stringify(err)) }

        )



    }

}