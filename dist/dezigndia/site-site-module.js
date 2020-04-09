(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["site-site-module"],{

/***/ "./node_modules/ng-simple-slideshow/ng-simple-slideshow.es5.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ng-simple-slideshow/ng-simple-slideshow.es5.js ***!
  \*********************************************************************/
/*! exports provided: SlideshowModule, ɵa, ɵb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SlideshowModule", function() { return SlideshowModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return SlideshowComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return SwipeService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var SwipeService = /** @class */ (function () {
    function SwipeService() {
    }
    /**
     * \@description detect the direction of the swipe, and return a -1 or 1 if the duration is long enough
     *              else return a 0 to do nothing
     * @param {?} e
     * @param {?} when
     * @return {?}
     */
    SwipeService.prototype.swipe = function (e, when) {
        var /** @type {?} */ coord = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
        var /** @type {?} */ time = new Date().getTime();
        if (when === 'start') {
            this._swipeCoord = coord;
            this._swipeTime = time;
        }
        else if (when === 'end') {
            var /** @type {?} */ direction = [coord[0] - this._swipeCoord[0], coord[1] - this._swipeCoord[1]];
            var /** @type {?} */ duration = time - this._swipeTime;
            if (duration < 1000 // Short enough
                && Math.abs(direction[1]) < Math.abs(direction[0]) // Horizontal enough
                && Math.abs(direction[0]) > 30) {
                return direction[0] < 0 ? 1 : -1;
            }
        }
        return 0;
    };
    return SwipeService;
}());
SwipeService.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"] },
];
/**
 * @nocollapse
 */
SwipeService.ctorParameters = function () { return []; };
var FIRST_SLIDE_KEY = Object(_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["makeStateKey"])('firstSlide');
var SlideshowComponent = /** @class */ (function () {
    /**
     * @param {?} _swipeService
     * @param {?} _renderer
     * @param {?} _transferState
     * @param {?} _ngZone
     * @param {?} sanitizer
     * @param {?} platform_id
     * @param {?} document
     */
    function SlideshowComponent(_swipeService, _renderer, _transferState, _ngZone, sanitizer, platform_id, document) {
        this._swipeService = _swipeService;
        this._renderer = _renderer;
        this._transferState = _transferState;
        this._ngZone = _ngZone;
        this.sanitizer = sanitizer;
        this.platform_id = platform_id;
        this.document = document;
        this.slideIndex = -1;
        this.slides = [];
        this._initial = true;
        this._isHidden = false;
        this.imageUrls = [];
        this.height = '100%';
        this.showArrows = true;
        this.disableSwiping = false;
        this.autoPlay = false;
        this.autoPlayInterval = 3333;
        this.stopAutoPlayOnSlide = true;
        this.autoPlayWaitForLazyLoad = false;
        this.backgroundSize = 'cover';
        this.backgroundPosition = 'center center';
        this.backgroundRepeat = 'no-repeat';
        this.showDots = false;
        this.dotColor = '#FFF';
        this.showCaptions = true;
        this.captionColor = '#FFF';
        this.captionBackground = 'rgba(0, 0, 0, .35)';
        this.lazyLoad = false;
        this.hideOnNoSlides = false;
        this.fullscreen = false;
        this.onSlideLeft = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSlideRight = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSwipeLeft = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSwipeRight = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onFullscreenExit = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onIndexChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(SlideshowComponent.prototype, "safeStyleDotColor", {
        /**
         * @return {?}
         */
        get: function () {
            return this.sanitizer.bypassSecurityTrustStyle("--dot-color: " + this.dotColor);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SlideshowComponent.prototype.ngOnInit = function () {
        if (this.debug !== undefined) {
            console.warn('[Deprecation Warning]: The debug input will be removed from ng-simple-slideshow in 1.3.0');
        }
    };
    /**
     * @return {?}
     */
    SlideshowComponent.prototype.ngDoCheck = function () {
        // if this is the first being called, create a copy of the input
        if (this.imageUrls && this.imageUrls.length > 0) {
            if (this._initial === true) {
                this._urlCache = Array.from(this.imageUrls);
            }
            if (this._isHidden === true) {
                this._renderer.removeStyle(this.container.nativeElement, 'display');
                this._isHidden = false;
            }
            this.setSlides();
        }
        else if (this.hideOnNoSlides === true) {
            this._renderer.setStyle(this.container.nativeElement, 'display', 'none');
            this._isHidden = true;
        }
        this.setStyles();
        this.handleAutoPlay();
    };
    /**
     * \@description this is the function that should be called to make the slides change.
     *              indexDirection to move back is -1, to move forward is 1, and to stay in place is 0.
     *              0 is taken into account for failed swipes
     * @param {?} indexDirection
     * @param {?=} isSwipe
     * @return {?}
     */
    SlideshowComponent.prototype.onSlide = function (indexDirection, isSwipe) {
        this.handleAutoPlay(this.stopAutoPlayOnSlide);
        this.slide(indexDirection, isSwipe);
    };
    /**
     * \@description Use the swipe service to detect swipe events from phone and tablets
     * @param {?} e
     * @param {?} when
     * @return {?}
     */
    SlideshowComponent.prototype.onSwipe = function (e, when) {
        if (this.disableSwiping === true) {
            return;
        }
        var /** @type {?} */ indexDirection = this._swipeService.swipe(e, when);
        // handle a failed swipe
        if (indexDirection === 0) {
            return;
        }
        else {
            this.onSlide(indexDirection, true);
        }
    };
    /**
     * \@description Redirect to current slide "href" if defined
     * @param {?} e
     * @return {?}
     */
    SlideshowComponent.prototype.onClick = function (e) {
        e.preventDefault();
        var /** @type {?} */ currentSlide = this.slides.length > 0 && this.slides[this.slideIndex];
        if (currentSlide && currentSlide.image.clickAction) {
            currentSlide.image.clickAction();
        }
        else if (currentSlide && currentSlide.image.href) {
            this.document.location.href = currentSlide.image.href;
        }
    };
    /**
     * \@description set the index to the desired index - 1 and simulate a right slide
     * @param {?} index
     * @return {?}
     */
    SlideshowComponent.prototype.goToSlide = function (index) {
        var /** @type {?} */ beforeClickIndex = this.slideIndex;
        this.slideIndex = index - 1;
        this.setSlideIndex(1);
        if (!this.slides[this.slideIndex].loaded) {
            this.loadRemainingSlides();
        }
        this.handleAutoPlay(this.stopAutoPlayOnSlide);
        this.slideRight(beforeClickIndex);
        this.slides[beforeClickIndex].selected = false;
        this.slides[this.slideIndex].selected = true;
    };
    /**
     * \@description set the index to the desired index - 1 and simulate a right slide
     * @param {?} index
     * @return {?}
     */
    SlideshowComponent.prototype.getSlideStyle = function (index) {
        var /** @type {?} */ slide = this.slides[index];
        if (slide.loaded) {
            return {
                "background-image": 'url(' + slide.image.url + ')',
                "background-size": slide.image.backgroundSize || this.backgroundSize,
                "background-position": slide.image.backgroundPosition || this.backgroundPosition,
                "background-repeat": slide.image.backgroundRepeat || this.backgroundRepeat
            };
        }
        else {
            // doesn't compile correctly if returning an empty object, sooooo.....
            return {
                "background-image": undefined,
                "background-size": undefined,
                "background-position": undefined,
                "background-repeat": undefined
            };
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    SlideshowComponent.prototype.exitFullScreen = function (e) {
        e.preventDefault();
        this.fullscreen = false;
        this.onFullscreenExit.emit(true);
    };
    /**
     * \@description Set the new slide index, then make the transition happen.
     * @param {?} indexDirection
     * @param {?=} isSwipe
     * @return {?}
     */
    SlideshowComponent.prototype.slide = function (indexDirection, isSwipe) {
        var /** @type {?} */ oldIndex = this.slideIndex;
        this.setSlideIndex(indexDirection);
        if (!this.slides[this.slideIndex].loaded) {
            this.loadRemainingSlides();
        }
        if (indexDirection === 1) {
            this.slideRight(oldIndex, isSwipe);
        }
        else {
            this.slideLeft(oldIndex, isSwipe);
        }
        this.slides[oldIndex].selected = false;
        this.slides[this.slideIndex].selected = true;
    };
    /**
     * \@description This is just treating the url array like a circular list.
     * @param {?} indexDirection
     * @return {?}
     */
    SlideshowComponent.prototype.setSlideIndex = function (indexDirection) {
        this.slideIndex += indexDirection;
        if (this.slideIndex < 0) {
            this.slideIndex = this.slides.length - 1;
        }
        if (this.slideIndex >= this.slides.length) {
            this.slideIndex = 0;
        }
        this.onIndexChanged.emit(this.slideIndex);
    };
    /**
     * \@description This function handles the variables to move the CSS classes around accordingly.
     *              In order to correctly handle animations, the new slide as well as the slides to
     *              the left and right are assigned classes.
     * @param {?} oldIndex
     * @param {?=} isSwipe
     * @return {?}
     */
    SlideshowComponent.prototype.slideLeft = function (oldIndex, isSwipe) {
        if (isSwipe === true) {
            this.onSwipeLeft.emit(this.slideIndex);
        }
        else {
            this.onSlideLeft.emit(this.slideIndex);
        }
        this.slides[this.getLeftSideIndex(oldIndex)].leftSide = false;
        this.slides[oldIndex].leftSide = true;
        this.slides[oldIndex].action = 'slideOutLeft';
        this.slides[this.slideIndex].rightSide = false;
        this.slides[this.getRightSideIndex()].rightSide = true;
        this.slides[this.slideIndex].action = 'slideInRight';
    };
    /**
     * \@description This function handles the variables to move the CSS classes around accordingly.
     *              In order to correctly handle animations, the new slide as well as the slides to
     *              the left and right are assigned classes.
     * @param {?} oldIndex
     * @param {?=} isSwipe
     * @return {?}
     */
    SlideshowComponent.prototype.slideRight = function (oldIndex, isSwipe) {
        if (isSwipe === true) {
            this.onSwipeRight.emit(this.slideIndex);
        }
        else {
            this.onSlideRight.emit(this.slideIndex);
        }
        this.slides[this.getRightSideIndex(oldIndex)].rightSide = false;
        this.slides[oldIndex].rightSide = true;
        this.slides[oldIndex].action = 'slideOutRight';
        this.slides[this.slideIndex].leftSide = false;
        this.slides[this.getLeftSideIndex()].leftSide = true;
        this.slides[this.slideIndex].action = 'slideInLeft';
    };
    /**
     * \@description Check to make sure slide images have been set or haven't changed
     * @return {?}
     */
    SlideshowComponent.prototype.setSlides = function () {
        if (this.imageUrls) {
            if (this.checkCache() || this._initial === true) {
                this._initial = false;
                this._urlCache = Array.from(this.imageUrls);
                this.slides = [];
                if (this.lazyLoad === true) {
                    this.buildLazyLoadSlideArray();
                }
                else {
                    this.buildSlideArray();
                }
            }
        }
    };
    /**
     * \@description create the slides without background urls, which will be added in
     *              for the "lazy load," then load only the first slide
     * @return {?}
     */
    SlideshowComponent.prototype.buildLazyLoadSlideArray = function () {
        for (var _i = 0, _a = this.imageUrls; _i < _a.length; _i++) {
            var image = _a[_i];
            this.slides.push({
                image: (typeof image === 'string' ? { url: null } : { url: null, href: image.href || '' }),
                action: '',
                leftSide: false,
                rightSide: false,
                selected: false,
                loaded: false
            });
        }
        this.slideIndex = 0;
        this.slides[this.slideIndex].selected = true;
        this.loadFirstSlide();
        this.onIndexChanged.emit(this.slideIndex);
    };
    /**
     * \@description create the slides with background urls all at once
     * @return {?}
     */
    SlideshowComponent.prototype.buildSlideArray = function () {
        for (var _i = 0, _a = this.imageUrls; _i < _a.length; _i++) {
            var image = _a[_i];
            this.slides.push({
                image: (typeof image === 'string' ? { url: image } : image),
                action: '',
                leftSide: false,
                rightSide: false,
                selected: false,
                loaded: true
            });
        }
        this.slideIndex = 0;
        this.slides[this.slideIndex].selected = true;
        this.onIndexChanged.emit(this.slideIndex);
    };
    /**
     * \@description load the first slide image if lazy loading
     *              this takes server side and browser side into account
     * @return {?}
     */
    SlideshowComponent.prototype.loadFirstSlide = function () {
        var _this = this;
        var /** @type {?} */ tmpIndex = this.slideIndex;
        var /** @type {?} */ tmpImage = this.imageUrls[tmpIndex];
        // if server side, we don't need to worry about the rest of the slides
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platform_id)) {
            this.slides[tmpIndex].image = (typeof tmpImage === 'string' ? { url: tmpImage } : tmpImage);
            this.slides[tmpIndex].loaded = true;
            this._transferState.set(FIRST_SLIDE_KEY, this.slides[tmpIndex]);
        }
        else {
            var /** @type {?} */ firstSlideFromTransferState = this._transferState.get(FIRST_SLIDE_KEY, /** @type {?} */ (null));
            // if the first slide didn't finish loading on the server side, we need to load it
            if (firstSlideFromTransferState === null) {
                var /** @type {?} */ loadImage = new Image();
                loadImage.src = (typeof tmpImage === 'string' ? tmpImage : tmpImage.url);
                loadImage.addEventListener('load', function () {
                    _this.slides[tmpIndex].image = (typeof tmpImage === 'string' ? { url: tmpImage } : tmpImage);
                    _this.slides[tmpIndex].loaded = true;
                });
            }
            else {
                this.slides[tmpIndex] = firstSlideFromTransferState;
                this._transferState.remove(FIRST_SLIDE_KEY);
            }
        }
    };
    /**
     * \@description if lazy loading in browser, start loading remaining slides
     * \@todo: figure out how to not show the spinner if images are loading fast enough
     * @return {?}
     */
    SlideshowComponent.prototype.loadRemainingSlides = function () {
        var _this = this;
        var _loop_1 = function (i) {
            if (!this_1.slides[i].loaded) {
                new Promise(function (resolve) {
                    var /** @type {?} */ tmpImage = _this.imageUrls[i];
                    var /** @type {?} */ loadImage = new Image();
                    loadImage.addEventListener('load', function () {
                        _this.slides[i].image = (typeof tmpImage === 'string' ? { url: tmpImage } : tmpImage);
                        _this.slides[i].loaded = true;
                        resolve();
                    });
                    loadImage.src = (typeof tmpImage === 'string' ? tmpImage : tmpImage.url);
                });
            }
        };
        var this_1 = this;
        for (var /** @type {?} */ i = 0; i < this.slides.length; i++) {
            _loop_1(/** @type {?} */ i);
        }
    };
    /**
     * \@description Start or stop autoPlay, don't do it at all server side
     * @param {?=} stopAutoPlay
     * @return {?}
     */
    SlideshowComponent.prototype.handleAutoPlay = function (stopAutoPlay) {
        var _this = this;
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platform_id)) {
            return;
        }
        if (stopAutoPlay === true || this.autoPlay === false) {
            if (this._autoplayIntervalId) {
                this._ngZone.runOutsideAngular(function () { return clearInterval(_this._autoplayIntervalId); });
                this._autoplayIntervalId = null;
            }
        }
        else if (!this._autoplayIntervalId) {
            this._ngZone.runOutsideAngular(function () {
                _this._autoplayIntervalId = setInterval(function () {
                    if (!_this.autoPlayWaitForLazyLoad || (_this.autoPlayWaitForLazyLoad && _this.slides[_this.slideIndex].loaded)) {
                        _this._ngZone.run(function () { return _this.slide(1); });
                    }
                }, _this.autoPlayInterval);
            });
        }
    };
    /**
     * \@description Keep the styles up to date with the input
     * @return {?}
     */
    SlideshowComponent.prototype.setStyles = function () {
        if (this.fullscreen) {
            this._renderer.setStyle(this.container.nativeElement, 'height', '100%');
            // Would be nice to make it configurable
            this._renderer.setStyle(this.container.nativeElement, 'background-color', 'white');
        }
        else {
            // Would be nice to make it configurable
            this._renderer.removeStyle(this.container.nativeElement, 'background-color');
            if (this.height) {
                this._renderer.setStyle(this.container.nativeElement, 'height', this.height);
            }
            if (this.minHeight) {
                this._renderer.setStyle(this.container.nativeElement, 'min-height', this.minHeight);
            }
        }
        if (this.arrowSize) {
            this._renderer.setStyle(this.prevArrow.nativeElement, 'height', this.arrowSize);
            this._renderer.setStyle(this.prevArrow.nativeElement, 'width', this.arrowSize);
            this._renderer.setStyle(this.nextArrow.nativeElement, 'height', this.arrowSize);
            this._renderer.setStyle(this.nextArrow.nativeElement, 'width', this.arrowSize);
        }
    };
    /**
     * \@description compare image array to the cache, returns false if no changes
     * @return {?}
     */
    SlideshowComponent.prototype.checkCache = function () {
        var _this = this;
        return !(this._urlCache.length === this.imageUrls.length && this._urlCache.every(function (cacheElement, i) { return cacheElement === _this.imageUrls[i]; }));
    };
    /**
     * \@description get the index for the slide to the left of the new slide
     * @param {?=} i
     * @return {?}
     */
    SlideshowComponent.prototype.getLeftSideIndex = function (i) {
        if (i === undefined) {
            i = this.slideIndex;
        }
        if (--i < 0) {
            i = this.slides.length - 1;
        }
        return i;
    };
    /**
     * \@description get the index for the slide to the right of the new slide
     * @param {?=} i
     * @return {?}
     */
    SlideshowComponent.prototype.getRightSideIndex = function (i) {
        if (i === undefined) {
            i = this.slideIndex;
        }
        if (++i >= this.slides.length) {
            i = 0;
        }
        return i;
    };
    /**
     * \@description a trackBy function for the ngFor loops
     * @param {?} index
     * @param {?} slide
     * @return {?}
     */
    SlideshowComponent.prototype.trackByFn = function (index, slide) {
        return slide.image;
    };
    return SlideshowComponent;
}());
SlideshowComponent.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                selector: 'slideshow',
                template: "\n    <!-- fullscreen bar -->\n    <div [class.display-none]=\"!fullscreen\"\n         class=\"fs-container\"\n         (click)=\"exitFullScreen($event)\">\n      <i title=\"Back\"\n         class=\"arrow-exitfs prev\"></i>\n    </div>\n    <div #container\n         (touchstart)=\"onSwipe($event, 'start')\"\n         (touchend)=\"onSwipe($event, 'end')\"\n         class=\"slideshow-container\"\n         [class.slideshow-container-fs]=\"fullscreen\">\n      <!-- slides -->\n      <a *ngFor=\"let slide of slides; index as i; trackBy: trackByFn\"\n         class=\"slides\"\n         href=\"{{slide?.image?.clickAction ? '#' : slide?.image?.href}}\"\n         title=\"{{slide?.image?.title}}\"\n         [ngStyle]=\"getSlideStyle(i)\"\n         [class.selected]=\"slide?.selected\"\n         [class.hide-slide]=\"!slide?.selected && !slide?.leftSide && !slide?.rightSide\"\n         [class.left-side]=\"slide?.leftSide\"\n         [class.right-side]=\"slide?.rightSide\"\n         [class.slide-in-left]=\"slide?.action === 'slideInLeft'\"\n         [class.slide-in-right]=\"slide?.action === 'slideInRight'\"\n         [class.slide-out-left]=\"slide?.action === 'slideOutLeft'\"\n         [class.slide-out-right]=\"slide?.action === 'slideOutRight'\"\n         [class.link]=\"slide?.image?.clickAction || slide?.image?.href\"\n         (click)=\"onClick($event)\">\n        <div class=\"loader\"\n             *ngIf=\"!slide?.loaded\"></div>\n        <div *ngIf=\"showCaptions && slide?.image?.caption\"\n             class=\"caption\"\n             [ngStyle]=\"{\n               'color': captionColor,\n               'background-color': captionBackground\n              }\"\n             [innerHTML]=\"slide?.image?.caption\">\n        </div>\n      </a>\n      <!-- left arrow -->\n      <div [class.display-none]=\"!this.showArrows\"\n           (click)=\"onSlide(-1)\"\n           class=\"arrow-container prev\">\n        <i #prevArrow\n           title=\"Previous\"\n           class=\"arrow prev\"></i>\n      </div>\n      <!-- right arrow -->\n      <div [class.display-none]=\"!this.showArrows\"\n           (click)=\"onSlide(1)\"\n           class=\"arrow-container next\">\n        <i #nextArrow\n           title=\"Next\"\n           class=\"arrow next\"></i>\n      </div>\n      <!-- dots -->\n      <ul class=\"slick-dots\"\n          *ngIf=\"showDots\">\n        <li *ngFor=\"let slide of slides; index as i; trackBy: trackByFn\"\n            (click)=\"goToSlide(i)\"\n            [class.slick-active]=\"slide.selected\">\n          <button type=\"button\"\n                  [attr.style]=\"safeStyleDotColor\">\n            {{i}}\n          </button>\n        </li>\n      </ul>\n    </div>\n  ",
                styles: ["\n    /*\n     styles adapted from https://www.w3schools.com/w3css/4/w3.css\n     arrow styles adapted from https://codepen.io/minustalent/pen/Frhaw\n     */\n    .display-none {\n      display: none !important; }\n\n    .fs-container {\n      display: block;\n      cursor: pointer;\n      position: fixed;\n      z-index: 1;\n      top: 16px;\n      left: 16px;\n      width: 46px;\n      height: 46px;\n      text-align: center;\n      padding: 0;\n      background-color: rgba(0, 0, 0, 0.2);\n      -webkit-transition: all .2s ease-in-out;\n      transition: all .2s ease-in-out; }\n      .fs-container:hover {\n        background-color: rgba(0, 0, 0, 0.33); }\n      .fs-container .arrow-exitfs {\n        display: block;\n        width: 30px;\n        height: 30px;\n        background: transparent;\n        border-top: 2px solid #f2f2f2;\n        -webkit-transition: all .2s ease-in-out;\n        transition: all .2s ease-in-out; }\n        .fs-container .arrow-exitfs.prev {\n          -webkit-transform: rotate(-45deg);\n                  transform: rotate(-45deg);\n          position: relative;\n          left: 18px;\n          top: 18px; }\n        .fs-container .arrow-exitfs:after {\n          content: '';\n          width: 30px;\n          height: 30px;\n          background: transparent;\n          border-top: 2px solid #f2f2f2;\n          -webkit-transform: rotate(90deg);\n                  transform: rotate(90deg);\n          position: absolute;\n          left: -15px;\n          top: -17px; }\n\n    .slideshow-container.slideshow-container-fs {\n      position: fixed;\n      left: 0;\n      top: 0;\n      width: 100%;\n      height: 100%; }\n\n    .slideshow-container {\n      position: relative;\n      display: block;\n      margin: auto;\n      height: 100%;\n      width: 100%;\n      overflow: hidden; }\n      .slideshow-container .hide-slide {\n        visibility: hidden;\n        position: absolute;\n        top: -100vw;\n        left: -100vw;\n        opacity: 0; }\n      .slideshow-container .slides {\n        position: absolute;\n        top: 0;\n        height: 100%;\n        width: 100%;\n        visibility: visible;\n        opacity: 1;\n        display: block; }\n        .slideshow-container .slides.selected {\n          left: 0; }\n        .slideshow-container .slides.left-slide {\n          left: -100%; }\n        .slideshow-container .slides.right-slide {\n          left: 100%; }\n        .slideshow-container .slides.slide-in-left {\n          left: 0;\n          -webkit-animation: slideInLeft 0.5s cubic-bezier(0.42, 0, 0.58, 1);\n                  animation: slideInLeft 0.5s cubic-bezier(0.42, 0, 0.58, 1); }\n        .slideshow-container .slides.slide-in-right {\n          left: 0;\n          -webkit-animation: slideInRight 0.5s cubic-bezier(0.42, 0, 0.58, 1);\n                  animation: slideInRight 0.5s cubic-bezier(0.42, 0, 0.58, 1); }\n        .slideshow-container .slides.slide-out-left {\n          left: -100%;\n          -webkit-animation: slideOutLeft 0.5s cubic-bezier(0.42, 0, 0.58, 1);\n                  animation: slideOutLeft 0.5s cubic-bezier(0.42, 0, 0.58, 1); }\n        .slideshow-container .slides.slide-out-right {\n          left: 100%;\n          -webkit-animation: slideOutRight 0.5s cubic-bezier(0.42, 0, 0.58, 1);\n                  animation: slideOutRight 0.5s cubic-bezier(0.42, 0, 0.58, 1); }\n        .slideshow-container .slides.link {\n          cursor: pointer; }\n        .slideshow-container .slides:not(.link) {\n          cursor: default; }\n      .slideshow-container .caption {\n        position: absolute;\n        bottom: 0;\n        padding: 10px;\n        width: 100%; }\n      .slideshow-container .arrow-container {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center;\n        -webkit-box-pack: center;\n            -ms-flex-pack: center;\n                justify-content: center;\n        position: absolute;\n        top: 0;\n        height: 100%;\n        width: auto;\n        cursor: pointer;\n        background-size: 100%;\n        background-image: -webkit-gradient(linear, left top, left bottom, from(transparent), to(transparent));\n        background-image: linear-gradient(transparent, transparent);\n        z-index: 100;\n        -webkit-user-select: none;\n           -moz-user-select: none;\n            -ms-user-select: none;\n                user-select: none; }\n        .slideshow-container .arrow-container:before {\n          display: block;\n          height: 100%;\n          position: absolute;\n          top: 0;\n          left: 0;\n          opacity: 0;\n          width: 100%;\n          z-index: -100;\n          -webkit-transition: opacity 0.45s;\n          transition: opacity 0.45s; }\n        .slideshow-container .arrow-container.prev {\n          left: 0; }\n          .slideshow-container .arrow-container.prev:before {\n            background-image: -webkit-gradient(linear, right top, left top, from(transparent), to(rgba(0, 0, 0, 0.75)));\n            background-image: linear-gradient(to left, transparent, rgba(0, 0, 0, 0.75));\n            content: ''; }\n        .slideshow-container .arrow-container.next {\n          right: 0; }\n          .slideshow-container .arrow-container.next:before {\n            background-image: -webkit-gradient(linear, left top, right top, from(transparent), to(rgba(0, 0, 0, 0.75)));\n            background-image: linear-gradient(to right, transparent, rgba(0, 0, 0, 0.75));\n            content: ''; }\n        .slideshow-container .arrow-container .arrow {\n          display: block;\n          margin: auto;\n          width: 30px;\n          height: 30px;\n          background: transparent;\n          border-top: 2px solid #f2f2f2;\n          border-left: 2px solid #f2f2f2;\n          -webkit-transition: all .2s ease-in-out;\n          transition: all .2s ease-in-out;\n          -webkit-user-select: none;\n             -moz-user-select: none;\n              -ms-user-select: none;\n                  user-select: none; }\n          .slideshow-container .arrow-container .arrow:before {\n            display: block;\n            height: 200%;\n            width: 200%;\n            margin-left: -50%;\n            margin-top: -50%;\n            content: \"\";\n            -webkit-transform: rotate(45deg);\n                    transform: rotate(45deg); }\n          .slideshow-container .arrow-container .arrow.prev {\n            -webkit-transform: rotate(-45deg);\n                    transform: rotate(-45deg);\n            position: relative;\n            left: 20px;\n            margin-right: 10px; }\n          .slideshow-container .arrow-container .arrow.next {\n            -webkit-transform: rotate(135deg);\n                    transform: rotate(135deg);\n            position: relative;\n            right: 20px;\n            margin-left: 10px; }\n      .slideshow-container .slick-dots {\n        display: block;\n        bottom: 15px;\n        z-index: 1;\n        text-align: center;\n        position: absolute;\n        padding: 0;\n        left: 0;\n        right: 0;\n        margin: 0 auto; }\n        .slideshow-container .slick-dots li {\n          display: inline;\n          margin: 0;\n          padding: 0; }\n          .slideshow-container .slick-dots li button {\n            border: none;\n            background: none;\n            text-indent: -9999px;\n            font-size: 0;\n            width: 20px;\n            height: 20px;\n            outline: none;\n            position: relative;\n            z-index: 1;\n            cursor: pointer; }\n            .slideshow-container .slick-dots li button:before {\n              content: '';\n              width: 4px;\n              height: 4px;\n              background: var(--dot-color, #FFF);\n              border-radius: 4px;\n              display: block;\n              position: absolute;\n              top: 50%;\n              left: 50%;\n              -webkit-transform: translate(-50%, -50%);\n                      transform: translate(-50%, -50%);\n              opacity: .7;\n              -webkit-transition: all .5s ease-out;\n              transition: all .5s ease-out; }\n          .slideshow-container .slick-dots li.slick-active button:before {\n            -webkit-transform: translate(-50%, -50%) scale(1.4);\n                    transform: translate(-50%, -50%) scale(1.4);\n            opacity: 1; }\n\n    @media screen and (min-width: 768px) {\n      .slideshow-container .arrow-container:hover:before {\n        opacity: 1; }\n      .slideshow-container .arrow-container:hover .arrow {\n        border-width: 4px; }\n      .slideshow-container .arrow-container .arrow:hover {\n        border-width: 4px; } }\n\n    @-webkit-keyframes slideInRight {\n      0% {\n        left: -100%; }\n      100% {\n        left: 0; } }\n\n    @keyframes slideInRight {\n      0% {\n        left: -100%; }\n      100% {\n        left: 0; } }\n\n    @-webkit-keyframes slideInLeft {\n      0% {\n        left: 100%; }\n      100% {\n        left: 0; } }\n\n    @keyframes slideInLeft {\n      0% {\n        left: 100%; }\n      100% {\n        left: 0; } }\n\n    @-webkit-keyframes slideOutRight {\n      0% {\n        left: 0; }\n      100% {\n        left: -100%; } }\n\n    @keyframes slideOutRight {\n      0% {\n        left: 0; }\n      100% {\n        left: -100%; } }\n\n    @-webkit-keyframes slideOutLeft {\n      0% {\n        left: 0; }\n      100% {\n        left: 100%; } }\n\n    @keyframes slideOutLeft {\n      0% {\n        left: 0; }\n      100% {\n        left: 100%; } }\n\n    .loader {\n      position: absolute;\n      left: 50%;\n      margin-left: -20px;\n      top: 50%;\n      margin-top: -20px;\n      border: 5px solid #f3f3f3;\n      border-top: 5px solid #555;\n      border-radius: 50%;\n      width: 50px;\n      height: 50px;\n      -webkit-animation: spin 1s linear infinite;\n              animation: spin 1s linear infinite; }\n\n    @-webkit-keyframes spin {\n      0% {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg); }\n      100% {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg); } }\n\n    @keyframes spin {\n      0% {\n        -webkit-transform: rotate(0deg);\n                transform: rotate(0deg); }\n      100% {\n        -webkit-transform: rotate(360deg);\n                transform: rotate(360deg); } }\n  "]
            },] },
];
/**
 * @nocollapse
 */
