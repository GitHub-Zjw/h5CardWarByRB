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
var passWord;
(function (passWord) {
    var PassWordMediator = (function (_super) {
        __extends(PassWordMediator, _super);
        function PassWordMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            return _super.call(this, PassWordMediator.NAME, viewComponent) || this;
        }
        PassWordMediator.prototype.listNotificationInterests = function () {
            return [
                PanelNotify.OPEN_INPUT_PASSWORD,
                PanelNotify.CLOSE_INPUT_PASSWORD
            ];
        };
        PassWordMediator.prototype.handleNotification = function (notification) {
            var badyData = notification.getBody();
            switch (notification.getName()) {
                case PanelNotify.OPEN_INPUT_PASSWORD:
                    var group = "passWord"; //要确保
                    if (RES.getRes("srbmBg_png")) {
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
                case PanelNotify.CLOSE_INPUT_PASSWORD:
                    this.closePanel(1);
                    break;
            }
        };
        PassWordMediator.prototype.showMainUI = function () {
            if (this._passWordPanel == null) {
                this._passWordPanel = new passWord.PassWordPanel();
            }
            this.showUI(this._passWordPanel, true, 384, 191, 1);
        };
        PassWordMediator.prototype.stLoadProcess = function () { };
        PassWordMediator.prototype.error = function () {
            console.warn("资源加载失败：passWord");
        };
        /**
         * 面板关闭后需要销毁的对象
         */
        PassWordMediator.prototype.destroy = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showMainUI, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
            this._passWordPanel = null;
            _super.prototype.destroy.call(this);
        };
        PassWordMediator.NAME = "PassWordMediator";
        return PassWordMediator;
    }(BasePanelMediator));
    passWord.PassWordMediator = PassWordMediator;
    __reflect(PassWordMediator.prototype, "passWord.PassWordMediator");
})(passWord || (passWord = {}));
//# sourceMappingURL=PassWordMediator.js.map