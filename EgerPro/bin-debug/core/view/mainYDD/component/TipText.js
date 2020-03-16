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
var TipText = (function (_super) {
    __extends(TipText, _super);
    function TipText(tip) {
        var _this = _super.call(this) || this;
        _this._str = tip;
        _this.skinName = "resource/ui/mainYDD/component/TipTextSkin.exml";
        return _this;
    }
    TipText.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    TipText.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.tip_lab.text = this._str;
        this.bg_png.width = this.tip_lab.width + 60;
    };
    return TipText;
}(eui.Component));
__reflect(TipText.prototype, "TipText", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=TipText.js.map