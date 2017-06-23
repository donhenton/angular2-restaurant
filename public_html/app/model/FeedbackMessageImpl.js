System.register(["./restaurant.interface"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var restaurant_interface_1, FeedbackMessageImpl;
    return {
        setters: [
            function (restaurant_interface_1_1) {
                restaurant_interface_1 = restaurant_interface_1_1;
            }
        ],
        execute: function () {
            FeedbackMessageImpl = (function () {
                function FeedbackMessageImpl() {
                    this.type = restaurant_interface_1.messageType.info;
                }
                return FeedbackMessageImpl;
            }());
            exports_1("default", FeedbackMessageImpl);
        }
    };
});

//# sourceMappingURL=FeedbackMessageImpl.js.map