SlideshowComponent.ctorParameters = function () { return [
    { type: SwipeService, },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"], },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["TransferState"], },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"], },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"], },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["PLATFORM_ID"],] },] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] },] },
]; };
SlideshowComponent.propDecorators = {
    'imageUrls': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'height': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'minHeight': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'arrowSize': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showArrows': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'disableSwiping': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'autoPlay': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'autoPlayInterval': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'stopAutoPlayOnSlide': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'autoPlayWaitForLazyLoad': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'debug': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'backgroundSize': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'backgroundPosition': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'backgroundRepeat': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showDots': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'dotColor': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'showCaptions': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'captionColor': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'captionBackground': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'lazyLoad': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'hideOnNoSlides': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'fullscreen': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    'onSlideLeft': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onSlideRight': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onSwipeLeft': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onSwipeRight': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onFullscreenExit': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'onIndexChanged': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    'container': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['container',] },],
    'prevArrow': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['prevArrow',] },],
    'nextArrow': [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['nextArrow',] },],
};
var SlideshowModule = /** @class */ (function () {
    function SlideshowModule() {
    }
    return SlideshowModule;
}());
SlideshowModule.decorators = [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserTransferStateModule"]
                ],
                declarations: [
                    SlideshowComponent
                ],
                exports: [
                    SlideshowComponent
                ],
                providers: [
                    SwipeService
                ]
            },] },
];
/**
 * @nocollapse
 */
SlideshowModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ng-simple-slideshow.es5.js.map


/***/ }),

