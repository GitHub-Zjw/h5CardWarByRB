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
var game;
(function (game) {
    var MainUIYDD = (function (_super) {
        __extends(MainUIYDD, _super);
        function MainUIYDD() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/ui/mainYDD/MainUIYDDSkin.exml";
            _this._cards = [_this.card1, _this.card2, _this.card3, _this.card4, _this.card5, _this.card6];
            _this._cardStarXs = [];
            _this._cardStarXs[0] = _this.card1.x;
            _this._cardStarXs[1] = _this.card2.x;
            _this._cardStarXs[2] = _this.card3.x;
            _this._cardStarXs[3] = _this.card4.x;
            _this._cardStarXs[4] = _this.card5.x;
            _this._cardStarXs[5] = _this.card6.x;
            _this._vsManBlackX = _this.vsManBlack_img.x;
            _this._vsManRedX = _this.vsManRed_img.x;
            _this._selectIndex = -1;
            return _this;
        }
        MainUIYDD.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        MainUIYDD.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._card1StarX = this.card1.x;
            this._card1StarY = this.card1.y;
            this.regitEvent();
            this.refreshMoneyLab();
            core.SoundUtils.getInstance().setMusicEnable(true);
        };
        MainUIYDD.prototype.regitEvent = function () {
            this.ball0_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball1_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball2_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball3_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball4_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball5_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.betDetails_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetDetailsBtnClick, this);
            this.betRecord_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetRecordsBtnClick, this);
            this.gameMethod_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameMethodBtnClick, this);
            this.prizeInfo_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeInfoBtnClick, this);
            this.regionRed_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegionClick, this);
            this.regionBlack_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegionClick, this);
            this.regionOther_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegionClick, this);
            this.bets_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetsBtn, this);
            this.withdraw_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBetsBtnClick, this);
            AllData.instance.addEventListener(GameNotify.GAME_STAR, this.onBegigGame, this);
            AllData.instance.addEventListener(GameNotify.STOP_BETS, this.onStopBet, this);
            AllData.instance.addEventListener(GameNotify.SEND_CARD, this.SendCard, this);
            this.begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBeginBtnClick, this);
            this.setCard_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetCardBtnClick, this);
            this.cardAmi_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardAmiBtnClick, this);
            this.ballAmi_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallAmiBtnClick, this);
            this.bigWinner_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBigWinnerBtnClick, this);
        };
        MainUIYDD.prototype.removeEvent = function () {
            this.ball0_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball1_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball2_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball3_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball4_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.ball5_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallBtnClick, this);
            this.betDetails_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetDetailsBtnClick, this);
            this.betRecord_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetRecordsBtnClick, this);
            this.gameMethod_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameMethodBtnClick, this);
            this.prizeInfo_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeInfoBtnClick, this);
            this.regionRed_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegionClick, this);
            this.regionBlack_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegionClick, this);
            this.regionOther_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegionClick, this);
            this.bets_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetsBtn, this);
            this.withdraw_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackBetsBtnClick, this);
            AllData.instance.removeEventListener(GameNotify.GAME_STAR, this.onBegigGame, this);
            AllData.instance.removeEventListener(GameNotify.STOP_BETS, this.onStopBet, this);
            AllData.instance.removeEventListener(GameNotify.SEND_CARD, this.SendCard, this);
            this.begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBeginBtnClick, this);
            this.setCard_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetCardBtnClick, this);
            this.cardAmi_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCardAmiBtnClick, this);
            this.ballAmi_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallAmiBtnClick, this);
            this.bigWinner_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBigWinnerBtnClick, this);
        };
        /**
         * 游戏开始
         */
        MainUIYDD.prototype.onBegigGame = function () {
            this.mengBan_btn.visible = false;
            this.blackResult_img.alpha = 0;
            this.redResult_img.alpha = 0;
            this._selectIndex = -1;
            if (this._selectedBall) {
                this._selectedBall.hideSelectedAmi();
            }
            this.regionRed.removeAllBall();
            this.regionBlack.removeAllBall();
            this.regionOther.removeAllBall();
            this.showBeginAmi();
        };
        /**
         * 停止下注
         */
        MainUIYDD.prototype.onStopBet = function () {
            this.mengBan_btn.visible = true;
            var self = this;
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_STOP_BET);
            this._selectIndex = -1;
            var temp = setTimeout(function () {
                game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_STOP_BET);
                clearTimeout(temp);
            }, 1500);
        };
        /**
         * 刷新下注金额
         */
        MainUIYDD.prototype.refreshMoneyLab = function () {
            this.moneyNumB_lab.text = AllData.instance.BleckMoneyNum.toString();
            this.moneyNumR_lab.text = AllData.instance.RedMoneyNum.toString();
            this.moneyNumO_lab.text = AllData.instance.OtherMoneyNum.toString();
        };
        /**刷新本人数据 */
        MainUIYDD.prototype.refreshPlayerMoney = function () {
            this.myHdag_lab.text = "" + AllData.instance.MyHDAG + " HDAG";
            this.myMoney_lab.text = "" + AllData.instance.MyMoney;
        };
        /**
         * 播放开始动画
         */
        MainUIYDD.prototype.showBeginAmi = function () {
            var self = this;
            var vsLeft = this.vsManBlack_img;
            var vsRight = this.vsManRed_img;
            vsLeft.visible = true;
            vsRight.visible = true;
            this.moveTw(vsLeft, -vsLeft.width, this._vsManBlackX, this.playAllLine);
            this.moveTw(vsRight, this.width, this._vsManRedX, this.playAllLine);
        };
        MainUIYDD.prototype.playAllLine = function () {
            this.regionBlack.playLineAmi();
            this.regionRed.playLineAmi();
            this.regionOther.playLineAmi();
            this.clock.starTiming(5); //fix
        };
        MainUIYDD.prototype.moveTw = function (uiCom, starX, endX, call) {
            var self = this;
            this.touchEnabled = false;
            uiCom.x = starX;
            var tw = egret.Tween.get(uiCom);
            tw.to({ x: endX }, 200)
                .wait(500)
                .to({ x: starX }, 150)
                .call(function () {
                self.touchEnabled = true;
                call.apply(self);
            }, self);
        };
        /**
         * 哈希选牌
         */
        MainUIYDD.prototype.SelectCard = function () {
            this.selectCardCom.showSelectAmi();
        };
        MainUIYDD.prototype.SendCard = function () {
            this.setCardData();
            this.playGetCardAmi();
        };
        /**
         * 设置卡牌数据
         */
        MainUIYDD.prototype.setCardData = function () {
            for (var i = 0; i < 6; i++) {
                this._cards[i].setCard(i);
            }
            this.blackResult_img.source = EnumerationType.CardType[AllData.instance.CardTypeB] + "_png";
            this.redResult_img.source = EnumerationType.CardType[AllData.instance.CardTypeR] + "_png";
        };
        /**
         * 播放发牌动画
         */
        MainUIYDD.prototype.playGetCardAmi = function () {
            this.showHXUI();
            if (this._cac == null) {
                this._cac = new ContinueAmiChain(50);
                var len = this._cards.length;
                var cardCenterXs = [521, 557, 596, 218, 254, 290];
                var cardCenterY = 59;
                var cardCenterS = 1.65;
                //设置发牌起始位置
                for (var i = 0; i < len; i++) {
                    this._cac.registerAction(this.setCardStarTF, this, 0, 0, this._cards[i]);
                }
                //发牌
                for (var i = 0; i < len; i++) {
                    var value = { com: this._cards[i], endX: cardCenterXs[i], endY: cardCenterY, sX: cardCenterS, sY: cardCenterS, time: 100 };
                    var starTime = i == 0 ? 0 : -1;
                    var needTime = 2;
                    this._cac.registerAction(this.playMoveAmi, this, starTime, needTime, value);
                }
                //翻前两张牌
                this._cac.registerAction(this.playOpenCardAmi, this, 10, 4);
                //增加哈希列表动画
                this.playHXItemAmi();
                //飘字动画
                this._cac.registerAction(this.playMoveLabAmi, this, 0, 20);
                //飘完亮黄框
                this._cac.registerAction(this.showWinK, this, 0, 0);
                //隐藏选牌界面
                this._cac.registerAction(this.hideHXUI, this, 20, 0);
                //卡牌归位置
                for (var i = 0; i < len; i++) {
                    var value = { com: this._cards[i], endX: this._cardStarXs[i], endY: this._card1StarY, sX: 1, sY: 1, time: 500 };
                    var needTime = 10;
                    var starTime = i == 0 ? 0 : -needTime;
                    this._cac.registerAction(this.playMoveAmi, this, starTime, needTime, value);
                }
                //翻黑牌第三张
                this._cac.registerAction(this._cards[2].showOpenCardAmi, this._cards[2], 0, 18, true);
                //显示黑牌牌型
                this._cac.registerAction(this.playCardResultAmiL, this, 0, 4);
                //翻红牌第三张牌
                this._cac.registerAction(this._cards[5].showOpenCardAmi, this._cards[5], 0, 18, true);
                //显示红牌牌型
                this._cac.registerAction(this.playCardResultAmiR, this, 0, 4);
                //显示胜利区域
                this._cac.registerAction(this.showWinner, this, 0, 27);
                //显示记录分数面板
                this._cac.registerAction(this.scoreBoard.addWinner, this.scoreBoard, 0, 0);
            }
            this._cac.play();
        };
        MainUIYDD.prototype.playCardResultAmiL = function () {
            egret.Tween.get(this.blackResult_img).to({ alpha: 1 }, 200);
        };
        MainUIYDD.prototype.playCardResultAmiR = function () {
            egret.Tween.get(this.redResult_img).to({ alpha: 1 }, 100);
        };
        MainUIYDD.prototype.playHXItemAmi = function () {
            if (this._cac == null) {
                return;
            }
            var len = AllData.instance.HX_ItemData.length;
            for (var i = 1; i <= len; i++) {
                this._cac.registerAction(this.setHXListData, this, 10, 0, i);
            }
        };
        MainUIYDD.prototype.setHXListData = function (count) {
            this.hxList.dataProvider = new eui.ArrayCollection(AllData.instance.getHXItemDataByNum(count));
        };
        MainUIYDD.prototype.showHXUI = function () {
            this.hx_group.visible = true;
            this.hxList.itemRenderer = HxItem;
            this.oneHXNum_lab.textFlow = (new egret.HtmlTextParser).parser(AllData.instance.getOneHXStr());
            this.twoHXNum_lab.textFlow = (new egret.HtmlTextParser).parser(AllData.instance.getTwoHXStr());
            this.move_lab.visible = false;
            this.kuangR_img.visible = false;
            this.kuangL_img.visible = false;
            this.setHXListData(0);
        };
        MainUIYDD.prototype.playMoveLabAmi = function () {
            this.move_lab.x = 436;
            this.move_lab.y = 272;
            this.move_lab.text = AllData.instance.getMoveChat();
            var endX = 0;
            var endY = this.oneHXNum_lab.y;
            var winner = AllData.instance.Winner;
            var changeLab;
            if (winner == EnumerationType.RegionWinner.black || winner == EnumerationType.RegionWinner.blackS) {
                endX = this.twoHXNum_lab.x + this.twoHXNum_lab.size * AllData.instance.getMoveNum();
                changeLab = this.twoHXNum_lab;
            }
            else {
                endX = this.oneHXNum_lab.x + this.oneHXNum_lab.size * AllData.instance.getMoveNum();
                changeLab = this.oneHXNum_lab;
            }
            this.move_lab.visible = true;
            var self = this;
            egret.Tween.get(this.move_lab).to({ x: endX, y: endY }, 1000)
                .call(function () {
                self.move_lab.visible = false;
                var str = AllData.instance.getWinHXstr();
                changeLab.textFlow = (new egret.HtmlTextParser).parser(str);
            });
        };
        MainUIYDD.prototype.showWinK = function () {
            var winner = AllData.instance.Winner;
            if (winner == EnumerationType.RegionWinner.black || winner == EnumerationType.RegionWinner.blackS) {
                this.kuangR_img.visible = true;
            }
            else {
                this.kuangL_img.visible = true;
            }
        };
        MainUIYDD.prototype.hideHXUI = function () {
            this.hx_group.visible = false;
        };
        MainUIYDD.prototype.setCardStarTF = function (com) {
            com.scaleX = 1.65;
            com.scaleY = 1.65;
            com.x = 404;
            com.y = 108;
            com.visible = true;
        };
        MainUIYDD.prototype.playOpenCardAmi = function () {
            var cards = this._cards;
            this.playOpenTwoCardAmi(cards[0], cards[1], cards[2]);
            this.playOpenTwoCardAmi(cards[3], cards[4], cards[5]);
        };
        MainUIYDD.prototype.playOpenTwoCardAmi = function (card1, card2, card3) {
            var starX1 = card1.x;
            var starX3 = card3.x;
            egret.Tween.get(card1).to({ x: card2.x }, 100)
                .call(function () { card1.openSelf(); card2.openSelf(); })
                .to({ x: starX1 }, 100);
            egret.Tween.get(card3).to({ x: card2.x }, 100)
                .to({ x: starX3 }, 100);
        };
        /**
         * 播放移动动画
         */
        MainUIYDD.prototype.playMoveAmi = function (value) {
            egret.Tween.removeTweens(value.com);
            egret.Tween.get(value.com).to({ x: value.endX, y: value.endY, scaleX: value.sX, scaleY: value.sY }, value.time);
        };
        MainUIYDD.prototype.showWinner = function () {
            var winner = AllData.instance.Winner;
            switch (winner) {
                case EnumerationType.RegionWinner.black:
                    this.regionBlack.showWinAmi();
                    break;
                case EnumerationType.RegionWinner.blackS:
                    this.regionBlack.showWinAmi();
                    this.regionOther.showWinAmi();
                    break;
                case EnumerationType.RegionWinner.red:
                    this.regionRed.showWinAmi();
                    break;
                case EnumerationType.RegionWinner.redS:
                    this.regionRed.showWinAmi();
                    this.regionOther.showWinAmi();
                    break;
                default:
                    break;
            }
        };
        MainUIYDD.prototype.playLeftGetCardAmi = function (index, speed) {
            if (speed === void 0) { speed = 300; }
            var card = this._cards[index];
            var endX = this._cardStarXs[index];
            var starX = this.width / 2 - card.width / 2;
            var centerX = this._card1StarX;
            var endTime = (endX - centerX) / speed * 1000;
            card.x = starX;
            card.visible = true;
            egret.Tween.removeTweens(card);
            this._GetCardAmiL = egret.Tween.get(card);
            this._GetCardAmiL.to({ x: centerX }, 300)
                .to({ x: endX }, endTime);
        };
        MainUIYDD.prototype.playRightGetCardAmi = function (index, speed) {
            if (speed === void 0) { speed = 300; }
            var card = this._cards[index];
            var endX = this._cardStarXs[index];
            var starX = this.width / 2 + card.width / 2;
            card.x = starX;
            card.visible = true;
            var endTime = (endX - starX) / speed * 1000;
            this._getCardAmiR = egret.Tween.get(card);
            this._getCardAmiR.to({ x: endX }, endTime);
        };
        MainUIYDD.prototype.onBetDetailsBtnClick = function (ent) {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BET_DETAIL, true);
        };
        MainUIYDD.prototype.onBetRecordsBtnClick = function (ent) {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BET_DETAIL, false);
        };
        MainUIYDD.prototype.onGameMethodBtnClick = function (ent) {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_METHOD, true);
        };
        MainUIYDD.prototype.onPrizeInfoBtnClick = function (ent) {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_METHOD, false);
        };
        MainUIYDD.prototype.onRegionClick = function (ent) {
            if (this._selectIndex >= 0) {
                var value = AllData.instance.ballValue[this._selectIndex];
                if (AllData.instance.getMoneyIsEnough(value, true)) {
                    game.AppFacade.getInstance().sendNotification(MainNotify.BET, this._selectIndex);
                    var indexs = [this._selectIndex];
                    var id = [AllData.instance.playerInfo.id];
                    var btn = ent.target;
                    switch (btn) {
                        case this.regionRed_btn:
                            this.regionRed.addBall(indexs, id, true);
                            break;
                        case this.regionBlack_btn:
                            this.regionBlack.addBall(indexs, id, true);
                            break;
                        case this.regionOther_btn:
                            this.regionOther.addBall(indexs, id, true);
                            break;
                    }
                }
            }
        };
        MainUIYDD.prototype.onBetsBtn = function (e) {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_INPUT_PASSWORD);
        };
        MainUIYDD.prototype.onBackBetsBtnClick = function (e) {
            //todo
            TipsUtils.showTipsFromCenter("撤回失败(＞﹏＜)", false);
        };
        MainUIYDD.prototype.onBallBtnClick = function (ent) {
            if (this._selectedBall) {
                this._selectedBall.hideSelectedAmi();
            }
            var btn = ent.target;
            this._selectedBall = btn;
            btn.showSelectedAmi();
            core.SoundUtils.getInstance().playSound(2);
            switch (btn) {
                case this.ball0_btn:
                    this._selectIndex = 0;
                    console.log("倍数为=========0");
                    break;
                case this.ball1_btn:
                    this._selectIndex = 1;
                    console.log("倍数为=========1");
                    break;
                case this.ball2_btn:
                    this._selectIndex = 2;
                    console.log("倍数为=========2");
                    break;
                case this.ball3_btn:
                    this._selectIndex = 3;
                    console.log("倍数为=========3");
                    break;
                case this.ball4_btn:
                    this._selectIndex = 4;
                    console.log("倍数为=========4");
                    break;
                case this.ball5_btn:
                    this._selectIndex = 5;
                    console.log("倍数为=========5");
                    break;
            }
        };
        MainUIYDD.prototype.onBeginBtnClick = function () {
            // this.showBeginAmi();
            AllData.instance.dispatchEventWith(GameNotify.GAME_STAR);
            this.refreshMoneyLab();
            core.SoundUtils.getInstance().playSound(1, 0);
        };
        MainUIYDD.prototype.onSetCardBtnClick = function () {
            AllData.instance.testSetData();
            this.setCardData();
        };
        MainUIYDD.prototype.onCardAmiBtnClick = function () {
            this.playGetCardAmi();
        };
        MainUIYDD.prototype.onBallAmiBtnClick = function () {
            var ballNum = AllData.instance.getRandomInt(1, 10);
            var ballIndexs = [];
            var ballId = [];
            this.regionRed.removeAllBall();
            this.regionBlack.removeAllBall();
            this.regionOther.removeAllBall();
            for (var i = 0; i < ballNum; i++) {
                var ballIndex = AllData.instance.getRandomInt(0, 5);
                ballIndexs.push(ballIndex);
                ballId.push("6566655asd");
            }
            this.regionRed.addBall(ballIndexs, ballId);
            this.regionBlack.addBall(ballIndexs, ballId);
            this.regionOther.addBall(ballIndexs, ballId);
            this.refreshPlayerMoney();
        };
        MainUIYDD.prototype.onBigWinnerBtnClick = function () {
            game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BIG_WINNER);
        };
        return MainUIYDD;
    }(eui.Component));
    game.MainUIYDD = MainUIYDD;
    __reflect(MainUIYDD.prototype, "game.MainUIYDD");
})(game || (game = {}));
//# sourceMappingURL=MainUIYDD.js.map