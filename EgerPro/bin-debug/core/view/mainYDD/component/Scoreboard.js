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
var Scoreboard = (function (_super) {
    __extends(Scoreboard, _super);
    function Scoreboard() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/ui/mainYDD/component/ScoreboardSkin.exml";
        _this._pointImages = [];
        return _this;
    }
    Scoreboard.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    Scoreboard.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    /**
     * 记录本局胜利区域
     */
    Scoreboard.prototype.addWinner = function () {
        var winner = AllData.instance.Winner;
        var imgS = AllData.instance.getPointImgByReion(winner);
        var winPoint = ObjectPool.instance.pop("eui.Image", imgS);
        this.board_group.addChild(winPoint);
        this._pointImages.push(winPoint);
        var wp = AllData.instance.getWP();
        this.wpBlack_lab.text = wp.black + "%";
        this.wpRed_lab.text = wp.red + "%";
        this.wpOther_lab.text = wp.other + "%";
    };
    return Scoreboard;
}(eui.Component));
__reflect(Scoreboard.prototype, "Scoreboard", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=Scoreboard.js.map