System.register(["@angular/core", "./../services/restaurant-action.service", "./../services/pubsub.service", "./../model/restaurant.interface"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, restaurant_action_service_1, pubsub_service_1, restaurant_interface_1, pubsub_service_2, RestaurantComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (restaurant_action_service_1_1) {
                restaurant_action_service_1 = restaurant_action_service_1_1;
            },
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
                pubsub_service_2 = pubsub_service_1_1;
            },
            function (restaurant_interface_1_1) {
                restaurant_interface_1 = restaurant_interface_1_1;
            }
        ],
        execute: function () {
            RestaurantComponent = (function () {
                function RestaurantComponent(subProvider, actionProvider) {
                    var _this = this;
                    this.subProvider = subProvider;
                    this.actionProvider = actionProvider;
                    this.subscriptions = [];
                    this.displayMessage = {};
                    this.displayMessage.message = "";
                    this.displayMessage.type = restaurant_interface_1.messageType.info;
                    this.displayMessage.show = false;
                    this.sub = subProvider.getService();
                    var s1 = this.sub.getChannel().subscribe(pubsub_service_2.FEEDBACK_TOPIC, function (data, envelope) { return _this.handleFeedback(data, envelope); });
                }
                RestaurantComponent.prototype.ngOnInit = function () {
                };
                RestaurantComponent.prototype.getMessageClass = function (type) {
                    if (type == restaurant_interface_1.messageType.info) {
                        return "info";
                    }
                    if (type == restaurant_interface_1.messageType.error) {
                        return "error";
                    }
                    return "unknown";
                };
                RestaurantComponent.prototype.handleFeedback = function (data, evelope) {
                    this.displayMessage = data;
                };
                return RestaurantComponent;
            }());
            RestaurantComponent = __decorate([
                core_1.Component({
                    selector: 'restaurant-component',
                    styles: [" \n\n     .restaurantApp   #mainDisplayMessage { \n       font-size: 20px;  \n       margin: 20px;\n       border: thin solid #ddd;\n       height: 40px;\n       padding: 5px;\n      }\n\n    .restaurantApp   #mainDisplayMessage.info {\n      color: blue; }\n    .restaurantApp   #mainDisplayMessage.error {\n      color: red; }\n\n\n\n  "],
                    template: "\n  \n  <h3>Restaurant List</h3>\n    <div id=\"reactRestaurantContainer\">\n        <div class=\"restaurantApp grouping\">\n            <wait-indicator [isProcessing]=\"true\"></wait-indicator>\n            <div [ngClass]=\"getMessageClass(displayMessage.type)\"  \n            id=\"mainDisplayMessage\">\n                <span *ngIf=\"displayMessage.show\">{{displayMessage.message |appendPipe |uppercase }}</span>\n               \n            </div>\n            <restaurant-list></restaurant-list>\n            <div id=\"editControlGroup\" class=\"grouping\">\n                    <edit-restaurant-container></edit-restaurant-container>\n                    <edit-reviewDTO-container></edit-reviewDTO-container>\n            </div>\n\n             \n        \n\n        </div>\n\n\n      \n    </div>\n \n  \n  "
                }),
                __metadata("design:paramtypes", [pubsub_service_1.default, restaurant_action_service_1.RestaurantActionService])
            ], RestaurantComponent);
            exports_1("RestaurantComponent", RestaurantComponent);
        }
    };
});

//# sourceMappingURL=restaurant-component.js.map
