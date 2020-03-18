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
var StopBetMediator = (function (_super) {
    __extends(StopBetMediator, _super);
    function StopBetMediator(viewComponent) {
        if (viewComponent === void 0) { viewComponent = null; }
        return _super.call(this, StopBetMediator.NAME, viewComponent) || this;
    }
    StopBetMediator.prototype.listNotificationInterests = function () {
        return [
            PanelNotify.OPEN_STOP_BET,
            PanelNotify.CLOSE_STOP_BET
        ];
    };
    StopBetMediator.prototype.handleNotification = function (notification) {
        var data = notification.getBody();
        switch (notification.getName()) {
            case PanelNotify.OPEN_STOP_BET:
                //显示角色面板
                if (this._stopBetPanel == null) {
                    this._stopBetPanel = new StopBetPanel();
                }
                this.showUI(this._stopBetPanel, false, 0, 0, 2);
                break;
            case PanelNotify.CLOSE_STOP_BET:
                this.closePanel(0);
                break;
        }
    };
    /**
     * 面板关闭后需要销毁的对象
     */
    StopBetMediator.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    StopBetMediator.prototype.onTimer = function (e) {
        game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_STOP_BET);
    };
    StopBetMediator.NAME = "StopBetMediator";
    return StopBetMediator;
}(BasePanelMediator));
__reflect(StopBetMediator.prototype, "StopBetMediator");
//# sourceMappingURL=StopBetMediator.js.map