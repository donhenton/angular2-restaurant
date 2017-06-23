System.register(["@angular/core", "./../services/restaurant.service", "./restaurant-list-row", "./../services/pubsub.service"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, restaurant_service_1, restaurant_list_row_1, pubsub_service_1, pubsub_service_2, RestaurantList;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (restaurant_service_1_1) {
                restaurant_service_1 = restaurant_service_1_1;
            },
            function (restaurant_list_row_1_1) {
                restaurant_list_row_1 = restaurant_list_row_1_1;
            },
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
                pubsub_service_2 = pubsub_service_1_1;
            }
        ],
        execute: function () {
            RestaurantList = (function () {
                function RestaurantList(restaurantService, renderer, subProvider) {
                    var _this = this;
                    this.restaurantService = restaurantService;
                    this.renderer = renderer;
                    this.subProvider = subProvider;
                    this.isLoading = false;
                    this.doRoll = false;
                    this.selectedRowId = -1;
                    this.subscriptions = [];
                    this.sub = subProvider.getService();
                    this.restaurantList = [];
                    this.crudSubscription = this.sub.getChannel().subscribe(pubsub_service_2.CRUD_RESTAURANT_WILDCARD_TOPIC, function (data, envelope) { return _this.handleCrudOperation(data, envelope); });
                    this.refreshSubscription = this.sub.getChannel().subscribe(pubsub_service_2.REFRESH_RESTAURANT_TOPIC, function (data, envelope) { return _this.handleRefresh(data, envelope); });
                    var s1 = this.sub.getChannel().subscribe(pubsub_service_2.REFRESH_REVIEW_TOPIC, function (data, envelope) { return _this.handleReviewRefresh(data.selectedRestaurant, envelope); });
                    this.subscriptions.push(this.crudSubscription);
                    this.subscriptions.push(this.refreshSubscription);
                    this.subscriptions.push(s1);
                }
                RestaurantList.prototype.handleReviewRefresh = function (data, envelope) {
                    var t = this.restaurantList.map(function (res) {
                        if (res.id == data.id) {
                            console.log("refreshing reviews in list");
                            res = __assign({}, data);
                        }
                        return res;
                    });
                    this.restaurantList = t;
                };
                RestaurantList.prototype.handleCrudOperation = function (data, envelope) {
                    //  console.log("in restaurant-list handleCrud " + envelope.topic + " not needed ");
                };
                RestaurantList.prototype.handleRefresh = function (data, envelope) {
                    // console.log("in restaurant-list refresh " + JSON.stringify(envelope));
                    console.log('got refresh message');
                    if (data.selectedRestaurantId) {
                        //if this is an add, roll
                        this.selectedRowId = data.selectedRestaurantId;
                    }
                    this.ngOnInit();
                };
                RestaurantList.prototype.getRowClass = function (rowId) {
                    var classString = "restaurantRow";
                    if (rowId === this.selectedRowId) {
                        classString += " highLighted";
                    }
                    return classString;
                };
                RestaurantList.prototype.ngAfterViewChecked = function () {
                    var _this = this;
                    if (this.rowItems && this.selectedRowId > -1 && this.doRoll) {
                        var activeRow = this.rowItems.filter(function (r) {
                            return r.row.id === _this.selectedRowId;
                        });
                        if (activeRow && activeRow.length == 1) {
                            //console.log("did the scroll")
                            this.renderer.invokeElementMethod(activeRow[0].getDom(), 'scrollIntoView', [{
                                    behavior: "smooth",
                                    block: "start",
                                }]);
                            //console.log("xxx "+activeRow[0].row.name)
                            this.doRoll = false;
                        }
                        else {
                            //console.log("active row not found")
                            this.doRoll = false;
                        }
                    }
                };
                RestaurantList.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) {
                        if (s) {
                            s.unsubscribe();
                            s = null;
                        }
                    });
                };
                RestaurantList.prototype.sendWait = function (state) {
                    var waitMessage = {};
                    waitMessage.state = state;
                    this.sub.getChannel().publish(pubsub_service_2.WAIT_TOPIC, waitMessage);
                };
                RestaurantList.prototype.ngOnInit = function () {
                    var _this = this;
                    this.restaurantService.getAllRestaurants()
                        .subscribe(function (json) {
                        _this.isLoading = false;
                        _this.restaurantList = [];
                        json.forEach(function (j) {
                            _this.restaurantList.push(j);
                        });
                        _this.sendWait(false);
                        if (_this.selectedRowId && _this.selectedRowId > 0) {
                            //you are coming in on an ADD so roll the window
                            _this.doRoll = true;
                            //console.log("doing an add so roll")
                        }
                    }, function (error) {
                        _this.isLoading = false;
                        console.error(error);
                        _this.sendWait(false);
                    });
                };
                RestaurantList.prototype.onEditChangeEvent = function (ev) {
                    var message = null;
                    this.selectedRowId = ev.selectedRestaurant.id;
                    if (ev.type === 'delete') {
                        var confirmMessage = 'Do you want to delete "' + ev.selectedRestaurant.name + '" ?';
                        var confirm = window.confirm(confirmMessage);
                        if (confirm && confirm === true) {
                            this.signalCRUDEvent("DELETE", ev);
                        }
                    }
                    else {
                        this.signalCRUDEvent("EDIT", ev);
                    }
                };
                RestaurantList.prototype.signalCRUDEvent = function (type, payload) {
                    var topic = null;
                    if (type === 'ADD') {
                        topic = pubsub_service_2.ADD_RESTAURANT_TOPIC;
                    }
                    if (type === 'EDIT') {
                        topic = pubsub_service_2.EDIT_RESTAURANT_TOPIC;
                    }
                    if (type === 'DELETE') {
                        topic = pubsub_service_2.DELETE_RESTAURANT_COMMIT_TOPIC;
                    }
                    this.sub.getChannel().publish(topic, payload);
                };
                RestaurantList.prototype.performAdd = function () {
                    var emptyRestaurant = {};
                    emptyRestaurant.id = -1;
                    emptyRestaurant.version = 1;
                    emptyRestaurant.name = "";
                    emptyRestaurant.city = "";
                    emptyRestaurant.state = "";
                    emptyRestaurant.zipCode = "";
                    this.signalCRUDEvent("ADD", { selectedRestaurant: emptyRestaurant });
                };
                return RestaurantList;
            }());
            __decorate([
                core_1.ViewChildren(restaurant_list_row_1.RestaurantListRow),
                __metadata("design:type", Array)
            ], RestaurantList.prototype, "rowItems", void 0);
            RestaurantList = __decorate([
                core_1.Component({
                    selector: 'restaurant-list',
                    template: "\n   \n   \n<div class=\"restaurantListContainer\">\n<button (click)=\"performAdd($event)\" class=\"editButton addButton\" >Add Record</button>\n    <div id=\"restaurantScrollList\">\n        <div id=\"tHeadContainer\" data-reactid=\".0.1.1.0\">\n            <table>\n                <tbody>\n                    <tr>\n                        <th class=\"nameItem\">Name</th>\n                        <th class=\"cityItem\">City</th>\n                        <th class=\"stateItem\">State</th>\n                        <th class=\"zipCodeItem\">Zip Code</th>\n                        <th class=\"versionItem\">Version</th>\n                        <th class=\"actionItems\">&nbsp;</th>\n                        <th class=\"actionItems\">&nbsp;</th>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <div id=\"tbodyContainer\">\n            <table>\n                <tbody>\n                  <tr  [attr.data-id]=\"row.id\" [ngClass]=\"getRowClass(row.id)\" *ngFor=\"let row of this.restaurantList\">\n                  <restaurant-list-row [row]=\"row\"   (edit-event)=\"onEditChangeEvent($event)\" ></restaurant-list-row>\n                  </tr>\n                </tbody>\n            </table>\n\n        </div>\n\n\n\n    </div>\n</div>\n  \n  "
                }),
                __param(1, core_1.Inject(core_1.Renderer)),
                __metadata("design:paramtypes", [restaurant_service_1.RestaurantService, core_1.Renderer,
                    pubsub_service_1.default])
            ], RestaurantList);
            exports_1("RestaurantList", RestaurantList);
        }
    };
});

//# sourceMappingURL=restaurant-list.js.map
