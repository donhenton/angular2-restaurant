System.register(["@angular/core", "@angular/forms", "./../services/pubsub.service"], function (exports_1, context_1) {
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
    var core_1, forms_1, pubsub_service_1, pubsub_service_2, EditReviewDTOContainer;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
                pubsub_service_2 = pubsub_service_1_1;
            }
        ],
        execute: function () {
            EditReviewDTOContainer = (function () {
                function EditReviewDTOContainer(fb, subProvider) {
                    var _this = this;
                    this.subProvider = subProvider;
                    this.subscriptions = [];
                    this.backUp = null;
                    this.reviewBackup = null;
                    this.validationMessage = "";
                    // console.log("in DTO con")
                    this.sub = subProvider.getService();
                    var s1 = this.sub.getChannel().subscribe(pubsub_service_2.CRUD_RESTAURANT_WILDCARD_TOPIC, function (data, envelope) { return _this.handleCrudOperation(data.selectedRestaurant, envelope); });
                    var s2 = this.sub.getChannel().subscribe(pubsub_service_2.REFRESH_REVIEW_TOPIC, function (data, envelope) { return _this.handleRefresh(data.selectedRestaurant, envelope); });
                    this.subscriptions.push(s1);
                    this.subscriptions.push(s2);
                }
                EditReviewDTOContainer.prototype.sendWait = function (state) {
                    var waitMessage = {};
                    waitMessage.state = state;
                    this.sub.getChannel().publish(pubsub_service_2.WAIT_TOPIC, waitMessage);
                };
                EditReviewDTOContainer.prototype.handleRefresh = function (data, envelope) {
                    this.backUp = __assign({}, data);
                    this.reviewList = this.backUp.reviewDTOs;
                    this.reviewBackup = null;
                    this.sendWait(false);
                    this.validationMessage = "";
                };
                EditReviewDTOContainer.prototype.dimThisRow = function (currentReview) {
                    if (this.reviewBackup && currentReview) {
                        if (this.reviewBackup.id === currentReview.id) {
                            return false;
                        }
                        else {
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                };
                EditReviewDTOContainer.prototype.handleCrudOperation = function (data, envelope) {
                    var action = envelope.topic.split('.')[0];
                    //console.log("receiving crud " + JSON.stringify(envelope))
                    if (action === "EDIT") {
                        // console.log("data " + JSON.stringify(data.reviewDTOs))
                        this.backUp = __assign({}, data);
                        this.reviewList = this.backUp.reviewDTOs;
                        this.reviewBackup = null;
                    }
                    if (action === "DELETE") {
                        // console.log("data " + JSON.stringify(data.reviewDTOs))
                        this.backUp = null;
                        this.reviewList = null;
                        this.reviewBackup = null;
                    }
                };
                EditReviewDTOContainer.prototype.ngOnDestroy = function () {
                    this.subscriptions.forEach(function (s) {
                        if (s) {
                            s.unsubscribe();
                            s = null;
                        }
                    });
                };
                EditReviewDTOContainer.prototype.ngOnInit = function () {
                    console.log("init");
                };
                EditReviewDTOContainer.prototype.addReview = function () {
                    var newReview = {};
                    newReview.id = -1;
                    newReview.reviewListing = "";
                    newReview.stampDate = null;
                    newReview.starRating = 1;
                    this.reviewList = [newReview].concat(this.reviewList);
                    this.reviewBackup = this.reviewList[0];
                    return;
                };
                EditReviewDTOContainer.prototype.onEditChangeEvent = function (ev) {
                    if (ev.type == "FORM_VALIDATION") {
                        // console.log(`validation message ${ev.invalid} ${ev.message}`)
                        if (ev.invalid) {
                            this.validationMessage = ev.message;
                        }
                        else {
                            this.validationMessage = "";
                        }
                    }
                    if (ev.type == "ADD") {
                        var payload = {};
                        payload.restaurantId = this.backUp.id;
                        payload.reviewDTO = ev.selectedReview;
                        this.sub.getChannel().publish(pubsub_service_2.ADD_REVIEW_COMMIT_TOPIC, payload);
                        return;
                    }
                    if (ev.type == "DELETE") {
                        var sure = window.confirm("Are you sure you want to delete the current review?");
                        if (sure) {
                            var payload = {};
                            payload.restaurantId = this.backUp.id;
                            payload.reviewDTO = ev.selectedReview;
                            this.sub.getChannel().publish(pubsub_service_2.DELETE_REVIEW_COMMIT_TOPIC, payload);
                        }
                        return;
                    }
                    if (this.reviewBackup && this.reviewBackup.id !== ev.selectedReview.id) {
                        return;
                    } //events from buttons not on the current review are ignored
                    //console.log("review container " + JSON.stringify(ev));
                    this.reviewBackup = __assign({}, ev.selectedReview);
                    if (ev.type == "CANCEL") {
                        this.reviewBackup = null;
                        var t = {};
                        t.topic = pubsub_service_2.EDIT_RESTAURANT_TOPIC;
                        this.validationMessage = "";
                        this.handleCrudOperation(this.backUp, t);
                        return;
                    }
                    if (ev.type === 'SAVE') {
                        //console.log("the review listing is "+ev.selectedReview.reviewListing)
                        var payload = {};
                        payload.restaurantId = this.backUp.id;
                        payload.reviewDTO = ev.selectedReview;
                        this.sub.getChannel().publish(pubsub_service_2.SAVE_REVIEW_COMMIT_TOPIC, payload);
                    }
                };
                return EditReviewDTOContainer;
            }());
            EditReviewDTOContainer = __decorate([
                core_1.Component({
                    selector: 'edit-reviewDTO-container',
                    template: " \n     \n     <section [hidden]=\"backUp === null\" class=\"editReviewContainer\">\n            <span class=\"editHeader\">Reviews</span>\n            <span class=review-validation-message>{{validationMessage}}</span>\n            <button (click)=\"addReview()\" class=\"editButton addButton\">Add Review</button>\n    \n    \n    \n            <div id=\"reviewTableHeaderContainer\">\n                \n                 <span class=\"header rating\">Stars</span><span class=\"header listing\">Review</span><span class=\"header actionArea\">&nbsp;</span>\n                 \n            </div>\n    \n    \n    \n              \n              <div id=\"reviewTableBodyContainer\">\n              <table>\n              <tbody>\n\n               <tr [ngClass]=\"{dimmed: dimThisRow(review)}\" [attr.data-id]=\"review.id\"   *ngFor=\"let review of this.reviewList; let indexVal = index\">\n                  <review-list-row [idx]=\"indexVal\" [currentReview]=\"reviewBackup\" (edit-event)=\"onEditChangeEvent($event)\"   [review]=\"review\"></review-list-row>\n                  </tr>\n\n              </tbody>\n              </table>\n              </div>\n    </section>          \n    \n  "
                }),
                __metadata("design:paramtypes", [forms_1.FormBuilder, pubsub_service_1.default])
            ], EditReviewDTOContainer);
            exports_1("EditReviewDTOContainer", EditReviewDTOContainer);
        }
    };
});

//# sourceMappingURL=edit-reviewDTO-container.js.map