/***/ "./node_modules/typed.js/lib/typed.js":
/*!********************************************!*\
  !*** ./node_modules/typed.js/lib/typed.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.11
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else {}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _initializerJs = __webpack_require__(1);
	
	var _htmlParserJs = __webpack_require__(3);
	
	/**
	 * Welcome to Typed.js!
	 * @param {string} elementId HTML element ID _OR_ HTML element
	 * @param {object} options options object
	 * @returns {object} a new Typed object
	 */
	
	var Typed = (function () {
	  function Typed(elementId, options) {
	    _classCallCheck(this, Typed);
	
	    // Initialize it up
	    _initializerJs.initializer.load(this, options, elementId);
	    // All systems go!
	    this.begin();
	  }
	
	  /**
	   * Toggle start() and stop() of the Typed instance
	   * @public
	   */
	
	  _createClass(Typed, [{
	    key: 'toggle',
	    value: function toggle() {
	      this.pause.status ? this.start() : this.stop();
	    }
	
	    /**
	     * Stop typing / backspacing and enable cursor blinking
	     * @public
	     */
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (this.typingComplete) return;
	      if (this.pause.status) return;
	      this.toggleBlinking(true);
	      this.pause.status = true;
	      this.options.onStop(this.arrayPos, this);
	    }
	
	    /**
	     * Start typing / backspacing after being stopped
	     * @public
	     */
	  }, {
	    key: 'start',
	    value: function start() {
	      if (this.typingComplete) return;
	      if (!this.pause.status) return;
	      this.pause.status = false;
	      if (this.pause.typewrite) {
	        this.typewrite(this.pause.curString, this.pause.curStrPos);
	      } else {
	        this.backspace(this.pause.curString, this.pause.curStrPos);
	      }
	      this.options.onStart(this.arrayPos, this);
	    }
	
	    /**
	     * Destroy this instance of Typed
	     * @public
	     */
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.reset(false);
	      this.options.onDestroy(this);
	    }
	
	    /**
	     * Reset Typed and optionally restarts
	     * @param {boolean} restart
	     * @public
	     */
	  }, {
	    key: 'reset',
	    value: function reset() {
	      var restart = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      clearInterval(this.timeout);
	      this.replaceText('');
	      if (this.cursor && this.cursor.parentNode) {
	        this.cursor.parentNode.removeChild(this.cursor);
	        this.cursor = null;
	      }
	      this.strPos = 0;
	      this.arrayPos = 0;
	      this.curLoop = 0;
	      if (restart) {
	        this.insertCursor();
	        this.options.onReset(this);
	        this.begin();
	      }
	    }
	
	    /**
	     * Begins the typing animation
	     * @private
	     */
	  }, {
	    key: 'begin',
	    value: function begin() {
	      var _this = this;
	
	      this.options.onBegin(this);
	      this.typingComplete = false;
	      this.shuffleStringsIfNeeded(this);
	      this.insertCursor();
	      if (this.bindInputFocusEvents) this.bindFocusEvents();
	      this.timeout = setTimeout(function () {
	        // Check if there is some text in the element, if yes start by backspacing the default message
	        if (!_this.currentElContent || _this.currentElContent.length === 0) {
	          _this.typewrite(_this.strings[_this.sequence[_this.arrayPos]], _this.strPos);
	        } else {
	          // Start typing
	          _this.backspace(_this.currentElContent, _this.currentElContent.length);
	        }
	      }, this.startDelay);
	    }
	
	    /**
	     * Called for each character typed
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'typewrite',
	    value: function typewrite(curString, curStrPos) {
	      var _this2 = this;
	
	      if (this.fadeOut && this.el.classList.contains(this.fadeOutClass)) {
	        this.el.classList.remove(this.fadeOutClass);
	        if (this.cursor) this.cursor.classList.remove(this.fadeOutClass);
	      }
	
	      var humanize = this.humanizer(this.typeSpeed);
	      var numChars = 1;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	
	      // contain typing function in a timeout humanize'd delay
	      this.timeout = setTimeout(function () {
	        // skip over any HTML chars
	        curStrPos = _htmlParserJs.htmlParser.typeHtmlChars(curString, curStrPos, _this2);
	
	        var pauseTime = 0;
	        var substr = curString.substr(curStrPos);
	        // check for an escape character before a pause value
	        // format: \^\d+ .. eg: ^1000 .. should be able to print the ^ too using ^^
	        // single ^ are removed from string
	        if (substr.charAt(0) === '^') {
	          if (/^\^\d+/.test(substr)) {
	            var skip = 1; // skip at least 1
	            substr = /\d+/.exec(substr)[0];
	            skip += substr.length;
	            pauseTime = parseInt(substr);
	            _this2.temporaryPause = true;
	            _this2.options.onTypingPaused(_this2.arrayPos, _this2);
	            // strip out the escape character and pause value so they're not printed
	            curString = curString.substring(0, curStrPos) + curString.substring(curStrPos + skip);
	            _this2.toggleBlinking(true);
	          }
	        }
	
	        // check for skip characters formatted as
	        // "this is a `string to print NOW` ..."
	        if (substr.charAt(0) === '`') {
	          while (curString.substr(curStrPos + numChars).charAt(0) !== '`') {
	            numChars++;
	            if (curStrPos + numChars > curString.length) break;
	          }
	          // strip out the escape characters and append all the string in between
	          var stringBeforeSkip = curString.substring(0, curStrPos);
	          var stringSkipped = curString.substring(stringBeforeSkip.length + 1, curStrPos + numChars);
	          var stringAfterSkip = curString.substring(curStrPos + numChars + 1);
	          curString = stringBeforeSkip + stringSkipped + stringAfterSkip;
	          numChars--;
	        }
	
	        // timeout for any pause after a character
	        _this2.timeout = setTimeout(function () {
	          // Accounts for blinking while paused
	          _this2.toggleBlinking(false);
	
	          // We're done with this sentence!
	          if (curStrPos >= curString.length) {
	            _this2.doneTyping(curString, curStrPos);
	          } else {
	            _this2.keepTyping(curString, curStrPos, numChars);
	          }
	          // end of character pause
	          if (_this2.temporaryPause) {
	            _this2.temporaryPause = false;
	            _this2.options.onTypingResumed(_this2.arrayPos, _this2);
	          }
	        }, pauseTime);
	
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Continue to the next string & begin typing
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'keepTyping',
	    value: function keepTyping(curString, curStrPos, numChars) {
	      // call before functions if applicable
	      if (curStrPos === 0) {
	        this.toggleBlinking(false);
	        this.options.preStringTyped(this.arrayPos, this);
	      }
	      // start typing each new char into existing string
	      // curString: arg, this.el.html: original text inside element
	      curStrPos += numChars;
	      var nextString = curString.substr(0, curStrPos);
	      this.replaceText(nextString);
	      // loop the function
	      this.typewrite(curString, curStrPos);
	    }
	
	    /**
	     * We're done typing the current string
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'doneTyping',
	    value: function doneTyping(curString, curStrPos) {
	      var _this3 = this;
	
	      // fires callback function
	      this.options.onStringTyped(this.arrayPos, this);
	      this.toggleBlinking(true);
	      // is this the final string
	      if (this.arrayPos === this.strings.length - 1) {
	        // callback that occurs on the last typed string
	        this.complete();
	        // quit if we wont loop back
	        if (this.loop === false || this.curLoop === this.loopCount) {
	          return;
	        }
	      }
	      this.timeout = setTimeout(function () {
	        _this3.backspace(curString, curStrPos);
	      }, this.backDelay);
	    }
	
	    /**
	     * Backspaces 1 character at a time
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @private
	     */
	  }, {
	    key: 'backspace',
	    value: function backspace(curString, curStrPos) {
	      var _this4 = this;
	
	      if (this.pause.status === true) {
	        this.setPauseStatus(curString, curStrPos, true);
	        return;
	      }
	      if (this.fadeOut) return this.initFadeOut();
	
	      this.toggleBlinking(false);
	      var humanize = this.humanizer(this.backSpeed);
	
	      this.timeout = setTimeout(function () {
	        curStrPos = _htmlParserJs.htmlParser.backSpaceHtmlChars(curString, curStrPos, _this4);
	        // replace text with base text + typed characters
	        var curStringAtPosition = curString.substr(0, curStrPos);
	        _this4.replaceText(curStringAtPosition);
	
	        // if smartBack is enabled
	        if (_this4.smartBackspace) {
	          // the remaining part of the current string is equal of the same part of the new string
	          var nextString = _this4.strings[_this4.arrayPos + 1];
	          if (nextString && curStringAtPosition === nextString.substr(0, curStrPos)) {
	            _this4.stopNum = curStrPos;
	          } else {
	            _this4.stopNum = 0;
	          }
	        }
	
	        // if the number (id of character in current string) is
	        // less than the stop number, keep going
	        if (curStrPos > _this4.stopNum) {
	          // subtract characters one by one
	          curStrPos--;
	          // loop the function
	          _this4.backspace(curString, curStrPos);
	        } else if (curStrPos <= _this4.stopNum) {
	          // if the stop number has been reached, increase
	          // array position to next string
	          _this4.arrayPos++;
	          // When looping, begin at the beginning after backspace complete
	          if (_this4.arrayPos === _this4.strings.length) {
	            _this4.arrayPos = 0;
	            _this4.options.onLastStringBackspaced();
	            _this4.shuffleStringsIfNeeded();
	            _this4.begin();
	          } else {
	            _this4.typewrite(_this4.strings[_this4.sequence[_this4.arrayPos]], curStrPos);
	          }
	        }
	        // humanized value for typing
	      }, humanize);
	    }
	
	    /**
	     * Full animation is complete
	     * @private
	     */
	  }, {
	    key: 'complete',
	    value: function complete() {
	      this.options.onComplete(this);
	      if (this.loop) {
	        this.curLoop++;
	      } else {
	        this.typingComplete = true;
	      }
	    }
	
	    /**
	     * Has the typing been stopped
	     * @param {string} curString the current string in the strings array
	     * @param {number} curStrPos the current position in the curString
	     * @param {boolean} isTyping
	     * @private
	     */
	  }, {
	    key: 'setPauseStatus',
	    value: function setPauseStatus(curString, curStrPos, isTyping) {
	      this.pause.typewrite = isTyping;
	      this.pause.curString = curString;
	      this.pause.curStrPos = curStrPos;
	    }
	
	    /**
	     * Toggle the blinking cursor
	     * @param {boolean} isBlinking
	     * @private
	     */
	  }, {
	    key: 'toggleBlinking',
	    value: function toggleBlinking(isBlinking) {
	      if (!this.cursor) return;
	      // if in paused state, don't toggle blinking a 2nd time
	      if (this.pause.status) return;
	      if (this.cursorBlinking === isBlinking) return;
	      this.cursorBlinking = isBlinking;
	      if (isBlinking) {
	        this.cursor.classList.add('typed-cursor--blink');
	      } else {
	        this.cursor.classList.remove('typed-cursor--blink');
	      }
	    }
	
	    /**
	     * Speed in MS to type
	     * @param {number} speed
	     * @private
	     */
	  }, {
	    key: 'humanizer',
	    value: function humanizer(speed) {
	      return Math.round(Math.random() * speed / 2) + speed;
	    }
	
	    /**
	     * Shuffle the sequence of the strings array
	     * @private
	     */
	  }, {
	    key: 'shuffleStringsIfNeeded',
	    value: function shuffleStringsIfNeeded() {
	      if (!this.shuffle) return;
	      this.sequence = this.sequence.sort(function () {
	        return Math.random() - 0.5;
	      });
	    }
	
	    /**
	     * Adds a CSS class to fade out current string
	     * @private
	     */
	  }, {
	    key: 'initFadeOut',
	    value: function initFadeOut() {
	      var _this5 = this;
	
	      this.el.className += ' ' + this.fadeOutClass;
	      if (this.cursor) this.cursor.className += ' ' + this.fadeOutClass;
	      return setTimeout(function () {
	        _this5.arrayPos++;
	        _this5.replaceText('');
	
	        // Resets current string if end of loop reached
	        if (_this5.strings.length > _this5.arrayPos) {
	          _this5.typewrite(_this5.strings[_this5.sequence[_this5.arrayPos]], 0);
	        } else {
	          _this5.typewrite(_this5.strings[0], 0);
	          _this5.arrayPos = 0;
	        }
	      }, this.fadeOutDelay);
	    }
	
	    /**
	     * Replaces current text in the HTML element
	     * depending on element type
	     * @param {string} str
	     * @private
	     */
	  }, {
	    key: 'replaceText',
	    value: function replaceText(str) {
	      if (this.attr) {
	        this.el.setAttribute(this.attr, str);
	      } else {
	        if (this.isInput) {
	          this.el.value = str;
	        } else if (this.contentType === 'html') {
	          this.el.innerHTML = str;
	        } else {
	          this.el.textContent = str;
	        }
	      }
	    }
	
	    /**
	     * If using input elements, bind focus in order to
	     * start and stop the animation
	     * @private
	     */
	  }, {
	    key: 'bindFocusEvents',
	    value: function bindFocusEvents() {
	      var _this6 = this;
	
	      if (!this.isInput) return;
	      this.el.addEventListener('focus', function (e) {
	        _this6.stop();
	      });
	      this.el.addEventListener('blur', function (e) {
	        if (_this6.el.value && _this6.el.value.length !== 0) {
	          return;
	        }
	        _this6.start();
	      });
	    }
	
	    /**
	     * On init, insert the cursor element
	     * @private
	     */
	  }, {
	    key: 'insertCursor',
	    value: function insertCursor() {
	      if (!this.showCursor) return;
	      if (this.cursor) return;
	      this.cursor = document.createElement('span');
	      this.cursor.className = 'typed-cursor';
	      this.cursor.innerHTML = this.cursorChar;
	      this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling);
	    }
	  }]);
	
	  return Typed;
	})();
	
	exports['default'] = Typed;
	module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _defaultsJs = __webpack_require__(2);
	
	var _defaultsJs2 = _interopRequireDefault(_defaultsJs);
	
	/**
	 * Initialize the Typed object
	 */
	
	var Initializer = (function () {
	  function Initializer() {
	    _classCallCheck(this, Initializer);
	  }
	
	  _createClass(Initializer, [{
	    key: 'load',
	
	    /**
	     * Load up defaults & options on the Typed instance
	     * @param {Typed} self instance of Typed
	     * @param {object} options options object
	     * @param {string} elementId HTML element ID _OR_ instance of HTML element
	     * @private
	     */
	
	    value: function load(self, options, elementId) {
	      // chosen element to manipulate text
	      if (typeof elementId === 'string') {
	        self.el = document.querySelector(elementId);
	      } else {
	        self.el = elementId;
	      }
	
	      self.options = _extends({}, _defaultsJs2['default'], options);
	
	      // attribute to type into
	      self.isInput = self.el.tagName.toLowerCase() === 'input';
	      self.attr = self.options.attr;
	      self.bindInputFocusEvents = self.options.bindInputFocusEvents;
	
	      // show cursor
	      self.showCursor = self.isInput ? false : self.options.showCursor;
	
	      // custom cursor
	      self.cursorChar = self.options.cursorChar;
	
	      // Is the cursor blinking
	      self.cursorBlinking = true;
	
	      // text content of element
	      self.elContent = self.attr ? self.el.getAttribute(self.attr) : self.el.textContent;
	
	      // html or plain text
	      self.contentType = self.options.contentType;
	
	      // typing speed
	      self.typeSpeed = self.options.typeSpeed;
	
	      // add a delay before typing starts
	      self.startDelay = self.options.startDelay;
	
	      // backspacing speed
	      self.backSpeed = self.options.backSpeed;
	
	      // only backspace what doesn't match the previous string
	      self.smartBackspace = self.options.smartBackspace;
	
	      // amount of time to wait before backspacing
	      self.backDelay = self.options.backDelay;
	
	      // Fade out instead of backspace
	      self.fadeOut = self.options.fadeOut;
	      self.fadeOutClass = self.options.fadeOutClass;
	      self.fadeOutDelay = self.options.fadeOutDelay;
	
	      // variable to check whether typing is currently paused
	      self.isPaused = false;
	
	      // input strings of text
	      self.strings = self.options.strings.map(function (s) {
	        return s.trim();
	      });
	
	      // div containing strings
	      if (typeof self.options.stringsElement === 'string') {
	        self.stringsElement = document.querySelector(self.options.stringsElement);
	      } else {
	        self.stringsElement = self.options.stringsElement;
	      }
	
	      if (self.stringsElement) {
	        self.strings = [];
	        self.stringsElement.style.display = 'none';
	        var strings = Array.prototype.slice.apply(self.stringsElement.children);
	        var stringsLength = strings.length;
	
	        if (stringsLength) {
	          for (var i = 0; i < stringsLength; i += 1) {
	            var stringEl = strings[i];
	            self.strings.push(stringEl.innerHTML.trim());
	          }
	        }
	      }
	
	      // character number position of current string
	      self.strPos = 0;
	
	      // current array position
	      self.arrayPos = 0;
	
	      // index of string to stop backspacing on
	      self.stopNum = 0;
	
	      // Looping logic
	      self.loop = self.options.loop;
	      self.loopCount = self.options.loopCount;
	      self.curLoop = 0;
	
	      // shuffle the strings
	      self.shuffle = self.options.shuffle;
	      // the order of strings
	      self.sequence = [];
	
	      self.pause = {
	        status: false,
	        typewrite: true,
	        curString: '',
	        curStrPos: 0
	      };
	
	      // When the typing is complete (when not looped)
	      self.typingComplete = false;
	
	      // Set the order in which the strings are typed
	      for (var i in self.strings) {
	        self.sequence[i] = i;
	      }
	
	      // If there is some text in the element
	      self.currentElContent = this.getCurrentElContent(self);
	
	      self.autoInsertCss = self.options.autoInsertCss;
	
	      this.appendAnimationCss(self);
	    }
	  }, {
	    key: 'getCurrentElContent',
	    value: function getCurrentElContent(self) {
	      var elContent = '';
	      if (self.attr) {
	        elContent = self.el.getAttribute(self.attr);
	      } else if (self.isInput) {
	        elContent = self.el.value;
	      } else if (self.contentType === 'html') {
	        elContent = self.el.innerHTML;
	      } else {
	        elContent = self.el.textContent;
	      }
	      return elContent;
	    }
	  }, {
	    key: 'appendAnimationCss',
	    value: function appendAnimationCss(self) {
	      var cssDataName = 'data-typed-js-css';
	      if (!self.autoInsertCss) {
	        return;
	      }
	      if (!self.showCursor && !self.fadeOut) {
	        return;
	      }
	      if (document.querySelector('[' + cssDataName + ']')) {
	        return;
	      }
	
	      var css = document.createElement('style');
	      css.type = 'text/css';
	      css.setAttribute(cssDataName, true);
	
	      var innerCss = '';
	      if (self.showCursor) {
	        innerCss += '\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ';
	      }
	      if (self.fadeOut) {
	        innerCss += '\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ';
	      }
	      if (css.length === 0) {
	        return;
	      }
	      css.innerHTML = innerCss;
	      document.body.appendChild(css);
	    }
	  }]);
	
	  return Initializer;
	})();
	
	exports['default'] = Initializer;
	var initializer = new Initializer();
	exports.initializer = initializer;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Defaults & options
	 * @returns {object} Typed defaults & options
	 * @public
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var defaults = {
	  /**
	   * @property {array} strings strings to be typed
	   * @property {string} stringsElement ID of element containing string children
	   */
	  strings: ['These are the default values...', 'You know what you should do?', 'Use your own!', 'Have a great day!'],
	  stringsElement: null,
	
	  /**
	   * @property {number} typeSpeed type speed in milliseconds
	   */
	  typeSpeed: 0,
	
	  /**
	   * @property {number} startDelay time before typing starts in milliseconds
	   */
	  startDelay: 0,
	
	  /**
	   * @property {number} backSpeed backspacing speed in milliseconds
	   */
	  backSpeed: 0,
	
	  /**
	   * @property {boolean} smartBackspace only backspace what doesn't match the previous string
	   */
	  smartBackspace: true,
	
	  /**
	   * @property {boolean} shuffle shuffle the strings
	   */
	  shuffle: false,
	
	  /**
	   * @property {number} backDelay time before backspacing in milliseconds
	   */
	  backDelay: 700,
	
	  /**
	   * @property {boolean} fadeOut Fade out instead of backspace
	   * @property {string} fadeOutClass css class for fade animation
	   * @property {boolean} fadeOutDelay Fade out delay in milliseconds
	   */
	  fadeOut: false,
	  fadeOutClass: 'typed-fade-out',
	  fadeOutDelay: 500,
	
	  /**
	   * @property {boolean} loop loop strings
	   * @property {number} loopCount amount of loops
	   */
	  loop: false,
	  loopCount: Infinity,
	
	  /**
	   * @property {boolean} showCursor show cursor
	   * @property {string} cursorChar character for cursor
	   * @property {boolean} autoInsertCss insert CSS for cursor and fadeOut into HTML <head>
	   */
	  showCursor: true,
	  cursorChar: '|',
	  autoInsertCss: true,
	
	  /**
	   * @property {string} attr attribute for typing
	   * Ex: input placeholder, value, or just HTML text
	   */
	  attr: null,
	
	  /**
	   * @property {boolean} bindInputFocusEvents bind to focus and blur if el is text input
	   */
	  bindInputFocusEvents: false,
	
	  /**
	   * @property {string} contentType 'html' or 'null' for plaintext
	   */
	  contentType: 'html',
	
	  /**
	   * Before it begins typing
	   * @param {Typed} self
	   */
	  onBegin: function onBegin(self) {},
	
	  /**
	   * All typing is complete
	   * @param {Typed} self
	   */
	  onComplete: function onComplete(self) {},
	
	  /**
	   * Before each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  preStringTyped: function preStringTyped(arrayPos, self) {},
	
	  /**
	   * After each string is typed
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStringTyped: function onStringTyped(arrayPos, self) {},
	
	  /**
	   * During looping, after last string is typed
	   * @param {Typed} self
	   */
	  onLastStringBackspaced: function onLastStringBackspaced(self) {},
	
	  /**
	   * Typing has been stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingPaused: function onTypingPaused(arrayPos, self) {},
	
	  /**
	   * Typing has been started after being stopped
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onTypingResumed: function onTypingResumed(arrayPos, self) {},
	
	  /**
	   * After reset
	   * @param {Typed} self
	   */
	  onReset: function onReset(self) {},
	
	  /**
	   * After stop
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStop: function onStop(arrayPos, self) {},
	
	  /**
	   * After start
	   * @param {number} arrayPos
	   * @param {Typed} self
	   */
	  onStart: function onStart(arrayPos, self) {},
	
	  /**
	   * After destroy
	   * @param {Typed} self
	   */
	  onDestroy: function onDestroy(self) {}
	};
	
	exports['default'] = defaults;
	module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * TODO: These methods can probably be combined somehow
	 * Parse HTML tags & HTML Characters
	 */
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var HTMLParser = (function () {
	  function HTMLParser() {
	    _classCallCheck(this, HTMLParser);
	  }
	
	  _createClass(HTMLParser, [{
	    key: 'typeHtmlChars',
	
	    /**
	     * Type HTML tags & HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	
	    value: function typeHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '<' || curChar === '&') {
	        var endTag = '';
	        if (curChar === '<') {
	          endTag = '>';
	        } else {
	          endTag = ';';
	        }
	        while (curString.substr(curStrPos + 1).charAt(0) !== endTag) {
	          curStrPos++;
	          if (curStrPos + 1 > curString.length) {
	            break;
	          }
	        }
	        curStrPos++;
	      }
	      return curStrPos;
	    }
	
	    /**
	     * Backspace HTML tags and HTML Characters
	     * @param {string} curString Current string
	     * @param {number} curStrPos Position in current string
	     * @param {Typed} self instance of Typed
	     * @returns {number} a new string position
	     * @private
	     */
	  }, {
	    key: 'backSpaceHtmlChars',
	    value: function backSpaceHtmlChars(curString, curStrPos, self) {
	      if (self.contentType !== 'html') return curStrPos;
	      var curChar = curString.substr(curStrPos).charAt(0);
	      if (curChar === '>' || curChar === ';') {
	        var endTag = '';
	        if (curChar === '>') {
	          endTag = '<';
	        } else {
	          endTag = '&';
	        }
	        while (curString.substr(curStrPos - 1).charAt(0) !== endTag) {
	          curStrPos--;
	          if (curStrPos < 0) {
	            break;
	          }
	        }
	        curStrPos--;
	      }
	      return curStrPos;
	    }
	  }]);
	
	  return HTMLParser;
	})();
	
	exports['default'] = HTMLParser;
	var htmlParser = new HTMLParser();
	exports.htmlParser = htmlParser;

