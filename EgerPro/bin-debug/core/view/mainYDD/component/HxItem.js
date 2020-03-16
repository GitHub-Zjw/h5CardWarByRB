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
var HxItem = (function (_super) {
    __extends(HxItem, _super);
    function HxItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/ui/mainYDD/component/HxItemSkin.exml";
        return _this;
    }
    HxItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    HxItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    HxItem.prototype.dataChanged = function () {
        this.qj_lab.text = this.data[0];
        this.time_lab0.text = this.data[2];
        var tx = this.hx_lab;
        tx.textFlow = (new egret.HtmlTextParser).parser(this.data[1]);
    };
    return HxItem;
}(eui.ItemRenderer));
__reflect(HxItem.prototype, "HxItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=HxItem.js.map