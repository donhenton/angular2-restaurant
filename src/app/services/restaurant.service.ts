import {Http} from '@angular/http';
//import 'rxjs/Rx'; for all
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Restaurant,ReviewDTO,ReviewPayload} from './../model/restaurant.interface';

@Injectable()
export class RestaurantService {

    private   URL_BASE = "http://donhenton-springmvc3.herokuapp.com:80/app/backbone/";
    constructor(private _http: Http)
    {

    }

    getRestaurant(id: string): Observable<Restaurant>
    {
        var url  = this.URL_BASE +"restaurant/" +id;
        return this._http.get(url)
        .map(res => res.json())
    }

    getAllRestaurants(): Observable<Restaurant[]>
    {
        
        return this._http.get(this.URL_BASE +"restaurant/" )
        .map(res => res.json())
    }

    saveResaurant(body:Restaurant)
    {
        
       return this._http.put(this.URL_BASE+"restaurant/" + body.id,body);
    }

    addRestaurant(body:Restaurant)
    {
        delete body.id; //id should not exist, may be submitted from downstream
        return this._http.post(this.URL_BASE +"restaurant/" ,body).map(res => res.json());  //will return {id: 999}, the id of the newly saved restaurant
    }

    deleteRestaurant(body:Restaurant)
    {

        return this._http.delete(this.URL_BASE +"restaurant/" + body.id);

    }

    saveReview(body:ReviewPayload)
    {
         
        return this._http.put(this.URL_BASE +"review/" +body.restaurantId+"/"+body.reviewDTO.id,body);
    }

    deleteReview(body:ReviewPayload)
    {
         
        return this._http.delete(this.URL_BASE +"review/" +body.restaurantId+"/"+body.reviewDTO.id);
    }

    addReview(body:ReviewPayload)
    {
         
        return this._http.post(this.URL_BASE +"review/" +body.restaurantId,body);
    }


}