/***/ })
/******/ ])
});
;

/***/ }),

/***/ "./src/app/_models/social-login-users.ts":
/*!***********************************************!*\
  !*** ./src/app/_models/social-login-users.ts ***!
  \***********************************************/
/*! exports provided: SocialUsers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialUsers", function() { return SocialUsers; });
var SocialUsers = /** @class */ (function () {
    function SocialUsers() {
    }
    return SocialUsers;
}());



/***/ }),

/***/ "./src/app/_services/menu.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/menu.service.ts ***!
  \*******************************************/
/*! exports provided: MenuService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuService", function() { return MenuService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");



var MenuService = /** @class */ (function () {
    function MenuService() {
        this.menuItem = [
            { name: "Home", title: "Home", type: "link", path: "/home" },
            { name: "About Us", title: "About Us", type: "link", path: "/service/mobile-developement" },
            { name: "Our process", title: "Our process", type: "link", path: "/about-us" },
            { name: "Service", title: "Service", type: "sub",
                children: [
                    { name: "Mobile Development", title: "Mobile Development", path: "/about-us" },
                    { name: "Web Development", title: "Web Development", path: "/about-us" },
                    { name: "Product Strategy", title: "Product Strategy", path: "/about-us" },
                    { name: "Digital Marketing", title: "Digital Marketing", path: "/about-us" }
                ]
            },
            { name: "Our Work", title: "Our Work", type: "link", path: "/about-us" },
            { name: "Resources", title: "Resources", type: "sub",
                children: [
                    { name: "Blog", title: "Blog", path: "/blog" },
                    { name: "Blog", title: "Blog", path: "/blog" },
                    { name: "Blog", title: "Blog", path: "/blog" }
                ]
            },
            { name: "contact us", title: "contact us", type: "link", path: "/about-us" },
        ];
        this.footerMenuItem = [
            { name: "Privacy Policy", title: "Privacy Policy", type: "link" },
            { name: "Support", title: "Support", type: "link" },
            { name: "Contact", title: "Contact", type: "link" },
            { name: "About", title: "About", type: "link" },
            { name: "Terms", title: "Terms", type: "link" },
            { name: "category", title: "category", type: "link" }
        ];
        this.socialMedia = [
            { mediaLink: "https://www.facebook.com/dezigndia", iconPath: "assets/img/footer/facebook-letter-logo.svg", alt: "Dezigndia Facebook" },
            { mediaLink: "https://www.youtube.com/channel/UCaebOX_04Pwfd5_wwXJETuw", iconPath: "assets/img/footer/youtube.svg", alt: "Dezigndia Youtube" },
            { mediaLink: "https://www.instagram.com/dezigndia", iconPath: "assets/img/footer/instagram.svg", alt: "Dezigndia Instagram" },
            { mediaLink: "https://in.linkedin.com/company/dezigndia", iconPath: "assets/img/footer/linkedin-logo.svg", alt: "Dezigndia Instagram" },
            { mediaLink: "https://www.pinterest.com/dezigndiadesigns", iconPath: "assets/img/footer/pintrest-logo.png", alt: "Dezigndia Pinterest" },
            { mediaLink: "https://twitter.com/dezigndia", iconPath: "assets/img/footer/twitter.png", alt: "Dezigndia Twitter" },
        ];
    }
    MenuService.prototype.getMenuItems = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.menuItem);
    };
    MenuService.prototype.getFooterMenuItems = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.footerMenuItem);
    };
    MenuService.prototype.getSocialMedia = function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(this.socialMedia);
    };
    MenuService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MenuService);
    return MenuService;
}());



/***/ }),

/***/ "./src/app/_services/social-login.service.ts":
/*!***************************************************!*\
  !*** ./src/app/_services/social-login.service.ts ***!
  \***************************************************/
/*! exports provided: SocialLoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialLoginService", function() { return SocialLoginService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _http_method_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http-method.service */ "./src/app/_services/http-method.service.ts");



var SocialLoginService = /** @class */ (function () {
    function SocialLoginService(_http) {
        this._http = _http;
    }
    SocialLoginService.prototype.saveRepsonse = function (response) {
        var url = 'http://localhost:64726/Api/Login/Savesresponse';
        return this._http._postCall(url, response);
    };
    SocialLoginService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: "root"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_http_method_service__WEBPACK_IMPORTED_MODULE_2__["HttpMethodsService"]])
    ], SocialLoginService);
    return SocialLoginService;
}());



/***/ }),

/***/ "./src/app/layout/weblayout/footer/footer.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/weblayout/footer/footer.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"blue-strip\" class=\"wow fadeIn\" style=\"visibility: visible; animation-name: fadeIn;\">\n    <div class=\"container\">\n        <div class=\"blue-strip-heading\n            text-center\">\n            <p>A Future-proof, intuitive design, with better engineering</p>\n        </div>\n        <div class=\"discuss-project-btn\n            text-center\">\n            <button class=\"discuss-a-project\n                solid-btn\n                solid-white-btn\n                button-shadow drift-open-chat\">Talk to an Expert\n                </button>\n        </div>\n    </div>\n</div>\n<footer class=\"_dezfooter\">\n    <div class=\"eb-footer\">\n        <div class=\"footer-top container\">\n            <div class=\"row\" style=\"margin-bottom:10px\">\n\n                <!--Our Services-->\n                <div class=\"list-section col-lg-3 col-md-6 col-sm-6\">\n                    <p class=\"footer-list-heading\">Latest Technologies</p>\n                    <ul class=\"footer-list\">\n                        <li><a href=\"#\"> Scalable Angular Application</a></li>\n                        <li><a href=\"#\"> Flexible Android Development</a></li>\n                        <li><a href=\"#\"> Fastest React Development</a></li>\n                        <li><a href=\"#\"> React Native Development</a></li>\n                        <li><a href=\"#\"> Efficient Flutter Development</a></li>\n                        <li><a href=\"#\"> Scalable NodeJs Development</a></li>\n                        <li><a href=\"#\"> Data Science with Python</a></li>\n                        <li><a href=\"#\"> Social Networking with PHP</a></li>\n                        <li><a href=\"#\"> Power of MEAN & MERN Stack</a></li>\n                        <li><a href=\"#\"> Secured Full Stack with JAVA</a></li>\n                       \n                    </ul>\n                </div>\n                <div class=\"list-section col-lg-3 col-md-6 col-sm-6\">\n                    <p class=\"footer-list-heading\">Software Solutions</p>\n                    <ul class=\"footer-list\">\n                            <li><a href=\"#\"> Customized CRM Portals</a></li>\n                            <li><a href=\"#\"> CMS using WordPress</a></li>\n                            <li><a href=\"#\"> Power of Blockchain</a></li>\n                            <li><a href=\"#\"> Recognition using ML</a></li>\n                            <li><a href=\"#\"> IOT platforms in NodeJs</a></li>\n                            <li><a href=\"#\"> Sales Dashboard in Angular</a></li>\n                            <li><a href=\"#\"> Project Management in PHP</a></li>\n                            <li><a href=\"#\"> Order Delivery Android App</a></li>\n                            <li><a href=\"#\"> Ride Sharing IOS App</a></li>\n                            <li><a href=\"#\"> Automation using AI</a></li>\n                    </ul>\n                </div>\n                <!--Our Products-->\n                <div class=\"list-section col-lg-3 col-md-6 col-sm-6\">\n                    <p class=\"footer-list-heading\">Industries Experience</p>\n                    <ul class=\"footer-list \">\n                        <li>SAAS Product Solutions</li>\n                        <li>Banking &amp; Finance</li>\n                        <li>Restaurant &amp; Hotels</li>\n                        <li>Booking &amp; Delivery</li>\n                        <li>LMS &amp; eLearning</li>\n                        <li>eCommerce &amp; Logistics</li>\n                        <li>Ride Saring &amp; Carpool</li>\n                        <li>Travel &amp; Tourism</li>\n                    </ul>\n                </div>\n\n                <!--Our Events-->\n               \n                <!--Contact Us-->\n                <div class=\"list-section contact-us col-lg-3 col-md-6 col-sm-12\">\n                    <div class=\"contact-us-wrapper\">\n                        <p class=\"footer-list-heading\">Contact Us</p>\n                        <p class=\"contact-info\">\n                            <span class=\"contact-title\">Reach Us:</span>\n                            <a class=\"contact-link\" href=\"tel:+91-9123074815\">\n                                <span>India: </span> +91-9123074815\n                            </a>\n                            <a class=\"contact-link\" href=\"tel:+91-9128619133\">\n                                <span>India: </span> +91-9128619133\n                            </a>\n                        </p>\n                        <p class=\"contact-info\">\n                          <span class=\"contact-title\">For Business: </span>\n                          <a class=\"contact-link\" href=\"mailto:connect@dezigndia.com\">connect@dezigndia.com</a>\n                        </p>\n                        <p class=\"contact-info\">\n                          <span class=\"contact-title\">Office:</span>\n                          <span>Raheja Estate, Kulupwadi, Borivali East, Mumbai - 400066</span>\n                        </p>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"social_media_wrapper social-media-spacing container\">\n            <!--Icons-->\n\n\n            <!--Social Media Icons-->\n            <div class=\"social-media-icons\" style=\"margin-bottom:10px\">\n                <a href=\"{{social.mediaLink}}\" target=\"_blank\" rel=\"nofollow\" *ngFor=\"let social of socialMedia\"> \n                    <span data-wow-duration=\"1.5s\" data-wow-delay=\"0.5s\" class=\"icon-wrapper mr-2\">\n                        <img src=\"{{social.iconPath}}\" alt=\"{{social.alt}}\">\n                    </span>\n                </a>\n            </div>\n        </div>\n        <!-- <div class=\"footer-divider\"> -->\n\n    </div>\n    <div class=\"footer-bottom container\">\n        <div class=\"flex-wrapper\">\n            <div class=\"copyright\">\n                <p>Copyrights © 2020 Dezigndia | Crafted with Love ♡</p>\n            </div>\n            <div class=\"footer-menu\">\n                <ul class=\"footer-menu-list\">\n                    <li><a href=\"#\">Privacy Policy</a></li>\n                    <li><a href=\"#\">Terms & Conditions</a></li>\n                    <li><a href=\"#\">Our Works</a></li>\n                    <li><a href=\"#\">Our Process</a></li>\n                    <li><a href=\"#\">Blog</a></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</footer>"

