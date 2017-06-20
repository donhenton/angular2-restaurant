import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RestaurantComponent} from "./components/restaurant-component";
import {EditRestaurantContainer} from './components/edit-restaurant-container';
import {EditReviewDTOContainer} from './components/edit-reviewDTO-container';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


@NgModule({
    imports: [
         BrowserModule,FormsModule,ReactiveFormsModule,HttpModule
    ],
    declarations: [
        RestaurantComponent,EditRestaurantContainer,EditReviewDTOContainer
    ],
    providers: [],
    bootstrap: [RestaurantComponent]
})
export class AppModule {
}