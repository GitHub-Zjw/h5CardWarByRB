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
  * 注册mediator
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var ViewPrepCommand = (function (_super) {
        __extends(ViewPrepCommand, _super);
        function ViewPrepCommand() {
            return _super.call(this) || this;
        }
        ViewPrepCommand.prototype.execute = function (notification) {
            var main = GameLayerManager.gameLayer().panelLayer;
            this.facade.registerMediator(new game.RoleMediator());
            this.facade.registerMediator(new game.BackpackMediator());
            this.facade.registerMediator(new game.QianghuaMediator());
            this.facade.registerMediator(new game.ZhaoXianMediator());
            this.facade.registerMediator(new game.ChuangDangMediator());
            this.facade.registerMediator(new game.ShopMediator());
            this.facade.registerMediator(new game.MapMediator());
            this.facade.registerMediator(new StopBetMediator());
            this.facade.registerMediator(new betDetails.BetDetailsMediator());
            this.facade.registerMediator(new gameMethod.GameMethodMediator());
            this.facade.registerMediator(new bigWinner.BigWinnerMediator());
            this.facade.registerMediator(new passWord.PassWordMediator());
        };
        return ViewPrepCommand;
    }(puremvc.SimpleCommand));
    game.ViewPrepCommand = ViewPrepCommand;
    __reflect(ViewPrepCommand.prototype, "game.ViewPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=ViewPrepCommand.js.map