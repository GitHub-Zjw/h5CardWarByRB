var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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