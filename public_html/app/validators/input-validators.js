System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InputValidators;
    return {
        setters: [],
        execute: function () {
            InputValidators = (function () {
                function InputValidators() {
                }
                InputValidators.cannotBeEmpty = function (control) {
                    if (!control.value) {
                        return { isEmpty: true, message: "Cannot be empty" };
                    }
                    if (control.value && control.value.trim().length == 0) {
                        return { isEmpty: true, message: "Cannot be empty" };
                    }
                    return null; //return null if you are valid
                };
                return InputValidators;
            }());
            exports_1("InputValidators", InputValidators);
        }
    };
});

//# sourceMappingURL=input-validators.js.map
