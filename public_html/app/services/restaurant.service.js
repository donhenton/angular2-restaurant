System.register(["@angular/http", "rxjs/add/operator/map", "@angular/core"], function (exports_1, context_1) {
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
    var http_1, core_1, RestaurantService;
    return {
        setters: [
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {
            },
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            RestaurantService = (function () {
                function RestaurantService(_http) {
                    this._http = _http;
                    this.URL_BASE = "http://donhenton-springmvc3.herokuapp.com:80/app/backbone/restaurant/";
                }
                RestaurantService.prototype.getRestaurant = function (id) {
                    var url = this.URL_BASE + id;
                    return this._http.get(url)
                        .map(function (res) { return res.json(); });
                };
                RestaurantService.prototype.getAllRestaurants = function () {
                    return this._http.get(this.URL_BASE)
                        .map(function (res) { return res.json(); });
                };
                RestaurantService.prototype.saveResaurant = function (body) {
                    return this._http.put(this.URL_BASE + body.id, body);
                };
                RestaurantService.prototype.addRestaurant = function (body) {
                    delete body.id; //id should not exist, may be submitted from downstream
                    return this._http.post(this.URL_BASE, body).map(function (res) { return res.json(); }); //will return {id: 999}, the id of the newly saved restaurant
                };
                RestaurantService.prototype.deleteRestaurant = function (body) {
                    return this._http.delete(this.URL_BASE + body.id);
                };
                RestaurantService.prototype.saveReview = function (body) {
                    //http://donhenton-springmvc3.herokuapp.com/app/backbone/review/70/153 
                    return this._http.put(this.URL_BASE + "review/" + body.restaurantId + "/" + body.reviewDTO.id, body.reviewDTO);
                };
                RestaurantService.prototype.deleteReview = function (body) {
                    return this._http.delete(this.URL_BASE + "review/" + body.restaurantId + "/" + body.reviewDTO.id);
                };
                RestaurantService.prototype.addReview = function (body) {
                    return this._http.post(this.URL_BASE + "review/" + body.restaurantId, body.reviewDTO);
                };
                return RestaurantService;
            }());
            RestaurantService = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [http_1.Http])
            ], RestaurantService);
            exports_1("RestaurantService", RestaurantService);
        }
    };
});

//# sourceMappingURL=restaurant.service.js.map