/***/ }),

/***/ "./src/app/layout/weblayout/footer/footer.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/weblayout/footer/footer.component.ts ***!
  \*************************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _services_menu_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_services/menu.service */ "./src/app/_services/menu.service.ts");




var FooterComponent = /** @class */ (function () {
    function FooterComponent(_menuService) {
        this._menuService = _menuService;
    }
    FooterComponent.prototype.ngOnInit = function () {
        this.getMenuItems();
    };
    FooterComponent.prototype.getMenuItems = function () {
        var _this = this;
        var footerMenu = this._menuService.getFooterMenuItems();
        var socialMedia = this._menuService.getSocialMedia();
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])([footerMenu, socialMedia]).subscribe(function (result) {
            _this.footerMenuItems = result[0];
            _this.socialMedia = result[1];
        }, function (error) {
        });
    };
    FooterComponent.prototype.checkMail = function () {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(this.email);
        if (re.test(this.email)) {
            console.log("valid");
        }
        else {
            console.log("invalid");
        }
        // console.log(this.email);
    };
    FooterComponent.prototype.onSubscribe = function (email) {
        console.log(email);
    };
    FooterComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-web-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/layout/weblayout/footer/footer.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_menu_service__WEBPACK_IMPORTED_MODULE_3__["MenuService"]])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/layout/weblayout/header/header.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/weblayout/header/header.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".w-200 {\n    width: 200px !important;\n}\nul.sub-dropdown.sublevel-menu {\n    left: 12em;\n}\nul.sub-dropdown.sublevel-menu::after {\n    position: absolute;\n    left: -17%;\n    top: 20px;\n    width: 0;\n    height: 0;\n    content: '';\n    border-left: 10px solid transparent;\n    border-right: 10px solid transparent;\n    border-bottom: 10px solid #ffffff;\n    -webkit-transform: rotate(-90deg);\n            transform: rotate(-90deg);\n    display: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3dlYmxheW91dC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx1QkFBdUI7QUFDM0I7QUFDQTtJQUNJLFVBQVU7QUFDZDtBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLFVBQVU7SUFDVixTQUFTO0lBQ1QsUUFBUTtJQUNSLFNBQVM7SUFDVCxXQUFXO0lBQ1gsbUNBQW1DO0lBQ25DLG9DQUFvQztJQUNwQyxpQ0FBaUM7SUFDakMsaUNBQXlCO1lBQXpCLHlCQUF5QjtJQUN6QixhQUFhO0FBQ2pCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3dlYmxheW91dC9oZWFkZXIvaGVhZGVyLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudy0yMDAge1xuICAgIHdpZHRoOiAyMDBweCAhaW1wb3J0YW50O1xufVxudWwuc3ViLWRyb3Bkb3duLnN1YmxldmVsLW1lbnUge1xuICAgIGxlZnQ6IDEyZW07XG59XG5cbnVsLnN1Yi1kcm9wZG93bi5zdWJsZXZlbC1tZW51OjphZnRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IC0xNyU7XG4gICAgdG9wOiAyMHB4O1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICBjb250ZW50OiAnJztcbiAgICBib3JkZXItbGVmdDogMTBweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItcmlnaHQ6IDEwcHggc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCAjZmZmZmZmO1xuICAgIHRyYW5zZm9ybTogcm90YXRlKC05MGRlZyk7XG4gICAgZGlzcGxheTogbm9uZTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/weblayout/header/header.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/weblayout/header/header.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"gradient-wrapper home-header\">\n<!--Navbar: START-->\n  <nav id=\"navbar-main\" class=\"navbar fixed-top navbar-expand-lg animated\">\n      <div class=\"container\">\n          <!--Navbar Brand Image-->\n          <a class=\"navbar-brand\" href=\"/\">\n            <img src=\"assets/img/logo/dezWhi.png\" class=\"img-responsive _logo\" *ngIf=\"_hide\">\n            <img src=\"assets/img/logo/DezPurpleNn.png\" class=\"img-responsive _logo1\" *ngIf=\"!_hide\">\n          </a>\n          <button class=\"navbar-toggler collapsed\" type=\"button\" id=\"navbar-toggle-button\" (click)=\"toggleMenu()\">\n                  <span class=\"icon-bar top-bar\"></span>\n                  <span class=\"icon-bar middle-bar\"></span>\n                  <span class=\"icon-bar bottom-bar\"></span>\n              </button>\n          <div class=\"collapse navbar-collapse mCustomScrollbar _mCS_1 mCS-autoHide mCS_no_scrollbar\" id=\"navbarNav\"><div id=\"mCSB_1\" class=\"mCustomScrollBox mCS-minimal mCSB_vertical mCSB_outside\" tabindex=\"0\"><div id=\"mCSB_1_container\" class=\"mCSB_container mCS_y_hidden mCS_no_scrollbar_y\" dir=\"ltr\">\n              <ul class=\"navbar-nav ml-auto\">\n                <ng-container *ngFor=\"let menu of menuItems\">\n                    <li class=\"nav-item active\" *ngIf=\"menu.type=='link'\">\n                        <a class=\"nav-link\" [routerLink]=\"[menu.path]\" *ngIf= \"menu.name != 'contact us'\">{{menu.name | uppercase}}\n                            <span class=\"sr-only\">(current)</span></a>\n                        <a class=\"nav-link\" [routerLink]=\"[menu.path]\" *ngIf= \"menu?.name == 'contact us'\" data-toggle=\"modal\" data-target=\"#exampleModal\">{{menu.name | uppercase}}\n                        <span class=\"sr-only\">(current)</span></a>\n                        <modal-box></modal-box>\n                    </li>\n                    <li class=\"nav-item active dropdown-link\" *ngIf=\"menu.type=='sub'\">\n                        <a class=\"nav-link\">{{menu.name | uppercase}}<i class=\"fa fa-angle-down\" aria-hidden=\"true\"></i></a> \n                        <ul class=\"sub-dropdown w-200\">\n                             <li class=\"nav-item\" *ngFor=\"let child of menu.children\">\n                                <a class=\"nav-link\" (hover)=\"onHover()\" style=\"color: rgb(255, 255, 255);\">{{child.name}}</a>\n                            </li>\n                        </ul>\n                    </li>\n                </ng-container>\n                  <li>\n                      <button  class=\"btn button start-a-project-button drift-open-chat\">Talk to an Expert</button>\n                  </li>\n              </ul>\n          </div></div><div id=\"mCSB_1_scrollbar_vertical\" class=\"mCSB_scrollTools mCSB_1_scrollbar mCS-minimal mCSB_scrollTools_vertical\"><div class=\"mCSB_draggerContainer\"><div id=\"mCSB_1_dragger_vertical\" class=\"mCSB_dragger\"><div class=\"mCSB_dragger_bar\" style=\"line-height: 50px;\"></div></div><div class=\"mCSB_draggerRail\"></div></div></div></div>\n      </div>\n  </nav>\n  <section class=\"header home-header\" id=\"_dzheader\">\n        <div class=\"row\">\n           <div class=\"content-wrapper-relative\n              header-content col-lg-12\">\n              <div class=\"header-text padding-top-50 col-lg-7 _banner\">\n                 <p class=\"header-heading animated fadeInDown slow ft-600\"><b>Building Dreams for 100+ Startups</b><br> Best Digital Innovation &amp; Experience <br></p>\n                 <p class=\"header-heading animated fadeInDown slow ft-600 _dezcursive\"><b>We craft beautiful, scalable products</b><br> with loads of Coffee, Beer &amp; Creativity <br>for better Tomorrow! <br></p>\n                 <p style=\"font-size: 30px;\">We're awesome @ <strong class=\"_deztite\"></strong></p>\n                 <a class=\"no-link-style\" href=\"case-studies.html\"><button class=\"view-case-studies-btn\n                    hollow-white-btn\n                    button-shadow animated\n                    fadeInDown slow\">View All Case Studies </button></a>\n              </div>\n\n              <div class=\"header-text col-lg-7 _banner _bannertwo\">\n                    <p class=\"header-heading animated fadeInDown slow ft-600 _dezcursive\"><b>We craft beautiful, scalable products</b><br> with loads of Coffee, Beer &amp; Creativity <br>for better Tomorrow! <br></p>\n                 </div>\n\n              <div class=\"symbols-pulse active\">\n                 <div class=\"pulse-x\"></div>\n              </div>\n           </div>\n        </div>\n     </section>\n  </div>\n  <!--Navbar: END-->"

/***/ }),

/***/ "./src/app/layout/weblayout/header/header.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/weblayout/header/header.component.ts ***!
  \*************************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var angularx_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! angularx-social-login */ "./node_modules/angularx-social-login/angularx-social-login.es5.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_modal_box_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/modal-box/modal.component */ "./src/app/components/modal-box/modal.component.ts");
/* harmony import */ var _models_social_login_users__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_models/social-login-users */ "./src/app/_models/social-login-users.ts");
/* harmony import */ var _services_http_method_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../_services/http-method.service */ "./src/app/_services/http-method.service.ts");
/* harmony import */ var _services_auth_cookie_handler_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../_services/auth-cookie-handler.service */ "./src/app/_services/auth-cookie-handler.service.ts");
/* harmony import */ var _services_social_login_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../_services/social-login.service */ "./src/app/_services/social-login.service.ts");
/* harmony import */ var _services_menu_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../_services/menu.service */ "./src/app/_services/menu.service.ts");
/* harmony import */ var _services_change_header_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../_services/change-header.service */ "./src/app/_services/change-header.service.ts");












var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(_http, _authCookieService, _oAuthService, _socialLoginService, _menuService, _chnageHeader) {
        this._http = _http;
        this._authCookieService = _authCookieService;
        this._oAuthService = _oAuthService;
        this._socialLoginService = _socialLoginService;
        this._menuService = _menuService;
        this._chnageHeader = _chnageHeader;
        this.socialUser = new _models_social_login_users__WEBPACK_IMPORTED_MODULE_6__["SocialUsers"]();
        this._hide = true;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        this.loadTypewriter();
        this.getMenuItems();
        this.onScrollCompressMenu();
        // if(this._authCookieService._checkCookie())
        //     console.log(this._authCookieService._getCookie());
        // else
        //     this._authCookieService._setCookie("setcookietest");
        // this._http._getCall('http://dummy.restapiexample.com/api/v1/employees').subscribe(data => {
        //     console.log(data);
        // }, err => {
        //     console.error(err);
        // });
    };
    HeaderComponent.prototype.ngAfterViewInit = function () {
        // this.modalComponent.contactForm.setParent();
    };
    HeaderComponent.prototype.loadTypewriter = function () {
        var options = {
            strings: ["DESIGN", "DEVELOPMENT", "MARKETING"],
            typeSpeed: 30,
            backSpeed: 100,
            showCursor: true,
            cursorChar: '|',
            loop: true
        };
        var typed = new typed_js__WEBPACK_IMPORTED_MODULE_4___default.a('._deztite', options);
    };
    HeaderComponent.prototype.getMenuItems = function () {
        var _this = this;
        this._menuService.getMenuItems().subscribe(function (data) {
            _this.menuItems = data;
        }, function (error) {
        });
    };
    HeaderComponent.prototype.onScrollCompressMenu = function () {
        var _this = this;
        jquery__WEBPACK_IMPORTED_MODULE_3__(window).scroll(function () {
            if (jquery__WEBPACK_IMPORTED_MODULE_3__(window).scrollTop() >= 10) {
                jquery__WEBPACK_IMPORTED_MODULE_3__('#navbar-main').addClass("scroll");
                jquery__WEBPACK_IMPORTED_MODULE_3__('#navbar-main').css("background", "#fff");
                jquery__WEBPACK_IMPORTED_MODULE_3__('.navbar-nav .nav-link').css('color', '#000');
                _this._hide = false;
                jquery__WEBPACK_IMPORTED_MODULE_3__('.navbar-nav .start-a-project-button').addClass('active');
            }
            else {
                jquery__WEBPACK_IMPORTED_MODULE_3__('#navbar-main').removeClass("scroll");
                jquery__WEBPACK_IMPORTED_MODULE_3__('#navbar-main').css("background", "transparent");
                jquery__WEBPACK_IMPORTED_MODULE_3__('.navbar-nav .nav-link').css('color', '#fff');
                _this._hide = true;
                jquery__WEBPACK_IMPORTED_MODULE_3__('.navbar-nav .start-a-project-button').removeClass('active');
            }
        });
    };
    HeaderComponent.prototype.onSocialSignIn = function (socialProvider) {
        var _this = this;
        var socialPlatformProvider;
        if (socialPlatformProvider == 'google') {
            socialPlatformProvider = angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["GoogleLoginProvider"].PROVIDER_ID;
        }
        else if (socialPlatformProvider == 'facebook') {
            socialPlatformProvider = angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["FacebookLoginProvider"].PROVIDER_ID;
        }
        this._oAuthService.signIn(socialPlatformProvider).then(function (socialUser) {
            console.log(socialProvider, socialUser);
            _this.saveresponse(socialUser);
        });
    };
    HeaderComponent.prototype.saveresponse = function (socialUsers) {
        this._socialLoginService.saveRepsonse(socialUsers).subscribe(function (socialuserdata) {
            console.log(socialuserdata);
        }, function (error) {
            console.log(error, "error");
        });
    };
    HeaderComponent.prototype.toggleMenu = function () {
        if (jquery__WEBPACK_IMPORTED_MODULE_3__('#navbarNav').hasClass('active')) {
            jquery__WEBPACK_IMPORTED_MODULE_3__('#navbarNav').removeClass('active show');
            jquery__WEBPACK_IMPORTED_MODULE_3__('#navbar-toggle-button').addClass('collapsed');
            jquery__WEBPACK_IMPORTED_MODULE_3__('#mCSB_1').css('margin-top', '20%');
        }
        else {
            jquery__WEBPACK_IMPORTED_MODULE_3__('#navbarNav').addClass('active show');
            jquery__WEBPACK_IMPORTED_MODULE_3__('#navbar-toggle-button').removeClass('collapsed');
            jquery__WEBPACK_IMPORTED_MODULE_3__('#mCSB_1').removeAttr('margin-top');
        }
    };
    HeaderComponent.prototype.onHover = function () {
        jquery__WEBPACK_IMPORTED_MODULE_3__();
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('search'),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
    ], HeaderComponent.prototype, "search", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])(_components_modal_box_modal_component__WEBPACK_IMPORTED_MODULE_5__["ModalComponent"]),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _components_modal_box_modal_component__WEBPACK_IMPORTED_MODULE_5__["ModalComponent"])
    ], HeaderComponent.prototype, "modalComponent", void 0);
    HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-web-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/layout/weblayout/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/layout/weblayout/header/header.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_http_method_service__WEBPACK_IMPORTED_MODULE_7__["HttpMethodsService"],
            _services_auth_cookie_handler_service__WEBPACK_IMPORTED_MODULE_8__["AuthCookieHandlerService"],
            angularx_social_login__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
            _services_social_login_service__WEBPACK_IMPORTED_MODULE_9__["SocialLoginService"],
            _services_menu_service__WEBPACK_IMPORTED_MODULE_10__["MenuService"],
            _services_change_header_service__WEBPACK_IMPORTED_MODULE_11__["ChangeHeaderService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/layout/weblayout/menu/menu-bar.component.css":
/*!**************************************************************!*\
  !*** ./src/app/layout/weblayout/menu/menu-bar.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC93ZWJsYXlvdXQvbWVudS9tZW51LWJhci5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/weblayout/menu/menu-bar.component.html":
/*!***************************************************************!*\
  !*** ./src/app/layout/weblayout/menu/menu-bar.component.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"collapse navbar-collapse\" id=\"navbar-collapse\">\n    <ul id=\"menu\" class=\"menu navbar-nav mx-auto\">\n        <li class=\"nav-item dropdown\" *ngFor=\"let menu of menuItems\">\n            <a *ngIf=\"menu.type=='link'\" href=\"{{menu?.link}}\" class=\"nav-link\">{{menu?.title}}</a>\n            <ng-container *ngIf=\"menu.type=='sub'\">\n                <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\" (mouseenter)=\"show=1;\" (mouseout)=\"show=0;\">{{menu?.title}}</a>\n                <div [ngClass]=\"{'show': show==1}\" class=\"dropdown-menu\" aria-labelledby=\"navbarDropdown\">\n                    <a *ngFor=\"let child of menu.children\" class=\"dropdown-item\" href=\"{{child.path}}\">{{child.title}}</a>\n                </div>\n            </ng-container>\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "./src/app/layout/weblayout/menu/menu-bar.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/layout/weblayout/menu/menu-bar.component.ts ***!
  \*************************************************************/
/*! exports provided: MenuBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuBarComponent", function() { return MenuBarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var MenuBarComponent = /** @class */ (function () {
    function MenuBarComponent() {
        this.show = 0;
    }
    MenuBarComponent.prototype.ngOnInit = function () {
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], MenuBarComponent.prototype, "menuItems", void 0);
    MenuBarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-menu',
            template: __webpack_require__(/*! ./menu-bar.component.html */ "./src/app/layout/weblayout/menu/menu-bar.component.html"),
            styles: [__webpack_require__(/*! ./menu-bar.component.css */ "./src/app/layout/weblayout/menu/menu-bar.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], MenuBarComponent);
    return MenuBarComponent;
}());



/***/ }),

