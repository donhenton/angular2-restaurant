System.register(["@angular/core", "postal"], function (exports_1, context_1) {
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
    var core_1, postal, _service, RESTAURANT_TOPIC, CRUD_RESTAURANT_WILDCARD_TOPIC, ADD_RESTAURANT_TOPIC, EDIT_RESTAURANT_TOPIC, DELETE_RESTAURANT_TOPIC, COMMIT_RESTAURANT_WILDCARD_TOPIC, ADD_RESTAURANT_COMMIT_TOPIC, SAVE_RESTAURANT_COMMIT_TOPIC, DELETE_RESTAURANT_COMMIT_TOPIC, REVIEW_TOPIC, COMMIT_REVIEW_WILDCARD_TOPIC, ADD_REVIEW_COMMIT_TOPIC, SAVE_REVIEW_COMMIT_TOPIC, DELETE_REVIEW_COMMIT_TOPIC, REFRESH_REVIEW_TOPIC, FEEDBACK_TOPIC, WAIT_TOPIC, REFRESH_RESTAURANT_TOPIC, PubSubService, PubSubServiceImpl;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (postal_1) {
                postal = postal_1;
            }
        ],
        execute: function () {
            _service = null;
            exports_1("RESTAURANT_TOPIC", RESTAURANT_TOPIC = "restaurant-topic");
            exports_1("CRUD_RESTAURANT_WILDCARD_TOPIC", CRUD_RESTAURANT_WILDCARD_TOPIC = "*.crud." + RESTAURANT_TOPIC);
            exports_1("ADD_RESTAURANT_TOPIC", ADD_RESTAURANT_TOPIC = "ADD.crud." + RESTAURANT_TOPIC);
            exports_1("EDIT_RESTAURANT_TOPIC", EDIT_RESTAURANT_TOPIC = "EDIT.crud." + RESTAURANT_TOPIC);
            exports_1("DELETE_RESTAURANT_TOPIC", DELETE_RESTAURANT_TOPIC = "DELETE.crud." + RESTAURANT_TOPIC);
            exports_1("COMMIT_RESTAURANT_WILDCARD_TOPIC", COMMIT_RESTAURANT_WILDCARD_TOPIC = '*.commit.topic.' + RESTAURANT_TOPIC);
            exports_1("ADD_RESTAURANT_COMMIT_TOPIC", ADD_RESTAURANT_COMMIT_TOPIC = 'ADD.commit.topic.' + RESTAURANT_TOPIC);
            exports_1("SAVE_RESTAURANT_COMMIT_TOPIC", SAVE_RESTAURANT_COMMIT_TOPIC = 'SAVE.commit.topic.' + RESTAURANT_TOPIC);
            exports_1("DELETE_RESTAURANT_COMMIT_TOPIC", DELETE_RESTAURANT_COMMIT_TOPIC = 'DELETE.commit.topic.' + RESTAURANT_TOPIC);
            exports_1("REVIEW_TOPIC", REVIEW_TOPIC = "review-topic");
            exports_1("COMMIT_REVIEW_WILDCARD_TOPIC", COMMIT_REVIEW_WILDCARD_TOPIC = '*.commit.topic.' + REVIEW_TOPIC);
            exports_1("ADD_REVIEW_COMMIT_TOPIC", ADD_REVIEW_COMMIT_TOPIC = 'ADD.commit.topic.' + REVIEW_TOPIC);
            exports_1("SAVE_REVIEW_COMMIT_TOPIC", SAVE_REVIEW_COMMIT_TOPIC = 'SAVE.commit.topic.' + REVIEW_TOPIC);
            exports_1("DELETE_REVIEW_COMMIT_TOPIC", DELETE_REVIEW_COMMIT_TOPIC = 'DELETE.commit.topic.' + REVIEW_TOPIC);
            exports_1("REFRESH_REVIEW_TOPIC", REFRESH_REVIEW_TOPIC = "refresh.review.topic");
            exports_1("FEEDBACK_TOPIC", FEEDBACK_TOPIC = 'feedback.topic');
            exports_1("WAIT_TOPIC", WAIT_TOPIC = "wait.topic");
            exports_1("REFRESH_RESTAURANT_TOPIC", REFRESH_RESTAURANT_TOPIC = "refresh.restaurant.topic");
            PubSubService = (function () {
                function PubSubService() {
                    if (_service === null) {
                        _service = new PubSubServiceImpl();
                    }
                }
                PubSubService.prototype.getService = function () {
                    return _service;
                };
                return PubSubService;
            }());
            PubSubService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [])
            ], PubSubService);
            exports_1("default", PubSubService);
            PubSubServiceImpl = (function () {
                function PubSubServiceImpl() {
                    this.RESTAURANT_CHANNEL = "restaurant-channel";
                }
                PubSubServiceImpl.prototype.getChannel = function () {
                    return postal.channel(this.RESTAURANT_CHANNEL);
                };
                return PubSubServiceImpl;
            }());
        }
    };
});

//# sourceMappingURL=pubsub.service.js.map
