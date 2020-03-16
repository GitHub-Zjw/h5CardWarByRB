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
var bigWinner;
(function (bigWinner) {
    var BigWinnerItem = (function (_super) {
        __extends(BigWinnerItem, _super);
        function BigWinnerItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panelYDD/BigWinner/BigWinnerItemSkin.exml";
            return _this;
        }
        BigWinnerItem.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        BigWinnerItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        BigWinnerItem.prototype.dataChanged = function () {
            this.jiangBei_img.source = "jiangBei" + this.data.jiangBeiNum + "_png";
            this.playerName_lab.text = this.data.playerName;
            this.value_lab.text = this.data.value;
        };
        return BigWinnerItem;
    }(eui.ItemRenderer));
    bigWinner.BigWinnerItem = BigWinnerItem;
    __reflect(BigWinnerItem.prototype, "bigWinner.BigWinnerItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(bigWinner || (bigWinner = {}));
//# sourceMappingURL=BigWinnerItem.js.map