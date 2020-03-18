var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var RegionRed = (function (_super) {
    __extends(RegionRed, _super);
    function RegionRed() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/ui/mainYDD/component/RegionRedSkin.exml";
        return _this;
    }
    RegionRed.prototype.onBegigGame = function () {
        if (this.win_img) {
            this.win_img.alpha = 0;
        }
    };
    Object.defineProperty(RegionRed.prototype, "StarPointX", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionRed.prototype, "StarPointY", {
        get: function () {
            return this.height + 10;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionRed.prototype, "SelfStarPointX", {
        get: function () {
            return this.width * 0.45;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionRed.prototype, "SelfStarPointY", {
        get: function () {
            return this.height;
        },
        enumerable: true,
        configurable: true
    });
    return RegionRed;
}(BaseRegion));
__reflect(RegionRed.prototype, "RegionRed");
//# sourceMappingURL=RegionRed.js.map