System.register(["@angular/core"], function (exports_1, context_1) {
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, RestaurantListRow;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            RestaurantListRow = (function () {
                function RestaurantListRow(elementRef) {
                    this.editChange = new core_1.EventEmitter();
                    this.reportDom = new core_1.EventEmitter(); //used to report its dom object
                    this.domNode = null;
                    this.domNode = elementRef.nativeElement;
                }
                RestaurantListRow.prototype.ngAfterViewInit = function () {
                    //this.reportDom.emit({"dom": this.domNode});
                };
                RestaurantListRow.prototype.getDom = function () {
                    return this.domNode;
                };
                RestaurantListRow.prototype.onClick = function (ev, type) {
                    this.editChange.emit({ "type": type, "selectedRestaurant": this.row });
                };
                return RestaurantListRow;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Object)
            ], RestaurantListRow.prototype, "row", void 0);
            __decorate([
                core_1.Output('edit-event'),
                __metadata("design:type", Object)
            ], RestaurantListRow.prototype, "editChange", void 0);
            __decorate([
                core_1.Output('report-dom'),
                __metadata("design:type", Object)
            ], RestaurantListRow.prototype, "reportDom", void 0);
            RestaurantListRow = __decorate([
                core_1.Component({
                    selector: 'restaurant-list-row',
                    template: "\n                     \n                    <td  (click)=\"onClick($event,'edit')\" class=\"nameItem\"><span >{{row.name}}</span></td>\n                    <td  (click)=\"onClick($event,'edit')\" class=\"cityItem\">{{row.city}}</td>\n                    <td  (click)=\"onClick($event,'edit')\" class=\"stateItem\">{{row.state}}</td>\n                    <td  (click)=\"onClick($event,'edit')\" class=\"zipCodeItem\">{{row.zipCode}}</td>\n                    <td  (click)=\"onClick($event,'edit')\" class=\"versionItem\">{{row.version}}</td>\n                    <td class=\"actionItems\">\n                    <button (click)=\"onClick($event,'edit')\" class=\"editButton\">Edit</button>\n                    </td>\n                    <td class=\"actionItems\">\n                    <button (click)=\"onClick($event,'delete')\" class=\"warnButton\">Delete</button>\n                    </td>\n                 \n       \n  "
                }),
                __param(0, core_1.Inject(core_1.ElementRef)),
                __metadata("design:paramtypes", [core_1.ElementRef])
            ], RestaurantListRow);
            exports_1("RestaurantListRow", RestaurantListRow);
        }
    };
});

//# sourceMappingURL=restaurant-list-row.js.map
