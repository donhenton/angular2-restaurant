System.register(["@angular/core", "@angular/forms", "rxjs/Rx", "./../validators/input-validators"], function (exports_1, context_1) {
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
    var core_1, forms_1, input_validators_1, ReviewListRow;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (_1) {
            },
            function (input_validators_1_1) {
                input_validators_1 = input_validators_1_1;
            }
        ],
        execute: function () {
            ReviewListRow = (function () {
                function ReviewListRow(elementRef, fb) {
                    this.editChange = new core_1.EventEmitter();
                    this.domNode = null;
                    this.reviewBackup = null;
                    this.sentInvalid = false;
                    this.domNode = elementRef.nativeElement;
                    this.reviewForm = fb.group({
                        reviewListing: ['', forms_1.Validators.compose([
                                forms_1.Validators.required,
                                input_validators_1.InputValidators.cannotBeEmpty
                            ])],
                        stampDate: [new Date()],
                        id: [-1],
                        starRating: [1, forms_1.Validators.required]
                    });
                }
                ReviewListRow.prototype.ngAfterViewInit = function () {
                    //this.reportDom.emit({"dom": this.domNode});
                };
                ReviewListRow.prototype.ngOnInit = function () {
                    this.reviewForm.setValue(this.review);
                    this.reviewBackup = __assign({}, this.review);
                    this.reviewForm.controls.reviewListing.valueChanges
                        .debounceTime(200)
                        .subscribe(this.onListingChange.bind(this));
                };
                ReviewListRow.prototype.onListingChange = function (ev) {
                    if (this.reviewForm.invalid && !this.sentInvalid) {
                        //formObject.controls.username.errors
                        var message = "Review Listing " + this.reviewForm.controls['reviewListing'].errors.message;
                        this.editChange.emit({ "type": "FORM_VALIDATION", "selectedReview": this.review, idx: this.idx, invalid: this.reviewForm.invalid, message: message });
                        this.sentInvalid = true;
                    }
                    if (!this.reviewForm.invalid && this.sentInvalid) {
                        this.sentInvalid = false;
                        this.editChange.emit({ "type": "FORM_VALIDATION", "selectedReview": this.review, idx: this.idx, invalid: this.reviewForm.invalid, message: "" });
                    }
                };
                ReviewListRow.prototype.matchCurrent = function () {
                    var hit = false;
                    if (this.currentReview && this.currentReview.id === this.review.id) {
                        hit = true;
                    }
                    return hit;
                };
                ReviewListRow.prototype.getDom = function () {
                    return this.domNode;
                };
                ReviewListRow.prototype.onClick = function (ev, type) {
                    if (type === "CANCEL") {
                        this.reviewForm.setValue(this.reviewBackup);
                        this.editChange.emit({ "type": type, "selectedReview": this.review, idx: this.idx });
                    }
                    if (type === "DELETE") {
                        this.editChange.emit({ "type": type, "selectedReview": this.review, idx: this.idx });
                    }
                    if (type == "EDIT") {
                        this.editChange.emit({ "type": type, "selectedReview": this.review, idx: this.idx });
                    }
                    if (type == "SAVE") {
                        if (this.reviewForm.valid) {
                            if (this.review.id > -1) {
                                this.editChange.emit({ "type": type, "selectedReview": this.reviewForm.value, idx: this.idx });
                            }
                            else {
                                this.editChange.emit({ "type": "ADD", "selectedReview": this.reviewForm.value, idx: this.idx });
                            }
                        }
                    }
                };
                return ReviewListRow;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], ReviewListRow.prototype, "review", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Number)
            ], ReviewListRow.prototype, "idx", void 0);
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], ReviewListRow.prototype, "currentReview", void 0);
            __decorate([
                core_1.Output('edit-event'),
                __metadata("design:type", Object)
            ], ReviewListRow.prototype, "editChange", void 0);
            ReviewListRow = __decorate([
                core_1.Component({
                    selector: 'review-list-row',
                    template: "\n                    <form [formGroup]=\"reviewForm\">\n                    \n                    <td class=\"rating\">\n                            <input type=\"hidden\" formControlName=\"stampDate\">\n                            <span  *ngIf=\"!matchCurrent()\">{{review.starRating}}</span>\n                    \n                            <select  *ngIf=\"matchCurrent()\"  id=\"starRating\" formControlName=\"starRating\">\n                                    <option value=\"1\">1</option>\n                                    <option value=\"2\">2</option>\n                                    <option value=\"3\">3</option>\n                                    <option value=\"4\">4</option>\n                                    <option value=\"5\">5</option>\n                                    <option value=\"6\">6</option>\n                                    <option value=\"7\">7</option>\n                                    <option value=\"8\">8</option>\n                                    <option value=\"9\">9</option>\n                                    <option value=\"10\">10</option>\n                                    <option value=\"11\">11</option>\n                                    <option value=\"12\">12</option>\n                                    <option value=\"13\">13</option>\n                                    <option value=\"14\">14</option>\n                                    \n                            </select> \n                     <i class=\"fa fa-star-o\" aria-hidden=\"true\"></i>\n                    </td>\n                    <td class=\"listing\">\n                        <span *ngIf=\"!matchCurrent()\">{{review.reviewListing}}</span>\n                         <input  *ngIf=\"matchCurrent()\" formControlName=\"reviewListing\"   name=\"reviewListing\" id=\"reviewListing\" type=\"text\" /> \n                    </td>\n                    <td class=\"actionButton\">\n                         \n                            <button *ngIf=\"!matchCurrent()\"  (click)=\"onClick($event,'EDIT')\" class='btnEdit'>Edit</button>    \n                            <button *ngIf=\"matchCurrent()\"  [ngClass]=\"{inactive:this.reviewForm.invalid}\"     (click)=\"onClick($event,'SAVE')\" class='btnEdit'>Save</button> \n                       \n                    </td> \n                    \n                    <td class=\"actionButton\">\n                       \n                            <button *ngIf=\"!matchCurrent()\" (click)=\"onClick($event,'DELETE')\" class='btnDelete'>Delete</button>                       \n                            <button *ngIf=\"matchCurrent()\" (click)=\"onClick($event,'CANCEL')\" class='btnDelete'>Cancel</button>\n                        \n                    </td> \n                    </form>\n  "
                }),
                __param(0, core_1.Inject(core_1.ElementRef)),
                __metadata("design:paramtypes", [core_1.ElementRef, forms_1.FormBuilder])
            ], ReviewListRow);
            exports_1("ReviewListRow", ReviewListRow);
        }
    };
});

//# sourceMappingURL=review-list-row.js.map
