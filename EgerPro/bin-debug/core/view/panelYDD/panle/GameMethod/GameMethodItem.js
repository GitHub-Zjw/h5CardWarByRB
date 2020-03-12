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
var gameMethod;
(function (gameMethod) {
    var GameMethodItem = (function (_super) {
        __extends(GameMethodItem, _super);
        function GameMethodItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panelYDD/GameMethod/GameMethodItemSkin.exml";
            return _this;
        }
        GameMethodItem.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        GameMethodItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        GameMethodItem.prototype.dataChanged = function () {
            this.winner_lab.text = this.data[0];
            this.regionType_lab.text = this.data[2];
            this.moneyNum_lab.text = this.data[1];
        };
        return GameMethodItem;
    }(eui.ItemRenderer));
    gameMethod.GameMethodItem = GameMethodItem;
    __reflect(GameMethodItem.prototype, "gameMethod.GameMethodItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(gameMethod || (gameMethod = {}));
//# sourceMappingURL=GameMethodItem.js.map