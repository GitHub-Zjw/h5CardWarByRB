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
    var GameMethodPanel = (function (_super) {
        __extends(GameMethodPanel, _super);
        function GameMethodPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panelYDD/GameMethod/GameMethodPanelSkin.exml";
            return _this;
        }
        GameMethodPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        GameMethodPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.details_scl.verticalScrollBar.visible = false;
            this.details_scl.verticalScrollBar.autoVisibility = false;
            this.details_list.itemRenderer = gameMethod.GameMethodItem;
            this.details_list.dataProvider = this.listData();
        };
        GameMethodPanel.prototype.listData = function () {
            var returnValue = new eui.ArrayCollection(AllData.instance.GmaeMethItemTypeDatas);
            return returnValue;
        };
        GameMethodPanel.prototype.onBtnClick = function (e) {
            _super.prototype.onBtnClick.call(this, e);
            var btn = e.target;
            switch (btn) {
                case this.close_btn:
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_GAME_METHOD);
                    break;
            }
        };
        return GameMethodPanel;
    }(ZjwComponent));
    gameMethod.GameMethodPanel = GameMethodPanel;
    __reflect(GameMethodPanel.prototype, "gameMethod.GameMethodPanel");
})(gameMethod || (gameMethod = {}));
//# sourceMappingURL=GameMethodPanel.js.map