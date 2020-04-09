(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/_services/auth-cookie-handler.service.ts":
/*!**********************************************************!*\
  !*** ./src/app/_services/auth-cookie-handler.service.ts ***!
  \**********************************************************/
/*! exports provided: AuthCookieHandlerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthCookieHandlerService", function() { return AuthCookieHandlerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-cookie-service */ "./node_modules/ngx-cookie-service/ngx-cookie-service.es5.js");



var AuthCookieHandlerService = /** @class */ (function () {
    function AuthCookieHandlerService(_cookieService) {
        this._cookieService = _cookieService;
    }
    AuthCookieHandlerService.prototype._getCookie = function () {
        return this._cookieService.get('token');
    };
    AuthCookieHandlerService.prototype._setCookie = function (tokenName, tokenValue) {
        this._cookieService.set(tokenName, tokenValue, 100, '', '', false, "Strict");
    };
    AuthCookieHandlerService.prototype._deleteCookie = function () {
        this._cookieService.deleteAll();
    };
    AuthCookieHandlerService.prototype._checkCookie = function () {
        return this._cookieService.check('token');
    };
    AuthCookieHandlerService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngx_cookie_service__WEBPACK_IMPORTED_MODULE_2__["CookieService"]])
    ], AuthCookieHandlerService);
    return AuthCookieHandlerService;
}());



/***/ }),

/***/ "./src/app/_services/http-method.service.ts":
/*!**************************************************!*\
  !*** ./src/app/_services/http-method.service.ts ***!
  \**************************************************/
/*! exports provided: HttpMethodsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpMethodsService", function() { return HttpMethodsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");






var HttpMethodsService = /** @class */ (function () {
    function HttpMethodsService(http) {
        this.http = http;
        this.apiUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].apiUrl;
    }
    HttpMethodsService.prototype._setHeaders = function () {
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers = headers.set('Authorization', 'Bearer jhsdjsakjdhasdhshdue837893b32g3');
        headers = headers.set('Cache-Control', 'no');
        headers = headers.set('token', 'asdsaugbugbefuierneoibcquydgkciwe');
        headers = headers.set('sign', 'dsdsadsdsadsd');
        headers = headers.set('Expires', '3600');
        return headers;
    };
    HttpMethodsService.prototype._handleError = function (error) {
        var errorMsg;
        if (error instanceof ErrorEvent) {
            errorMsg = "Error: " + error.message + ", Status: false";
        }
        else {
            errorMsg = { ErrorCode: "" + error.status, Message: "" + error.message, ok: "" + error.ok };
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(errorMsg);
    };
    HttpMethodsService.prototype._postCall = function (url, body) {
        var _this = this;
        return this.http.post("" + this.apiUrl + url, body, { headers: this._setHeaders() }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return res; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this._handleError(err); }));
    };
    HttpMethodsService.prototype._getCall = function (url, params) {
        var _this = this;
        return this.http.get(url, { params: params, headers: this._setHeaders() }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return res; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this._handleError(err); }));
    };
    HttpMethodsService.prototype._putCall = function (url, body, params) {
        var _this = this;
        return this.http.put(url, body, { params: params, headers: this._setHeaders() }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(2), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return res; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this._handleError(err); }));
    };
    HttpMethodsService.prototype._deleteCall = function (url, params) {
        var _this = this;
        return this.http.delete(url, { params: params, headers: this._setHeaders() }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (res) { return res; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) { return _this._handleError(err); }));
    };
    HttpMethodsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], HttpMethodsService);
    return HttpMethodsService;
}());



/***/ })

}]);
//# sourceMappingURL=common.js.map