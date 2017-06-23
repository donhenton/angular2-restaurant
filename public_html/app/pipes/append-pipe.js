System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, AppendPipe;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            //http://voidcanvas.com/angular-2-pipes-filters/
            /**
             * this pipe takes two arguments,
             *  string to append(position 0)
             *  number of times to append (position 1)
             *  if neither is supplied, it default to '...'
             *
             * USAGE:
             *
             * {message | appendPipe:3:'$'}
             * {message | appendPipe}
             */
            AppendPipe = (function () {
                function AppendPipe() {
                }
                AppendPipe.prototype.transform = function (inputString) {
                    var args = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        args[_i - 1] = arguments[_i];
                    }
                    if (args.length == 0) {
                        return inputString + ' ...';
                    }
                    var appValue = '.';
                    if (args.length == 2) {
                        appValue = args[1];
                    }
                    var t = inputString;
                    for (var k = 0; k < args[0]; k++) {
                        t = t + appValue;
                    }
                    return t;
                };
                return AppendPipe;
            }());
            AppendPipe = __decorate([
                core_1.Pipe({
                    name: 'appendPipe',
                    pure: true // optional, default is true false means maintain state
                })
                //http://voidcanvas.com/angular-2-pipes-filters/
                /**
                 * this pipe takes two arguments,
                 *  string to append(position 0)
                 *  number of times to append (position 1)
                 *  if neither is supplied, it default to '...'
                 *
                 * USAGE:
                 *
                 * {message | appendPipe:3:'$'}
                 * {message | appendPipe}
                 */
            ], AppendPipe);
            exports_1("AppendPipe", AppendPipe);
            /*
            import { Pipe, PipeTransform } from '@angular/core';
            
            @Pipe({
              name: 'pomodoroFormattedTime'
            })
            export default class FormattedTimePipe implements PipeTransform {
              transform(totalMinutes: number): string {
                let minutes: number = totalMinutes % 60;
                let hours: number = Math.floor(totalMinutes / 60);
                return `${hours}h:${minutes}m`;
              }
            }
            */ 
        }
    };
});

//# sourceMappingURL=append-pipe.js.map
