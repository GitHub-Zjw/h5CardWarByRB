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
var RegionBlack = (function (_super) {
    __extends(RegionBlack, _super);
    function RegionBlack() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/ui/mainYDD/component/RegionBlackSkin.exml";
        return _this;
    }
    RegionBlack.prototype.onBegigGame = function () {
        if (this.win_img) {
            this.win_img.alpha = 0;
        }
    };
    /**
     * 获取小球最终停止点
     */
    RegionBlack.prototype.getEndPoint = function () {
        var pEnd = new egret.Point();
        pEnd.x = AllData.instance.getRandomF(this.width * 0.2, this.width * 0.9);
        pEnd.y = AllData.instance.getRandomF(this.height * 0.3, this.height * 0.53);
        var rightDownP = new egret.Point(this.width, this.height);
        if (AllData.instance.getDistance(pEnd, rightDownP) < this.height * 0.8) {
            return this.getEndPoint();
        }
        return pEnd;
    };
    Object.defineProperty(RegionBlack.prototype, "StarPointX", {
        get: function () {
            return this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionBlack.prototype, "SelfStarPointX", {
        get: function () {
            return this.width * 1.1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegionBlack.prototype, "SelfStarPointY", {
        get: function () {
            return this.height * 0.8;
        },
        enumerable: true,
        configurable: true
    });
    return RegionBlack;
}(BaseRegion));
__reflect(RegionBlack.prototype, "RegionBlack");
//# sourceMappingURL=RegionBlack.js.map