System.register(["./../services/pubsub.service", "@angular/core"], function (exports_1, context_1) {
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
    var pubsub_service_1, core_1, pubsub_service_2, WaitIndicator;
    return {
        setters: [
            function (pubsub_service_1_1) {
                pubsub_service_1 = pubsub_service_1_1;
                pubsub_service_2 = pubsub_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            WaitIndicator = (function () {
                function WaitIndicator(subProvider) {
                    this.subProvider = subProvider;
                    this.isProcessing = false;
                    this.sub = subProvider.getService();
                }
                WaitIndicator.prototype.ngOnInit = function () {
                    var _this = this;
                    this.waitSubscription = this.sub.getChannel().subscribe(pubsub_service_2.WAIT_TOPIC, function (data, envelope) { return _this.handleRequest(data, envelope); });
                };
                WaitIndicator.prototype.ngOnDestroy = function () {
                    if (this.waitSubscription) {
                        this.waitSubscription.unsubscribe();
                        this.waitSubscription = null;
                    }
                };
                WaitIndicator.prototype.handleRequest = function (data, envelope) {
                    this.isProcessing = data.state;
                };
                return WaitIndicator;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", Boolean)
            ], WaitIndicator.prototype, "isProcessing", void 0);
            WaitIndicator = __decorate([
                core_1.Component({
                    selector: 'wait-indicator',
                    template: "\n   \n  <div [class.waitIndicator]=\"isProcessing\">\n      \n  </div>\n \n  \n  "
                }),
                __metadata("design:paramtypes", [pubsub_service_1.default])
            ], WaitIndicator);
            exports_1("WaitIndicator", WaitIndicator);
        }
    };
});

//# sourceMappingURL=wait-indicator.js.map
