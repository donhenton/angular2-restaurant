System.register(["@angular/core", "@angular/platform-browser", "./components/restaurant-component", "./components/edit-restaurant-container", "./components/edit-reviewDTO-container", "@angular/forms", "@angular/http", "./services/restaurant.service", "./services/restaurant-action.service", "./services/pubsub.service", "./components/restaurant-list", "./components/wait-indicator", "./components/restaurant-list-row", "./components/review-list-row", "./pipes/append-pipe"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, restaurant_component_1, edit_restaurant_container_1, edit_reviewDTO_container_1, forms_1, http_1, restaurant_service_1, restaurant_action_service_1, pubsub_service_1, restaurant_list_1, wait_indicator_1, restaurant_list_row_1, review_list_row_1, append_pipe_1, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (restaurant_component_1_1) {
                restaurant_component_1 = restaurant_component_1_1;
            },
            function (edit_restaurant_container_1_1) {
                edit_restaurant_container_1 = edit_restaurant_container_1_1;
            },
            function (edit_reviewDTO_container_1_1) {
                edit_reviewDTO_container_1 = edit_reviewDTO_container_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (restaurant_service_1_1) {
                restaurant_service_1 = restaurant_service_1_1;
            },
            function (restaurant_action_service_1_1) {
                restaurant_action_service_1 = restaurant_action_service_1_1;
            },
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
            },
            function (restaurant_list_1_1) {
                restaurant_list_1 = restaurant_list_1_1;
            },
            function (wait_indicator_1_1) {
                wait_indicator_1 = wait_indicator_1_1;
            },
            function (restaurant_list_row_1_1) {
                restaurant_list_row_1 = restaurant_list_row_1_1;
            },
            function (review_list_row_1_1) {
                review_list_row_1 = review_list_row_1_1;
            },
            function (append_pipe_1_1) {
                append_pipe_1 = append_pipe_1_1;
            }
        ],
        execute: function () {
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [
                        platform_browser_1.BrowserModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, http_1.HttpModule
                    ],
                    declarations: [restaurant_component_1.RestaurantComponent, restaurant_list_1.RestaurantList, wait_indicator_1.WaitIndicator, edit_reviewDTO_container_1.EditReviewDTOContainer,
                        edit_restaurant_container_1.EditRestaurantContainer, restaurant_list_row_1.RestaurantListRow, review_list_row_1.ReviewListRow, append_pipe_1.AppendPipe],
                    providers: [restaurant_service_1.RestaurantService, pubsub_service_1.default, restaurant_action_service_1.RestaurantActionService],
                    bootstrap: [restaurant_component_1.RestaurantComponent]
                })
            ], AppModule);
            exports_1("AppModule", AppModule);
        }
    };
});

//# sourceMappingURL=app.module.js.map
