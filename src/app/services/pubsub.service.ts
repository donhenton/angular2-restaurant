
 
import {Injectable} from '@angular/core';
import {Restaurant} from './../model/restaurant.interface';
import * as postal from "postal";


let _service:PubSubServiceImpl = null; 


export const RESTAURANT_TOPIC = "restaurant-topic"
export const CRUD_WILDCARD_TOPIC = "*.crud."+ this.RESTAURANT_TOPIC;
export const ADD_RESTAURANT_TOPIC = "add.crud."+ this.RESTAURANT_TOPIC;
export const EDIT_RESTAURANT_TOPIC = "edit.crud."+ this.RESTAURANT_TOPIC;
export const DELETE_RESTAURANT_TOPIC = "edit.crud."+ this.RESTAURANT_TOPIC;
export const WAIT_TOPIC = "wait.topic";


@Injectable()
export default class PubSubService {
 
  
  private service:PubSubServiceImpl
  constructor()
  {
    
    if(_service === null)
    {
        _service = new PubSubServiceImpl();
        
    }
    
  }

  getService():PubSubServiceImpl
  {
      return _service;
  }

}

export interface PubSubSystem
{
    getChannel():IChannelDefinition;
    
   

}


class PubSubServiceImpl implements PubSubSystem {


    private RESTAURANT_CHANNEL:string = "restaurant-channel"
    constructor()
    {
        
          
         
    }


    public getChannel():IChannelDefinition
    {
        return  postal.channel(this.RESTAURANT_CHANNEL);
    }
    


}

 