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
/**
  * 主界面管理类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
var game;
(function (game) {
    var MainManager = (function (_super) {
        __extends(MainManager, _super);
        function MainManager() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        MainManager.prototype.register = function () {
            this.facade.registerCommand(MainNotify.OPEN_MAIN, MainManager);
            this.facade.registerCommand(MainNotify.CLOSE_MAIN, MainManager);
            this.facade.registerCommand(PanelNotify.CLOSE_STOP_BET, MainManager);
            this.facade.registerCommand(MainNotify.BET, MainManager);
        };
        MainManager.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            var panelCon = GameLayerManager.gameLayer().mainLayer;
            var mainUI = game.MainManager.mainUI;
            switch (notification.getName()) {
                case MainNotify.OPEN_MAIN:
                    if (mainUI == null) {
                        mainUI = new game.MainUIYDD();
                        panelCon.addChild(mainUI);
                        game.MainManager.mainUI = mainUI;
                    }
                    break;
                case MainNotify.CLOSE_MAIN:
                    if (mainUI != null) {
                        panelCon.removeChild(mainUI);
                        mainUI = null;
                        game.MainManager.mainUI = null;
                    }
                    break;
                case PanelNotify.CLOSE_STOP_BET:
                    if (mainUI != null) {
                        mainUI.SelectCard();
                    }
                    break;
                case MainNotify.BET:
                    this.bet(data);
                    break;
            }
        };
        /**
         * 下注
         * @param index 下注索引
         */
        MainManager.prototype.bet = function (index) {
            var value = AllData.instance.ballValue[index];
            if (AllData.instance.getMoneyIsEnough(value)) {
                AllData.instance.MyHDAG += value;
                AllData.instance.MyMoney -= value;
                game.MainManager.mainUI.refreshPlayerMoney();
                return true;
            }
            else {
                return false;
            }
        };
        MainManager.NAME = "MainManager";
        return MainManager;
    }(puremvc.SimpleCommand));
    game.MainManager = MainManager;
    __reflect(MainManager.prototype, "game.MainManager", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=MainManager.js.map