/***/ "./src/app/layout/weblayout/webalyout.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/weblayout/webalyout.module.ts ***!
  \******************************************************/
/*! exports provided: WebLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebLayoutModule", function() { return WebLayoutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _weblayout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./weblayout.component */ "./src/app/layout/weblayout/weblayout.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./header/header.component */ "./src/app/layout/weblayout/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/layout/weblayout/footer/footer.component.ts");
/* harmony import */ var _menu_menu_bar_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./menu/menu-bar.component */ "./src/app/layout/weblayout/menu/menu-bar.component.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../components/components.module */ "./src/app/components/components.module.ts");










var WebLayoutModule = /** @class */ (function () {
    function WebLayoutModule() {
    }
    WebLayoutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _weblayout_component__WEBPACK_IMPORTED_MODULE_5__["WebLayoutComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"],
                _menu_menu_bar_component__WEBPACK_IMPORTED_MODULE_8__["MenuBarComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_9__["ComponentModule"]
            ],
            exports: [
                _weblayout_component__WEBPACK_IMPORTED_MODULE_5__["WebLayoutComponent"],
                _header_header_component__WEBPACK_IMPORTED_MODULE_6__["HeaderComponent"],
                _footer_footer_component__WEBPACK_IMPORTED_MODULE_7__["FooterComponent"],
                _menu_menu_bar_component__WEBPACK_IMPORTED_MODULE_8__["MenuBarComponent"]
            ],
            providers: []
        })
    ], WebLayoutModule);
    return WebLayoutModule;
}());



/***/ }),

/***/ "./src/app/layout/weblayout/weblayout.component.html":
/*!***********************************************************!*\
  !*** ./src/app/layout/weblayout/weblayout.component.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"site-wrap\">\n    <app-web-header></app-web-header>\n        <router-outlet></router-outlet>\n    <app-web-footer></app-web-footer>\n</div>"

/***/ }),

/***/ "./src/app/layout/weblayout/weblayout.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/layout/weblayout/weblayout.component.ts ***!
  \*********************************************************/
/*! exports provided: WebLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebLayoutComponent", function() { return WebLayoutComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var WebLayoutComponent = /** @class */ (function () {
    function WebLayoutComponent() {
    }
    WebLayoutComponent.prototype.ngOnInit = function () {
    };
    WebLayoutComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-web-layout',
            template: __webpack_require__(/*! ./weblayout.component.html */ "./src/app/layout/weblayout/weblayout.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], WebLayoutComponent);
    return WebLayoutComponent;
}());



/***/ }),

/***/ "./src/app/site/home/experience/experience.component.html":
/*!****************************************************************!*\
  !*** ./src/app/site/home/experience/experience.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"experience-Dezigndia\">\n        <!--Blue Strip Header-->\n        <div class=\"experience-header-wrapper\">\n            <p class=\"section-heading\n               wow\n               fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                About Dezigndia\n            </p>\n            <p class=\"section-subheading\n               wow\n               fadeInUp\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">We're smart and we like it that way. It gives us the ability to deliver projects quickly, and dedicate extraordinary attention to your assignment. We're smart and we like it that way. It gives us the ability to deliver projects quickly, and dedicate extraordinary attention to your assignment. We're smart and we like it that way. It gives us the ability to deliver projects quickly, and dedicate extraordinary attention to your assignment.\n            </p>\n        </div>\n        <div class=\"experience-content\n            container\">\n            <div class=\"main-head\n                     mb-30\">\n                        <h1 class=\"para-main-head\n                        wow\n                        fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                            More than 9 years experience in the IT industry\n                        </h1>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-12 col-md-12 col-sm-12 text-mobile-center _dezexp\">\n                    <div class=\"col-lg-6 col-md-12 col-sm-12 text-mobile-center _dezexp\">\n                \n                    <div class=\"experience-section\n                     mb-30\">\n                        <h4 class=\"para-head\n                        wow\n                        fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                            First choice of CEOs &amp; Managers\n                        </h4>\n                        <p class=\"para-text\n                        wow\n                        fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                            90% of our customers are fast movers, We are flexible, quick to support and quality is one the best in India. In the years 2018 and 2019, the only service company whose product got selected in Y-Combinator.\n                        </p>\n                    </div>\n                    <div class=\"experience-section\n                     mb-30\">\n                        <h4 class=\"para-head\n                        wow\n                        fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                            We design beautiful &amp; Intuitive products\n                        </h4>\n                        <p class=\"para-text\n                        wow\n                        fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                            Making an app look beautiful takes a lot of work. But making that beautiful app intuitive and work faster is an art. We strongly believe that a seamless user-experience is an important element of design. We deliver an intelligent user experience which\n                            can truly help you grow your business.\n                        </p>\n                    </div>\n\n                    </div>\n                    <div class=\"col-lg-6 col-md-12 col-sm-12 text-mobile-center\">\n                        <div class=\"experience-section\n                        mb-30\">\n                            <h4 class=\"para-head\n                            wow\n                            fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                                Nearly-zero downtime\n                            </h4>\n                            <p class=\"para-text\n                            wow\n                            fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                                All future upgrades and maintenance procedures will take place seamlessly without any downtime whatsoever.\n                            </p>\n                        </div>\n                        <div class=\"experience-section\n                        mb-30\">\n                            <h4 class=\"para-head\n                            wow\n                            fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                                Faster feature development\n                            </h4>\n                            <p class=\"para-text\n                            wow\n                            fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                                Our modular architecture allows fast development and you can expect to see more features more frequently. You say it, we’ll build it!\n                            </p>\n                        </div>\n                        <div class=\"experience-section\n                                            mb-30\">\n                            <h4 class=\"para-head\n                                                wow\n                                                fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                                Infinitely scalable\n                            </h4>\n                            <p class=\"para-text\n                                                wow\n                                                fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                                Our system can handle any number of users now and has the potential to grow with you. If your business becomes an overnight success, Tech will still not have an issue handling your users.\n                            </p>\n                        </div>\n\n                    </div>  \n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/site/home/experience/experience.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/site/home/experience/experience.component.ts ***!
  \**************************************************************/
/*! exports provided: ExperienceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExperienceComponent", function() { return ExperienceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ExperienceComponent = /** @class */ (function () {
    function ExperienceComponent() {
    }
    ExperienceComponent.prototype.ngOnInit = function () {
    };
    ExperienceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-experience',
            template: __webpack_require__(/*! ./experience.component.html */ "./src/app/site/home/experience/experience.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ExperienceComponent);
    return ExperienceComponent;
}());



/***/ }),

/***/ "./src/app/site/home/home.component.html":
/*!***********************************************!*\
  !*** ./src/app/site/home/home.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-services></app-services>\n<app-portfolio></app-portfolio>\n<app-testimonial></app-testimonial>\n<app-experience></app-experience>"

/***/ }),

/***/ "./src/app/site/home/home.component.ts":
/*!*********************************************!*\
  !*** ./src/app/site/home/home.component.ts ***!
  \*********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_change_header_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../_services/change-header.service */ "./src/app/_services/change-header.service.ts");



var HomeComponent = /** @class */ (function () {
    function HomeComponent(_chnageHeader) {
        this._chnageHeader = _chnageHeader;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this._chnageHeader._changeBannerContent();
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/site/home/home.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_change_header_service__WEBPACK_IMPORTED_MODULE_2__["ChangeHeaderService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/site/home/homepage-banner/homepage-banner.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/site/home/homepage-banner/homepage-banner.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"gradient-wrapper home-header\">\n        <section class=\"header home-header\">\n           <div class=\"row\">\n              <div class=\"content-wrapper-relative\n                 header-content col-lg-12\">\n                 <div class=\"header-text padding-top-50 col-lg-7\" style=\"\n                    padding: 0px 0px 0px 150px;\n                    \">\n                    <p class=\"header-heading animated fadeInDown slow ft-600\"><b style=\"font-size: 38px;\">Building Dreams for 100+ Startups</b><br> Best Digital Innovation &amp; Experience <br></p>\n                    <p class=\"header-heading animated fadeInDown slow ft-600 _dezcursive\"><b>We craft beautiful, scalable products</b><br> with loads of Coffee, Beer &amp; Creativity <br>for better Tomorrow! <br></p>\n                    <p style=\"font-size: 30px;\">We're awesome @ <strong class=\"_deztite\"></strong></p>\n                    <a class=\"no-link-style\" href=\"case-studies.html\"><button class=\"view-case-studies-btn\n                       hollow-white-btn\n                       button-shadow animated\n                       fadeInDown slow\">View All Case Studies </button></a>\n                 </div>\n                 <div class=\"symbols-pulse active\">\n                    <div class=\"pulse-x\"></div>\n                 </div>\n              </div>\n           </div>\n        </section>\n     </div>"

/***/ }),

/***/ "./src/app/site/home/homepage-banner/homepage-banner.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/site/home/homepage-banner/homepage-banner.component.ts ***!
  \************************************************************************/
/*! exports provided: HomePageBannerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageBannerComponent", function() { return HomePageBannerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typed.js */ "./node_modules/typed.js/lib/typed.js");
/* harmony import */ var typed_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typed_js__WEBPACK_IMPORTED_MODULE_2__);



var HomePageBannerComponent = /** @class */ (function () {
    function HomePageBannerComponent() {
    }
    HomePageBannerComponent.prototype.ngOnInit = function () {
        var options = {
            strings: ["DESIGN", "DEVELOPMENT", "MARKETING"],
            typeSpeed: 30,
            backSpeed: 100,
            showCursor: true,
            cursorChar: '|',
            loop: true
        };
        var typed = new typed_js__WEBPACK_IMPORTED_MODULE_2___default.a('._deztite', options);
    };
    HomePageBannerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-homepage-banner',
            template: __webpack_require__(/*! ./homepage-banner.component.html */ "./src/app/site/home/homepage-banner/homepage-banner.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], HomePageBannerComponent);
    return HomePageBannerComponent;
}());



/***/ }),

