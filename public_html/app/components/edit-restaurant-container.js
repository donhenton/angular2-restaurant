System.register(["@angular/core", "./../services/restaurant.service", "./../services/pubsub.service", "@angular/forms"], function (exports_1, context_1) {
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
    var core_1, restaurant_service_1, pubsub_service_1, forms_1, pubsub_service_2, EditRestaurantContainer;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (restaurant_service_1_1) {
                restaurant_service_1 = restaurant_service_1_1;
            },
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
                pubsub_service_2 = pubsub_service_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            }
        ],
        execute: function () {
            //http://blog.ng-book.com/the-ultimate-guide-to-forms-in-angular-2/
            EditRestaurantContainer = (function () {
                function EditRestaurantContainer(restaurantService, subProvider, fb) {
                    var _this = this;
                    this.restaurantService = restaurantService;
                    this.subProvider = subProvider;
                    this.backUp = null;
                    this.actionState = null;
                    //  console.log("in restaurant con")
                    this.sub = subProvider.getService();
                    this.editForm = fb.group({
                        city: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])],
                        state: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])],
                        zipCode: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
                        name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])],
                        version: [1, forms_1.Validators.required],
                        id: [-1]
                    });
                    this.crudRequestSubscription = this.sub.getChannel().subscribe(pubsub_service_2.CRUD_RESTAURANT_WILDCARD_TOPIC, function (data, envelope) { return _this.handleCrudOperation(data, envelope); });
                }
                EditRestaurantContainer.prototype.handleCrudOperation = function (data, envelope) {
                    var action = envelope.topic.split('.')[0];
                    // console.log("in edit-restaurant handleCrud " + action);
                    if (action === "DELETE") {
                        this.backUp = null;
                        this.editForm.reset();
                        return;
                    }
                    this.backUp = __assign({}, data.selectedRestaurant);
                    delete this.backUp.reviewDTOs;
                    this.editForm.reset();
                    this.editForm.setValue(this.backUp);
                    this.actionState = action;
                };
                EditRestaurantContainer.prototype.ngOnDestroy = function () {
                    if (this.crudRequestSubscription) {
                        this.crudRequestSubscription.unsubscribe();
                        this.crudRequestSubscription = null;
                    }
                };
                EditRestaurantContainer.prototype.log = function () {
                    // console.log(this.editForm.value);
                    console.log(" errors " + JSON.stringify(this.editForm.controls.city.errors) + " min  " + this.editForm.controls.city.errors.minlength);
                };
                EditRestaurantContainer.prototype.formOkay = function () {
                    return this.editForm.valid && !this.equalToBackup();
                };
                /**
                 * return true if you are equal to the backup
                 * false if not
                 */
                EditRestaurantContainer.prototype.equalToBackup = function () {
                    if (!this.backUp) {
                        return true;
                    }
                    var akeys = Object.keys(this.backUp);
                    var bkeys = Object.keys(this.editForm.value);
                    var len = akeys.length;
                    if (len != bkeys.length)
                        return false;
                    for (var i = 0; i < len; i++) {
                        if (this.backUp[akeys[i]] !== this.editForm.value[akeys[i]])
                            return false;
                    }
                    return true;
                };
                EditRestaurantContainer.prototype.saveAction = function (ev) {
                    if (this.formOkay()) {
                        var dataToSend = this.editForm.value;
                        this.backUp = this.editForm.value;
                        this.editForm.reset();
                        this.editForm.setValue(this.backUp);
                        if (this.actionState == "ADD") {
                            this.sub.getChannel().publish(pubsub_service_2.ADD_RESTAURANT_COMMIT_TOPIC, dataToSend);
                        }
                        else {
                            this.sub.getChannel().publish(pubsub_service_2.SAVE_RESTAURANT_COMMIT_TOPIC, dataToSend);
                        }
                    }
                };
                EditRestaurantContainer.prototype.cancelAction = function () {
                    this.editForm.reset();
                    this.editForm.setValue(this.backUp);
                };
                return EditRestaurantContainer;
            }());
            EditRestaurantContainer = __decorate([
                core_1.Component({
                    selector: 'edit-restaurant-container',
                    template: "\n  <section [hidden]=\"backUp === null\" class=\"editRestaurantContainer\">\n<form id=\"editForm\" [formGroup]=\"editForm\">\n<input type=\"hidden\" formControlName=\"id\" >\n<table class=\"editTable\">\n<tbody>\n<tr>\n<th>Name: </th>\n<td>\n<input type=\"text\" formControlName=\"name\" class=\"inputName\" value=\"\" >\n</td>\n<th>City: </th>\n<td>\n<input   type=\"text\" formControlName=\"city\" class=\"inputCity\" value=\"\">\n</td>\n</tr>\n<tr><th>State: </th>\n<td><input type=\"text\" formControlName=\"state\" class=\"inputState\" value=\"\" ></td>\n<th>ZipCode:</th>\n<td>\n<input type=\"text\" formControlName=\"zipCode\" class=\"inputZipCode\" value=\"\"></td>\n</tr>\n<tr>\n<th>Version:</th>\n<td>\n<select formControlName=\"version\">\n<option value=\"1\">1</option>\n<option selected=\"\" value=\"2\">2</option>\n<option value=\"3\">3</option>\n</select>\n</td>\n\n</tr>\n<tr>\n<td><button (click)=\"cancelAction($event)\"   class=\"warnButton\">Cancel</button></td>\n<td><button (click)=\"saveAction($event)\" [class.inactive] = \"!this.editForm.valid || this.equalToBackup()\"   class=\"editButton\">Save</button></td>\n<td colspan='2'>\n \n  <div *ngIf=\"!editForm.valid && !editForm.pristine\">\n  \n<div *ngIf=\"!editForm.valid\">\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.name.errors && editForm.controls.name.errors.minlength\">The name must be {{editForm.controls.name.errors.minlength.requiredLength}} chars long</div>\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.city.errors && editForm.controls.city.errors.minlength\">The city must be {{editForm.controls.city.errors.minlength.requiredLength}} chars long</div>\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.state.errors && editForm.controls.state.errors.minlength\">The state must be {{editForm.controls.state.errors.minlength.requiredLength}} chars long</div>\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.zipCode.errors && editForm.controls.zipCode.errors.minlength\">The zipCode must be {{editForm.controls.zipCode.errors.minlength.requiredLength}} chars long</div>\n\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.name.errors && editForm.controls.name.errors.required\">The name is required</div>\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.city.errors && editForm.controls.city.errors.required\">The city is required</div>\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.state.errors && editForm.controls.state.errors.required\">The state is required</div>\n        <div class=\"red-color errorInfo\" *ngIf=\"editForm.controls.zipCode.errors && editForm.controls.zipCode.errors.required\">The zipCode is required</div>\n\n\n\n</div>\n\n\n\n  \n  </div>\n</td>\n</tr>\n</tbody>\n</table>\n</form>\n</section>\n \n  \n  "
                })
                //http://blog.ng-book.com/the-ultimate-guide-to-forms-in-angular-2/
                ,
                __metadata("design:paramtypes", [restaurant_service_1.RestaurantService,
                    pubsub_service_1.default, forms_1.FormBuilder])
            ], EditRestaurantContainer);
            exports_1("EditRestaurantContainer", EditRestaurantContainer);
        }
    };
});

//# sourceMappingURL=edit-restaurant-container.js.map
