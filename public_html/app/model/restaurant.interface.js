System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var messageType;
    return {
        setters: [],
        execute: function () {
            (function (messageType) {
                messageType[messageType["info"] = 1] = "info";
                messageType[messageType["error"] = 2] = "error";
            })(messageType || (messageType = {}));
            exports_1("messageType", messageType);
        }
    };
});

//# sourceMappingURL=restaurant.interface.js.map
