System.register(["./pubsub.service", "./restaurant.service", "./../model/restaurant.interface", "@angular/core", "./../model/FeedbackMessageImpl", "./../services/pubsub.service"], function (exports_1, context_1) {
    "use strict";
    var __assign = (this && this.__assign) || Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
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
    var pubsub_service_1, restaurant_service_1, restaurant_interface_1, core_1, FeedbackMessageImpl_1, pubsub_service_2, RestaurantActionService;
    return {
        setters: [
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
            },
            function (restaurant_service_1_1) {
                restaurant_service_1 = restaurant_service_1_1;
            },
            function (restaurant_interface_1_1) {
                restaurant_interface_1 = restaurant_interface_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (FeedbackMessageImpl_1_1) {
                FeedbackMessageImpl_1 = FeedbackMessageImpl_1_1;
            },
            function (pubsub_service_2_1) {
                pubsub_service_2 = pubsub_service_2_1;
            }
        ],
        execute: function () {
            RestaurantActionService = (function () {
                function RestaurantActionService(restaurantService, subProvider) {
                    var _this = this;
                    this.restaurantService = restaurantService;
                    this.subProvider = subProvider;
                    this.sub = subProvider.getService();
                    this.sub.getChannel().subscribe(pubsub_service_2.COMMIT_RESTAURANT_WILDCARD_TOPIC, function (data, envelope) {
                        var action = envelope.topic.split(".")[0];
                        // console.log(`got action ${action} in restaurant-action-service`)
                        if (action === "ADD") {
                            _this.handleAdd(data);
                        }
                        if (action === "SAVE") {
                            _this.handleSave(data);
                        }
                        if (action === "DELETE") {
                            _this.handleDelete(data);
                        }
                    });
                    this.sub.getChannel().subscribe(pubsub_service_2.COMMIT_REVIEW_WILDCARD_TOPIC, function (data, envelope) {
                        var action = envelope.topic.split(".")[0];
                        if (action === "SAVE") {
                            _this.handleReviewSave(data);
                        }
                        if (action === "ADD") {
                            _this.handleReviewAdd(data);
                        }
                        if (action === "DELETE") {
                            _this.handleReviewDelete(data);
                        }
                    });
                }
                RestaurantActionService.prototype.sendWait = function (state) {
                    var waitMessage = {};
                    waitMessage.state = state;
                    this.sub.getChannel().publish(pubsub_service_2.WAIT_TOPIC, waitMessage);
                };
                RestaurantActionService.prototype.sendFeedback = function (f) {
                    this.sub.getChannel().publish(pubsub_service_2.FEEDBACK_TOPIC, f);
                };
                RestaurantActionService.prototype.sendRestaurantRefresh = function (refreshRequest) {
                    this.sub.getChannel().publish(pubsub_service_2.REFRESH_RESTAURANT_TOPIC, refreshRequest);
                };
                RestaurantActionService.prototype.handleDelete = function (data) {
                    var _this = this;
                    this.restaurantService.deleteRestaurant(data.selectedRestaurant).subscribe(function () {
                        _this.sendWait(true);
                        var f = new FeedbackMessageImpl_1.default();
                        f.message = "Restaurant Deleted";
                        f.show = true;
                        f.type = restaurant_interface_1.messageType.info;
                        _this.sendFeedback(f);
                        _this.sendRestaurantRefresh({ doRefresh: true, selectedRestaurantId: null });
                        _this.sub.getChannel().publish(pubsub_service_2.DELETE_RESTAURANT_TOPIC, {});
                    }, function (err) { console.log(JSON.stringify(err)); });
                };
                RestaurantActionService.prototype.handleAdd = function (data) {
                    var _this = this;
                    var f = new FeedbackMessageImpl_1.default();
                    f.message = "Restaurant Added";
                    f.show = true;
                    f.type = restaurant_interface_1.messageType.info;
                    this.sendWait(true);
                    this.restaurantService.addRestaurant(data).subscribe(function (idInfo) {
                        _this.sendFeedback(f);
                        _this.sendRestaurantRefresh({ doRefresh: true, selectedRestaurantId: idInfo.id });
                        var newItem = __assign({}, data);
                        newItem.id = idInfo.id;
                        _this.sub.getChannel().publish(pubsub_service_2.EDIT_RESTAURANT_TOPIC, { selectedRestaurant: newItem });
                    }, function (err) { console.log(JSON.stringify(err)); });
                };
                RestaurantActionService.prototype.handleSave = function (data) {
                    var _this = this;
                    var f = new FeedbackMessageImpl_1.default();
                    f.message = "Save completed";
                    f.show = true;
                    f.type = restaurant_interface_1.messageType.info;
                    this.sendWait(true);
                    this.restaurantService.saveResaurant(data).subscribe(function () {
                        _this.sendFeedback(f);
                        _this.sendRestaurantRefresh({ doRefresh: true, selectedRestaurantId: data.id });
                    }, function (err) { console.log(JSON.stringify(err)); });
                };
                ///// reviews /////////////////////////////////////////
                RestaurantActionService.prototype.sendReviewRefresh = function (restaurantId, feedback) {
                    var _this = this;
                    var f = new FeedbackMessageImpl_1.default();
                    f.message = feedback;
                    f.show = true;
                    f.type = restaurant_interface_1.messageType.info;
                    this.restaurantService.getRestaurant(restaurantId + "").subscribe(function (data) {
                        _this.sendFeedback(f);
                        _this.sub.getChannel().publish(pubsub_service_2.REFRESH_REVIEW_TOPIC, { selectedRestaurant: data });
                    }, function (err) {
                        console.log(JSON.stringify(err));
                        _this.sendWait(false);
                    });
                };
                RestaurantActionService.prototype.handleReviewAdd = function (data) {
                    var _this = this;
                    this.sendWait(true);
                    this.restaurantService.addReview(data).subscribe(function () {
                        _this.sendReviewRefresh(data.restaurantId, "Review Added");
                    }, function (err) { console.log(JSON.stringify(err)); });
                };
                RestaurantActionService.prototype.handleReviewDelete = function (data) {
                    var _this = this;
                    this.sendWait(true);
                    this.restaurantService.deleteReview(data).subscribe(function () {
                        _this.sendReviewRefresh(data.restaurantId, "Review Deleted");
                    }, function (err) { console.log(JSON.stringify(err)); });
                };
                RestaurantActionService.prototype.handleReviewSave = function (data) {
                    var _this = this;
                    this.sendWait(true);
                    this.restaurantService.saveReview(data).subscribe(function () {
                        _this.sendReviewRefresh(data.restaurantId, "Review Saved");
                    }, function (err) { console.log(JSON.stringify(err)); });
                };
                return RestaurantActionService;
            }());
            RestaurantActionService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [restaurant_service_1.RestaurantService,
                    pubsub_service_1.default])
            ], RestaurantActionService);
            exports_1("RestaurantActionService", RestaurantActionService);
        }
    };
});

//# sourceMappingURL=restaurant-action.service.js.map
