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
var betDetails;
(function (betDetails) {
    var BetRecordsItem = (function (_super) {
        __extends(BetRecordsItem, _super);
        function BetRecordsItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panelYDD/BetDetails/BetRecordsItemSkin.exml";
            return _this;
        }
        BetRecordsItem.prototype.dataChanged = function () {
            this.betNum_lab.text = this.data.money + " HDAG";
            var isWinStr = this.data.isWin ? "+" : "-";
            this.TorF_lab.text = isWinStr + this.data.money + " HDAG";
            var imgS = "";
            switch (this.data.region) {
                case EnumerationType.RegionWinner.black:
                    imgS = "heiSheng";
                    break;
                case EnumerationType.RegionWinner.red:
                    imgS = "hongSheng";
                    break;
                case EnumerationType.RegionWinner.blackS:
                case EnumerationType.RegionWinner.redS:
                    imgS = "otherPoint";
                    break;
                default:
                    break;
            }
            imgS += "_png";
            this.color_img.source = imgS;
        };
        return BetRecordsItem;
    }(eui.ItemRenderer));
    betDetails.BetRecordsItem = BetRecordsItem;
    __reflect(BetRecordsItem.prototype, "betDetails.BetRecordsItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(betDetails || (betDetails = {}));
//# sourceMappingURL=BetRecordsItem.js.map