/***/ "./src/app/site/home/portfolio/portfolio.component.html":
/*!**************************************************************!*\
  !*** ./src/app/site/home/portfolio/portfolio.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"portfolio\n         mt-100\">\n        <div class=\"section-header\">\n            <p class=\"section-heading\n               wow\n               fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                Product Journeys That Are Close to Our Heart\n            </p>\n            <p class=\"section-subheading\n               wow\n               fadeInUp\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">Samsung. Tata Steel. BYJU’s. It could be you next.\n            </p>\n        </div>\n        <!--Custom Carousel for Portfolio: START-->\n        <div class=\"portfolio\n            custom-carousel\n            wow\n            fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.4s\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.4s; animation-name: fadeIn;\">\n            <div class=\"carosuel-container\n               row\n               no-gutters\">\n                <!--Carousel Items-->\n                <div class=\"carousel-items\n                  col-lg-12\n                  col-md-12\n                  col-sm-12\">\n                    <div id=\"case-studies-carousel\" class=\"owl-carousel owl-loaded owl-drag\">\n                        <!--Item 1-->\n                        \n\n                        <!--Item 2-->\n                        \n\n                        <!--Item 3-->\n                        <!-- <div class=\"item\">\n                            <div class=\"portfolio-item\">\n                                <div class=\"portfolio-block\n                                        thrillopolia-block\">\n                                    <div class=\"card_wrapper\">\n                                        <div class=\"content\">\n                                            <h3 class=\"heading\n                                                pl-40\">\n                                                Thrillophilia\n                                            </h3>\n                                            <h4 class=\"sub-heading\n                                                pl-40\">\n                                                World’s Best Travel Experiences.\n                                            </h4>\n                                            <ul class=\"item_list\n                                                pl-40\">\n                                                <li>Explore 10000+ travel experiences in 25+ countries\n                                                </li>\n                                                <li>Connecting with 5000+ suppliers globally\n                                                </li>\n                                                <li>100,000+ Downloads\n                                                </li>\n                                                <li>Received best UI Awards\n                                                </li>\n                                            </ul>\n                                            <div class=\"view_more\n                                                pl-40 display-none\">\n                                            </div>\n                                        </div>\n                                        <div class=\"content_image\n                                             screenshot\">\n                                            <div class=\"image_wrapper\">\n                                                <img src=\"img/portfolio/thrillophilia.png\" alt=\"Bank\n                                                   Open\" class=\"display-mobile-none\">\n                                                <img src=\"img/portfolio/mobile-thrillophilia.png\" alt=\"Bank\n                                                   Open\" class=\"desktop-slider-none\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div> -->\n\n                        <!--Item 4-->\n                        \n\n                    <div class=\"owl-stage-outer\"><div class=\"owl-stage\" style=\"transition: all 0s linear 0s; width: 7020px; transform: translate3d(-1985px, 0px, 0px);\"><div class=\"owl-item cloned\" style=\"width: auto; margin-right: 50px;\"><div class=\"portfolio-item\">\n                            <div class=\"portfolio-block\n                               bank_open_block\">\n                                <div class=\"card_wrapper\">\n                                    <!--Content-->\n                                    <div class=\"content\">\n                                        <h2 class=\"heading\n                                        pl-40 \">\n                                            BankOpen\n                                        </h2>\n                                        <h4 class=\"sub-heading\n                                        pl-40\">\n                                            Get the power of a modern digital payment account.\n                                        </h4>\n                                        <ul class=\"item_list\n                                        pl-40\">\n                                            <li>Asia's first neo Bank, $37.4M Investment raised, Emerging fintech startup.\n                                            </li>\n                                            <li>Back-end support to YES Bank &amp; ICICI Bank\n                                            </li>\n                                            <li>Funding Raised\n                                            </li>\n                                        </ul>\n                                        <div class=\"view_more\n                                        pl-40 display-none\">\n                                            <!-- <span>VIEW\n                                                    PROJECT\n                                                    <i class=\"fa\n                                           fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                        </div>\n                                    </div>\n                                    <!--Image-->\n                                    <div class=\"content_image\n                                     screenshot\">\n                                        <div class=\"image_wrapper\">\n                                            <img src=\"assets/img/portfolio/bank-open.png\" alt=\"Bank\n                                           Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                            <img src=\"assets/img/portfolio/mobile-bank-open.png\" alt=\"mobile bank open\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item cloned\" style=\"width: auto; margin-right: 50px;\"><div class=\"portfolio-item\">\n                            <div class=\"portfolio-block\n                           mtjf-block\">\n                                <div class=\"card_wrapper\">\n                                    <!--Content-->\n                                    <div class=\"content\">\n                                        <h3 class=\"heading\n                                    pl-40\">\n                                            MTJF\n                                        </h3>\n                                        <h4 class=\"sub-heading\n                                    pl-40\">\n                                            More Than Just Friends Confess fearlessly &amp; take your friendship to the next level\n                                        </h4>\n                                        <ul class=\"item_list\n                                    pl-40\">\n                                            <li>45,000 users in 35 days of launch\n                                            </li>\n                                            <li>Reached Top 10 Dating Apps on Product Hunt\n                                            </li>\n                                            <li>Featured by Apple India in top 10 apps\n                                            </li>\n                                            <li>Selected in Facebook Start, Apple\n                                            </li>\n                                        </ul>\n                                        <div class=\"view_more\n                                    pl-40 display-none\">\n                                            <!-- <span>VIEW\n                                                PROJECT\n                                                <i class=\"fa\n                                       fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                        </div>\n                                    </div>\n                                    <!--Image-->\n                                    <div class=\"content_image\n                                 screenshot\">\n                                        <div class=\"image_wrapper\">\n                                            <img src=\"assets/img/portfolio/MTJF.png\" alt=\"Bank\n                                       Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                            <img src=\"assets/img/portfolio/mobile-mtjf-2.png\" alt=\"MTJF\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item cloned\" style=\"width: auto; margin-right: 50px;\"><div class=\"item\">\n                            <div class=\"portfolio-item\">\n                                <div class=\"portfolio-block\n                                       frank-green-block\">\n                                    <div class=\"card_wrapper\">\n                                        <!--Content-->\n                                        <div class=\"content\">\n                                            <h3 class=\"heading\n                                                pl-40\">\n                                                Frank Green\n                                            </h3>\n                                            <h4 class=\"sub-heading\n                                                pl-40\">\n                                                AUS famous reusable product ecommerce\n                                            </h4>\n                                            <ul class=\"item_list\n                                                pl-40\">\n                                                <li>E-commerce\n                                                </li>\n                                                <li>Winner of Good Design Award\n                                                </li>\n                                                <li>Increased their sales from 10,000 to 90,000 orders per week\n                                                </li>\n                                                <li>Innovation awards winner in 2018\n                                                </li>\n                                            </ul>\n                                            <div class=\"view_more\n                                                pl-40 display-none\">\n                                                <!-- <span>VIEW\n                                                            PROJECT\n                                                            <i class=\"fa\n                                                   fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                            </div>\n                                        </div>\n                                        <!--Image-->\n                                        <div class=\"content_image\n                                             screenshot\">\n                                            <div class=\"image_wrapper\">\n                                                <img src=\"assets/img/portfolio/Frankgreen.png\" alt=\"Bank\n                                                   Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                                <img src=\"assets/img/portfolio/mobile-frankgreen.png\" alt=\"Bank\n                                                   Open\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item active center\" style=\"width: auto; margin-right: 50px;\"><div class=\"portfolio-item\">\n                            <div class=\"portfolio-block\n                               bank_open_block\">\n                                <div class=\"card_wrapper\">\n                                    <!--Content-->\n                                    <div class=\"content\">\n                                        <h2 class=\"heading\n                                        pl-40 \">\n                                            BankOpen\n                                        </h2>\n                                        <h4 class=\"sub-heading\n                                        pl-40\">\n                                            Get the power of a modern digital payment account.\n                                        </h4>\n                                        <ul class=\"item_list\n                                        pl-40\">\n                                            <li>Asia's first neo Bank, $37.4M Investment raised, Emerging fintech startup.\n                                            </li>\n                                            <li>Back-end support to YES Bank &amp; ICICI Bank\n                                            </li>\n                                            <li>Funding Raised\n                                            </li>\n                                        </ul>\n                                        <div class=\"view_more\n                                        pl-40 display-none\">\n                                            <!-- <span>VIEW\n                                                    PROJECT\n                                                    <i class=\"fa\n                                           fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                        </div>\n                                    </div>\n                                    <!--Image-->\n                                    <div class=\"content_image\n                                     screenshot\">\n                                        <div class=\"image_wrapper\">\n                                            <img src=\"assets/img/portfolio/bank-open.png\" alt=\"Bank\n                                           Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                            <img src=\"assets/img/portfolio/mobile-bank-open.png\" alt=\"mobile bank open\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item active\" style=\"width: auto; margin-right: 50px;\"><div class=\"portfolio-item\">\n                            <div class=\"portfolio-block\n                           mtjf-block\">\n                                <div class=\"card_wrapper\">\n                                    <!--Content-->\n                                    <div class=\"content\">\n                                        <h3 class=\"heading\n                                    pl-40\">\n                                            MTJF\n                                        </h3>\n                                        <h4 class=\"sub-heading\n                                    pl-40\">\n                                            More Than Just Friends Confess fearlessly &amp; take your friendship to the next level\n                                        </h4>\n                                        <ul class=\"item_list\n                                    pl-40\">\n                                            <li>45,000 users in 35 days of launch\n                                            </li>\n                                            <li>Reached Top 10 Dating Apps on Product Hunt\n                                            </li>\n                                            <li>Featured by Apple India in top 10 apps\n                                            </li>\n                                            <li>Selected in Facebook Start, Apple\n                                            </li>\n                                        </ul>\n                                        <div class=\"view_more\n                                    pl-40 display-none\">\n                                            <!-- <span>VIEW\n                                                PROJECT\n                                                <i class=\"fa\n                                       fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                        </div>\n                                    </div>\n                                    <!--Image-->\n                                    <div class=\"content_image\n                                 screenshot\">\n                                        <div class=\"image_wrapper\">\n                                            <img src=\"assets/img/portfolio/MTJF.png\" alt=\"Bank\n                                       Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                            <img src=\"assets/img/portfolio/mobile-mtjf-2.png\" alt=\"MTJF\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item\" style=\"width: auto; margin-right: 50px;\"><div class=\"item\">\n                            <div class=\"portfolio-item\">\n                                <div class=\"portfolio-block\n                                       frank-green-block\">\n                                    <div class=\"card_wrapper\">\n                                        <!--Content-->\n                                        <div class=\"content\">\n                                            <h3 class=\"heading\n                                                pl-40\">\n                                                Frank Green\n                                            </h3>\n                                            <h4 class=\"sub-heading\n                                                pl-40\">\n                                                AUS famous reusable product ecommerce\n                                            </h4>\n                                            <ul class=\"item_list\n                                                pl-40\">\n                                                <li>E-commerce\n                                                </li>\n                                                <li>Winner of Good Design Award\n                                                </li>\n                                                <li>Increased their sales from 10,000 to 90,000 orders per week\n                                                </li>\n                                                <li>Innovation awards winner in 2018\n                                                </li>\n                                            </ul>\n                                            <div class=\"view_more\n                                                pl-40 display-none\">\n                                                <!-- <span>VIEW\n                                                            PROJECT\n                                                            <i class=\"fa\n                                                   fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                            </div>\n                                        </div>\n                                        <!--Image-->\n                                        <div class=\"content_image\n                                             screenshot\">\n                                            <div class=\"image_wrapper\">\n                                                <img src=\"assets/img/portfolio/Frankgreen.png\" alt=\"Bank\n                                                   Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                                <img src=\"assets/img/portfolio/mobile-frankgreen.png\" alt=\"Bank\n                                                   Open\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item cloned\" style=\"width: auto; margin-right: 50px;\"><div class=\"portfolio-item\">\n                            <div class=\"portfolio-block\n                               bank_open_block\">\n                                <div class=\"card_wrapper\">\n                                    <!--Content-->\n                                    <div class=\"content\">\n                                        <h2 class=\"heading\n                                        pl-40 \">\n                                            BankOpen\n                                        </h2>\n                                        <h4 class=\"sub-heading\n                                        pl-40\">\n                                            Get the power of a modern digital payment account.\n                                        </h4>\n                                        <ul class=\"item_list\n                                        pl-40\">\n                                            <li>Asia's first neo Bank, $37.4M Investment raised, Emerging fintech startup.\n                                            </li>\n                                            <li>Back-end support to YES Bank &amp; ICICI Bank\n                                            </li>\n                                            <li>Funding Raised\n                                            </li>\n                                        </ul>\n                                        <div class=\"view_more\n                                        pl-40 display-none\">\n                                            <!-- <span>VIEW\n                                                    PROJECT\n                                                    <i class=\"fa\n                                           fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                        </div>\n                                    </div>\n                                    <!--Image-->\n                                    <div class=\"content_image\n                                     screenshot\">\n                                        <div class=\"image_wrapper\">\n                                            <img src=\"assets/img/portfolio/bank-open.png\" alt=\"Bank\n                                           Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                            <img src=\"assets/img/portfolio/mobile-bank-open.png\" alt=\"mobile bank open\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item cloned\" style=\"width: auto; margin-right: 50px;\"><div class=\"portfolio-item\">\n                            <div class=\"portfolio-block\n                           mtjf-block\">\n                                <div class=\"card_wrapper\">\n                                    <!--Content-->\n                                    <div class=\"content\">\n                                        <h3 class=\"heading\n                                    pl-40\">\n                                            MTJF\n                                        </h3>\n                                        <h4 class=\"sub-heading\n                                    pl-40\">\n                                            More Than Just Friends Confess fearlessly &amp; take your friendship to the next level\n                                        </h4>\n                                        <ul class=\"item_list\n                                    pl-40\">\n                                            <li>45,000 users in 35 days of launch\n                                            </li>\n                                            <li>Reached Top 10 Dating Apps on Product Hunt\n                                            </li>\n                                            <li>Featured by Apple India in top 10 apps\n                                            </li>\n                                            <li>Selected in Facebook Start, Apple\n                                            </li>\n                                        </ul>\n                                        <div class=\"view_more\n                                    pl-40 display-none\">\n                                            <!-- <span>VIEW\n                                                PROJECT\n                                                <i class=\"fa\n                                       fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                        </div>\n                                    </div>\n                                    <!--Image-->\n                                    <div class=\"content_image\n                                 screenshot\">\n                                        <div class=\"image_wrapper\">\n                                            <img src=\"assets/img/portfolio/MTJF.png\" alt=\"Bank\n                                       Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                            <img src=\"assets/img/portfolio/mobile-mtjf-2.png\" alt=\"MTJF\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div><div class=\"owl-item cloned\" style=\"width: auto; margin-right: 50px;\"><div class=\"item\">\n                            <div class=\"portfolio-item\">\n                                <div class=\"portfolio-block\n                                       frank-green-block\">\n                                    <div class=\"card_wrapper\">\n                                        <!--Content-->\n                                        <div class=\"content\">\n                                            <h3 class=\"heading\n                                                pl-40\">\n                                                Frank Green\n                                            </h3>\n                                            <h4 class=\"sub-heading\n                                                pl-40\">\n                                                AUS famous reusable product ecommerce\n                                            </h4>\n                                            <ul class=\"item_list\n                                                pl-40\">\n                                                <li>E-commerce\n                                                </li>\n                                                <li>Winner of Good Design Award\n                                                </li>\n                                                <li>Increased their sales from 10,000 to 90,000 orders per week\n                                                </li>\n                                                <li>Innovation awards winner in 2018\n                                                </li>\n                                            </ul>\n                                            <div class=\"view_more\n                                                pl-40 display-none\">\n                                                <!-- <span>VIEW\n                                                            PROJECT\n                                                            <i class=\"fa\n                                                   fa-long-arrow-right\" aria-hidden=\"true\"></i></span> -->\n                                            </div>\n                                        </div>\n                                        <!--Image-->\n                                        <div class=\"content_image\n                                             screenshot\">\n                                            <div class=\"image_wrapper\">\n                                                <img src=\"assets/img/portfolio/Frankgreen.png\" alt=\"Bank\n                                                   Open\" class=\"display-mobile-none\" style=\"opacity: 1;\">\n                                                <img src=\"assets/img/portfolio/mobile-frankgreen.png\" alt=\"Bank\n                                                   Open\" class=\"desktop-slider-none\" style=\"opacity: 1;\">\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div></div></div></div><div class=\"owl-nav disabled\"><button type=\"button\" role=\"presentation\" class=\"owl-prev\"><span aria-label=\"Previous\">‹</span></button><button type=\"button\" role=\"presentation\" class=\"owl-next\"><span aria-label=\"Next\">›</span></button></div><div class=\"owl-dots disabled\"><button role=\"button\" class=\"owl-dot active\"><span></span></button><button role=\"button\" class=\"owl-dot\"><span></span></button><button role=\"button\" class=\"owl-dot\"><span></span></button></div></div>\n                </div>\n                <!--Carousel Navigation Buttons-->\n                <div class=\"carousel-navigation\n                  col-lg-12\n                  col-md-12\n                  col-sm-12\">\n                    <!--Left Nav-->\n                    <div class=\"nav-left\">\n                        <div class=\"item-number\">\n                            <span id=\"counter\">1/3</span>\n                        </div>\n                        <div class=\"nav-buttons\n                        owl-nav\">\n                            <img class=\"nav-btn\n                           previous-btn\" src=\"assets/img/portfolio/ic-ar-circle-left-new.svg\" alt=\"Previous\" id=\"previous-btn\">\n                            <img id=\"next-btn\" class=\"nav-btn\n                           next-btn\" src=\"assets/img/portfolio/ic-ar-circle-right-new.svg\" alt=\"Next\">\n                        </div>\n                    </div>\n                    <div class=\"right-nav\">\n                        <a href=\"case-studies.html\" class=\"card-link\">\n                            <span class=\"mobile-solid-blue-btn mobile-solid-btn\">VIEW\n                                    ALL\n                                    PROJECTS\n                                    <!-- <img class=\"arrow-right display-mobile-none\" src=\"img/portfolio/ic-long-arrow.svg\" alt=\"View\n                                    All\n                                    Projects\"> -->\n                                    <img class=\"arrow-right display-mobile-none\" src=\"assets/img/portfolio/ic-long-arrow-new.svg\" alt=\"View\n                                    All\n                                    Projects\">\n                                </span>\n                        </a>\n\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!--Custom Carousel for Portfolio: END-->\n    </div>"

/***/ }),

/***/ "./src/app/site/home/portfolio/portfolio.component.ts":
/*!************************************************************!*\
  !*** ./src/app/site/home/portfolio/portfolio.component.ts ***!
  \************************************************************/
/*! exports provided: PortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PortfolioComponent", function() { return PortfolioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PortfolioComponent = /** @class */ (function () {
    function PortfolioComponent() {
    }
    PortfolioComponent.prototype.ngOnInit = function () {
    };
    PortfolioComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-portfolio',
            template: __webpack_require__(/*! ./portfolio.component.html */ "./src/app/site/home/portfolio/portfolio.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PortfolioComponent);
    return PortfolioComponent;
}());



/***/ }),

