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
    var PassWordPanel = (function (_super) {
        __extends(PassWordPanel, _super);
        function PassWordPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/panelYDD/passWord/PassWordPanelSkin.exml";
            return _this;
        }
        PassWordPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        PassWordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PassWordPanel.prototype.initView = function () {
            _super.prototype.initView.call(this);
            this.input_elab.restrict = "0-9";
            this.cencle_btn.labelDisplay.size = 13;
            this.ok_btn.labelDisplay.size = 13;
        };
        /**
         * 添加事件
         */
        PassWordPanel.prototype.addEvent = function () {
            _super.prototype.addEvent.call(this);
            this.input_elab.addEventListener(egret.Event.CHANGE, this.onInputPw, this);
        };
        /**
         * 移除事件
         */
        PassWordPanel.prototype.removeEvent = function () {
            _super.prototype.removeEvent.call(this);
            this.input_elab.removeEventListener(egret.Event.CHANGE, this.onInputPw, this);
        };
        PassWordPanel.prototype.onBtnClick = function (e) {
            var btn = e.target;
            switch (btn) {
                case this.cencle_btn:
                    game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_INPUT_PASSWORD);
                    break;
                case this.ok_btn:
                    console.log("密码是：" + this.input_elab.text); //to do
                    break;
            }
        };
        PassWordPanel.prototype.onInputPw = function (e) {
            this.tip_lab.visible = false;
        };
        return PassWordPanel;
    }(ZjwComponent));
    passWord.PassWordPanel = PassWordPanel;
    __reflect(PassWordPanel.prototype, "passWord.PassWordPanel");
})(passWord || (passWord = {}));
//# sourceMappingURL=PassWordPanel.js.map