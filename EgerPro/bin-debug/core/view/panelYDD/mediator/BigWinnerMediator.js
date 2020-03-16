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
    var BigWinnerMediator = (function (_super) {
        __extends(BigWinnerMediator, _super);
        function BigWinnerMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, BigWinnerMediator.NAME, viewComponent) || this;
        }
        BigWinnerMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_BIG_WINNER,
                PanelNotify.CLOSE_BIG_WINNER
            ];
        };
        BigWinnerMediator.prototype.handleNotification = function (notification) {
            var badyData = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_BIG_WINNER:
                    var group = "bigWinner"; //要确保
                    if (RES.getRes("bigWinnerBg_png")) {
                        this.showMainUI();
                    }
                    else {
                        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showMainUI, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
                        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
                    }
                    RES.loadGroup(group);
                    //显示角色面板
                    break;
                case PanelNotify.CLOSE_BIG_WINNER:
                    this.closePanel(1);
                    break;
            }
        };
        BigWinnerMediator.prototype.showMainUI = function () {
            if (this._bigWinnerPanel == null) {
                this._bigWinnerPanel = new bigWinner.BigWinnerPanel();
            }
            this.showUIInCenter(this._bigWinnerPanel, true, 1);
        };
        BigWinnerMediator.prototype.stLoadProcess = function () { };
        BigWinnerMediator.prototype.error = function () {
            console.warn("资源加载失败：bigWinner");
        };
        /**
         * 面板关闭后需要销毁的对象
         */
        BigWinnerMediator.prototype.destroy = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showMainUI, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
            this._bigWinnerPanel = null;
            _super.prototype.destroy.call(this);
        };
        BigWinnerMediator.NAME = "BigWinnerMediator";
        return BigWinnerMediator;
    }(BasePanelMediator));
    bigWinner.BigWinnerMediator = BigWinnerMediator;
    __reflect(BigWinnerMediator.prototype, "bigWinner.BigWinnerMediator");
})(bigWinner || (bigWinner = {}));
//# sourceMappingURL=BigWinnerMediator.js.map