/***/ "./src/app/site/home/services/services.component.html":
/*!************************************************************!*\
  !*** ./src/app/site/home/services/services.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"dotted-bg-wrapper\">\n        <div class=\"container\">\n            <!--White Box-->\n            <div class=\"white-box animated fadeInUp display-none\">\n                <div class=\"row\">\n                    <div class=\"right-summary col-lg-12\">\n                        <div class=\"row\">\n                            <!--Hospital and Healthcare-->\n                            <div class=\"mb-10\n                           flex-wrapper col-lg-4\n                           wow fadeIn\" data-wow-duration=\"1s\" style=\"visibility: visible; animation-duration: 1s; animation-name: fadeIn;\">\n                                <div class=\"summary-img\">\n                                    <i class=\"fa fa-gears fa-3x\" style=\"color: #9b2d75\"></i>\n                                </div>\n                                <div class=\"summary-text\">\n                                    <p>Software &amp; Services\n                                    </p>\n                                    <p>30+ eCommerce solutions, 12 fintech top-funded products.\n                                    </p>\n                                </div>\n                            </div>\n                            <!--Food and Resturant-->\n                            <div class=\"mb-10\n                           flex-wrapper col-lg-4\n                           wow fadeIn\" data-wow-duration=\"1s\" style=\"visibility: visible; animation-duration: 1s; animation-name: fadeIn;\">\n                                <div class=\"summary-img\">\n                                    <i class=\"fa fa-shopping-cart fa-3x\" style=\"color: #9b2d75\"></i>\n                                </div>\n                                <div class=\"summary-text\">\n                                    <p>eCommerce &amp; Logistics</p>\n                                    <p>Order Management, Delivery, Payments, Android &amp; iOS App.\n                                    </p>\n                                </div>\n                            </div>\n                            <!--Travel and Hospitality-->\n                            <div class=\"mb-10 flex-wrapper\n                           col-lg-4 wow fadeIn\" data-wow-duration=\"1s\" style=\"visibility: visible; animation-duration: 1s; animation-name: fadeIn;\">\n                                <div class=\"summary-img\">\n                                    <i class=\"fa fa-heartbeat fa-3x\" style=\"color: #9b2d75\"></i>\n                                </div>\n                                <div class=\"summary-text\">\n                                    <p>Fitness &amp; Healthcare\n                                    </p>\n                                    <p>Marketplace, Reviews, Chat, Reports, Multi-Language, Multi-Currency\n                                    </p>\n                                </div>\n                            </div>\n                            <div class=\"mt-20  flex-wrapper\n                           col-lg-4 wow fadeIn\" data-wow-duration=\"1s\" style=\"visibility: visible; animation-duration: 1s; animation-name: fadeIn;\">\n                                <div class=\"summary-img\">\n                                    <i class=\"fa fa-bank fa-3x\" style=\"color: #9b2d75\"></i>\n                                </div>\n                                <div class=\"summary-text\">\n                                    <p>Banking &amp; Finance\n                                    </p>\n                                    <p>Marketplace, Reviews, Chat, Reports, Multi-Language, Multi-Currency\n                                    </p>\n                                </div>\n                            </div>\n                            <!--Education and Learning-->\n                            <div class=\"mt-20 flex-wrapper\n                           col-lg-4 wow fadeIn\" data-wow-duration=\"1s\" style=\"visibility: visible; animation-duration: 1s; animation-name: fadeIn;\">\n                                <div class=\"summary-img\">\n                                    <i class=\"fa fa-graduation-cap fa-3x\" style=\"color: #9b2d75\"></i>\n                                </div>\n                                <div class=\"summary-text\">\n                                    <p>Education &amp; eLearning\n                                    </p>\n                                    <p>Test Management, Course Management, Subscriptions, Forum.\n                                    </p>\n                                </div>\n                            </div>\n\n                            <div class=\"mt-20  flex-wrapper\n                           col-lg-4 wow fadeIn\" data-wow-duration=\"1s\" style=\"visibility: visible; animation-duration: 1s; animation-name: fadeIn;\">\n                                <div class=\"summary-img\">\n                                    <!-- <img src=\"assets/img/service/Education-new.svg\" alt=\"Hospital &amp;\n                                 Healthcare\"> -->\n                                <i class=\"fa fa-coffee fa-3x\" style=\"color: #9b2d75\"></i> \n                                </div>\n                                <div class=\"summary-text\">\n                                    <p>Restaurants &amp; Hotels\n                                    </p>\n                                    <p>Test Management, Course Management, Subscriptions, Forum.\n                                    </p>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n\n            <div class=\"services-header\">\n            <p class=\"section-heading wow\n                     fadeInUp\">We Help Transform Your Idea, into a Minimum Viable Product (MVP)\n            </p>\n            </div>\n            <div class=\"video-testimonial\n              wow\n              fadeIn\" style=\"visibility: visible; animation-name: fadeIn; margin-top: -10px;\">\n              <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/0Ono368CC2Q\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n           </div>\n            <!--Service-->\n            <div class=\"services mt-60\">\n                <div class=\"services-header\">\n                    <p class=\"section-heading wow\n                     fadeInUp\">We’re experts in crafting products that engage your audience, sets your brand apart and, helps you achieve your goals.\n                    </p>\n                    <p class=\"section-subheading wow\n                     fadeInUp\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\">We develop (what people see and how they use it) for websites and applications.\n                        <span class=\"line_break\"><br></span> We focus on making sure these are both useful and easy to use.\n                    </p>\n                </div>\n                <div class=\"services-cards-wrapper\">\n                    <div class=\"services-row-1 row\">\n                        <!--Card 1: UI & UX Design-->\n                       <box-component [data]=\"serviceList\"></box-component>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>"

/***/ }),

/***/ "./src/app/site/home/services/services.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/site/home/services/services.component.ts ***!
  \**********************************************************/
/*! exports provided: ServiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceComponent", function() { return ServiceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_2__);



var ServiceComponent = /** @class */ (function () {
    function ServiceComponent() {
    }
    ServiceComponent.prototype.ngOnInit = function () {
        this.serviceList = [
            { title: "Mobile Development", icon: "mobile" },
            { title: "Web Development", icon: "laptop" },
            { title: "Cloud Development", icon: "cloud" },
            { title: "AI & Blockchain", icon: "connectdevelop" },
            { title: "UI/UX Design", icon: "lightbulb-o" },
            { title: "Product Strategy", icon: "gears" },
            { title: "Business Consultancy", icon: "handshake-o" },
            { title: "Digital Marketing", icon: "bar-chart" }
        ];
    };
    ServiceComponent.prototype.openList = function () {
        // $('#service-card-one').addClass('gradient-service-card');
        // $('#arrow-wrapper').removeClass('fa fa-chevron-down float-right').addClass('fa float-right fa-times');
        // $('#service-img-one').addClass('img-display-block');
        // $('#services-head').addClass('services-open-wrapper');
        // $('#service-list').addClass('mobile-list-open');
        jquery__WEBPACK_IMPORTED_MODULE_2__('#service-card-one').slideToggle();
    };
    ServiceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-services',
            template: __webpack_require__(/*! ./services.component.html */ "./src/app/site/home/services/services.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ServiceComponent);
    return ServiceComponent;
}());



/***/ }),

/***/ "./src/app/site/home/testimonials/testimonial.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/site/home/testimonials/testimonial.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"testimonials\">\n        <div class=\"container\">\n           <div class=\"testimonials-header\n              text-center\">\n              <!-- <div class=\"testimonials-stars\">\n                 <img class=\"wow\n                    zoomIn\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-name: zoomIn;\">\n                 <img class=\"wow\n                    zoomIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: zoomIn;\">\n                 <img class=\"wow\n                    zoomIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.4s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.4s; animation-name: zoomIn;\">\n                 <img class=\"wow\n                    zoomIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.5s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: zoomIn;\">\n                 <img class=\"wow\n                    zoomIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.6s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.6s; animation-name: zoomIn;\">\n              </div> -->\n              <div class=\"testimonial-section-header\">\n                 <p class=\"section-heading\n                    wow\n                    fadeInUp\" style=\"visibility: visible; animation-name: fadeInUp;\">\n                    What clients say about us\n                 </p>\n                 <p class=\"section-subheading\n                    wow\n                    fadeInUp\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeInUp;\">We believe in going the extra mile and thus, we tend to not only over-deliver, but exceed expectations!\n                 </p>\n              </div>\n           </div>\n           <!--Video Testimonial-->\n           <!-- <div class=\"video-testimonial\n              wow\n              fadeIn\" style=\"visibility: visible; animation-name: fadeIn;\"> -->\n              <!-- <div id=\"speach-bubble\" class=\"comment-wrapper\n                 absolute-wrapper\n                 show\">\n                   <div class=\"main-container\n                    relative-wrapper\n                    wow\n                    fadeIn\">\n                       <img class=\"inverted-comma\n                       wow\n                       fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.8s\"\n                           src=\"assets/img/testimonials/ic-inverted-commas.svg\" alt=\"Inverted\n                       Comma\">\n                       <div class=\"video-comment\">\n                           <p>I really appreciate the dedication you guys have put in for our project & sacrificed a\n                               long weekend for beta launch!\n                           </p>\n                       </div>\n                   </div>\n                 </div> -->\n              <!-- <video poster=\"img/Danny.jpg\" src=\"videos/sample.mp4\" id=\"danny_video\"></video> -->\n              <!-- <iframe src=\"https://www.youtube.com/embed/1DTBlIiunhQ\" allowtransparency=\"\" allow=\"autoplay\"></iframe> -->\n              <!-- <iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/0Ono368CC2Q\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n           </div> -->\n           <div class=\"testimonials-cards-wrapper\n              row\">\n              <div class=\"owl-carousel owl-loaded owl-drag\" id=\"review-slider\">\n                \n                 <div class=\"owl-stage-outer\">\n                    <div class=\"owl-stage\" style=\"transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width: 1150px;\">\n                       <div class=\"owl-item active\" style=\"width: 373.333px; margin-right: 10px;\" *ngFor=\"let i of [1,2,3]\">\n                          <div class=\"bank-open-testimonial\n                             item\n                             wow\n                             fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeIn;\">\n                             <div class=\"company-logo\">\n                                <img src=\"assets/img/testimonials/logo-mtjf.png\" alt=\"Bank\n                                   Open\">\n                             </div>\n                             <div class=\"white-testionial-container\">\n                                <div class=\"testimonial-text\">\n                                   <p>\n                                      We wanted to work with someone locally, but my co-founder insisted these guys are expert with startup and he was comfortable with Dezigndia than a nearby company. Finally, we made a decision, these guys help us a lot in all phases of the product development.\n                                   </p>\n                                </div>\n                                <div class=\"testimonial-rating\">\n                                   <img class=\"wow\n                                      fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.3s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.3s; animation-name: fadeIn;\">\n                                   <img class=\"wow\n                                      fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.4s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.4s; animation-name: fadeIn;\">\n                                   <img class=\"wow\n                                      fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.5s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.5s; animation-name: fadeIn;\">\n                                   <img class=\"wow\n                                      fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.6s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.6s; animation-name: fadeIn;\">\n                                   <img class=\"wow\n                                      fadeIn\" data-wow-duration=\"1s\" data-wow-delay=\"0.7s\" src=\"assets/img/testimonials/ic-star.svg\" alt=\"Star\" style=\"visibility: visible; animation-duration: 1s; animation-delay: 0.7s; animation-name: fadeIn;\">\n                                </div>\n                                <!-- <img class=\"container-pointer\" src=\"assets/img/testimonials/arrow-point-to-down.svg\" alt=\"Down\n                                   Arrow\"> -->\n                                <svg class=\"container-pointer\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" id=\"Capa_1\" x=\"0px\" y=\"0px\" width=\"512px\" height=\"512px\" viewBox=\"0 0 404.308 404.309\" style=\"enable-background:new 0 0 404.308 404.309;\" xml:space=\"preserve\">\n                                   <g>\n                                      <g>\n                                         <path d=\"M0,101.08h404.308L202.151,303.229L0,101.08z\" data-original=\"#000000\" class=\"active-path\" data-old_color=\"#ffffff\" fill=\"#ffffff\"></path>\n                                      </g>\n                                   </g>\n                                </svg>\n                             </div>\n                             <!--Testimonial User-->\n                             <div class=\"testimonial-user\">\n                                <!-- <div class=\"profile-img\">\n                                   <img src=\"assets/img/testimonials/default-profile-image.png\" alt=\"Default\n                                   Image\">\n                                   </div> -->\n                                <p class=\"profile-name\n                                   text-center\">\n                                   Mabel Chacko\n                                </p>\n                                <p class=\"profile-designation\n                                   text-center\">\n                                   Founder\n                                </p>\n                             </div>\n                          </div>\n                       </div>\n                      \n                    </div>\n                 </div>\n                 <div class=\"owl-nav disabled\"><button type=\"button\" role=\"presentation\" class=\"owl-prev\"><span aria-label=\"Previous\">‹</span></button><button type=\"button\" role=\"presentation\" class=\"owl-next\"><span aria-label=\"Next\">›</span></button></div>\n                 <div class=\"owl-dots disabled\"><button role=\"button\" class=\"owl-dot active\"><span></span></button></div>\n              </div>\n           </div>\n        </div>\n     </div>"

/***/ }),

/***/ "./src/app/site/home/testimonials/testimonial.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/site/home/testimonials/testimonial.component.ts ***!
  \*****************************************************************/
/*! exports provided: TestimonialComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestimonialComponent", function() { return TestimonialComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var TestimonialComponent = /** @class */ (function () {
    function TestimonialComponent() {
    }
    TestimonialComponent.prototype.ngOnInit = function () {
    };
    TestimonialComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-testimonial',
            template: __webpack_require__(/*! ./testimonial.component.html */ "./src/app/site/home/testimonials/testimonial.component.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TestimonialComponent);
    return TestimonialComponent;
}());



/***/ }),

/***/ "./src/app/site/site.module.ts":
/*!*************************************!*\
  !*** ./src/app/site/site.module.ts ***!
  \*************************************/
/*! exports provided: SiteModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteModule", function() { return SiteModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var ng_simple_slideshow__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-simple-slideshow */ "./node_modules/ng-simple-slideshow/ng-simple-slideshow.es5.js");
/* harmony import */ var _layout_weblayout_webalyout_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../layout/weblayout/webalyout.module */ "./src/app/layout/weblayout/webalyout.module.ts");
/* harmony import */ var _services_services_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/services.module */ "./src/app/site/services/services.module.ts");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./home/home.component */ "./src/app/site/home/home.component.ts");
/* harmony import */ var _home_homepage_banner_homepage_banner_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home/homepage-banner/homepage-banner.component */ "./src/app/site/home/homepage-banner/homepage-banner.component.ts");
/* harmony import */ var _home_services_services_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./home/services/services.component */ "./src/app/site/home/services/services.component.ts");
/* harmony import */ var _home_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./home/portfolio/portfolio.component */ "./src/app/site/home/portfolio/portfolio.component.ts");
/* harmony import */ var _home_testimonials_testimonial_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./home/testimonials/testimonial.component */ "./src/app/site/home/testimonials/testimonial.component.ts");
/* harmony import */ var _home_experience_experience_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./home/experience/experience.component */ "./src/app/site/home/experience/experience.component.ts");
/* harmony import */ var _site_routing__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./site.routing */ "./src/app/site/site.routing.ts");














var SiteModule = /** @class */ (function () {
    function SiteModule() {
    }
    SiteModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _home_homepage_banner_homepage_banner_component__WEBPACK_IMPORTED_MODULE_8__["HomePageBannerComponent"],
                _home_services_services_component__WEBPACK_IMPORTED_MODULE_9__["ServiceComponent"],
                _home_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_10__["PortfolioComponent"],
                _home_testimonials_testimonial_component__WEBPACK_IMPORTED_MODULE_11__["TestimonialComponent"],
                _home_experience_experience_component__WEBPACK_IMPORTED_MODULE_12__["ExperienceComponent"]
            ],
            exports: [
                _home_home_component__WEBPACK_IMPORTED_MODULE_7__["HomeComponent"],
                _home_homepage_banner_homepage_banner_component__WEBPACK_IMPORTED_MODULE_8__["HomePageBannerComponent"],
                _home_services_services_component__WEBPACK_IMPORTED_MODULE_9__["ServiceComponent"],
                _home_portfolio_portfolio_component__WEBPACK_IMPORTED_MODULE_10__["PortfolioComponent"],
                _home_testimonials_testimonial_component__WEBPACK_IMPORTED_MODULE_11__["TestimonialComponent"],
                _home_experience_experience_component__WEBPACK_IMPORTED_MODULE_12__["ExperienceComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _site_routing__WEBPACK_IMPORTED_MODULE_13__["routing"],
                _layout_weblayout_webalyout_module__WEBPACK_IMPORTED_MODULE_4__["WebLayoutModule"],
                ng_simple_slideshow__WEBPACK_IMPORTED_MODULE_3__["SlideshowModule"],
                _services_services_module__WEBPACK_IMPORTED_MODULE_5__["ServiceModule"],
                _components_components_module__WEBPACK_IMPORTED_MODULE_6__["ComponentModule"]
            ],
            providers: []
        })
    ], SiteModule);
    return SiteModule;
}());



/***/ }),

/***/ "./src/app/site/site.routing.ts":
/*!**************************************!*\
  !*** ./src/app/site/site.routing.ts ***!
  \**************************************/
/*! exports provided: routes, routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routes", function() { return routes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _layout_weblayout_weblayout_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/weblayout/weblayout.component */ "./src/app/layout/weblayout/weblayout.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/site/home/home.component.ts");



var routes = [
    { path: '',
        component: _layout_weblayout_weblayout_component__WEBPACK_IMPORTED_MODULE_1__["WebLayoutComponent"],
        children: [
            { path: 'home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"] },
            { path: 'service', loadChildren: './services/services.module#ServiceModule' },
            { path: '', redirectTo: 'home' }
        ]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ })

}]);
//# sourceMappingURL=site-site-module.js.map