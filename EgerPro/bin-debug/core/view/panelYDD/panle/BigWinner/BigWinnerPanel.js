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
var bigWinner;
(function (bigWinner) {
    var BigWinnerPanel = (function (_super) {
        __extends(BigWinnerPanel, _super);
        function BigWinnerPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panelYDD/BigWinner/BigWinnerPanelSkin.exml";
            return _this;
        }
        BigWinnerPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        BigWinnerPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        BigWinnerPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.rankList.dataProvider = this.listData();
            this.rankList.itemRenderer = bigWinner.BigWinnerItem;
            var self = this;
            setTimeout(function () {
                self.closePanel();
            }, 5000);
        };
        BigWinnerPanel.prototype.listData = function () {
            return new eui.ArrayCollection(AllData.instance.BigWinnerDatas);
        };
        /**
         * 刷新界面
         */
        BigWinnerPanel.prototype.refreshView = function () {
            this.rankList.dataProvider = this.listData();
        };
        BigWinnerPanel.prototype.closePanel = function () {
            game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BIG_WINNER);
        };
        return BigWinnerPanel;
    }(ZjwComponent));
    bigWinner.BigWinnerPanel = BigWinnerPanel;
    __reflect(BigWinnerPanel.prototype, "bigWinner.BigWinnerPanel");
})(bigWinner || (bigWinner = {}));
//# sourceMappingURL=BigWinnerPanel.js.map