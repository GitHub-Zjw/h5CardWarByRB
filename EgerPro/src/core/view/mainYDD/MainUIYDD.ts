module game
{
	export class MainUIYDD extends eui.Component
	{
		public blackMan_img: eui.Image;
		public redMan_img: eui.Image;
		public vsManBlack_img: eui.Image;
		public vsManRed_img: eui.Image;
		public card1: Card;
		public card2: Card;
		public card3: Card;
		public card4: Card;
		public card5: Card;
		public card6: Card;
		public ball5_btn: BallBtn;
		public ball4_btn: BallBtn;
		public ball3_btn: BallBtn;
		public ball2_btn: BallBtn;
		public ball1_btn: BallBtn;
		public ball0_btn: BallBtn;
		public regionRed: RegionRed;
		public regionBlack: RegionBlack;
		public regionOther: RegionOther;
		public regionRed_btn: eui.Button;
		public regionBlack_btn: eui.Button;
		public regionOther_btn: eui.Button;
		public moneyNumR_lab: eui.Label;
		public moneyNumB_lab: eui.Label;
		public moneyNumO_lab: eui.Label;
		public myBetOther_lab: eui.Label;
		public myBetRed_lab: eui.Label;
		public myBetBlack_lab: eui.Label;
		public myHdag_lab: eui.Label;
		public myMoney_lab: eui.Label;
		public withdraw_btn: eui.Button;
		public bets_btn: eui.Button;
		public clock: Clock;
		public mengBan_btn: eui.Button;
		public selectCardCom: SelectCarding;
		public blackResult_img: eui.Image;
		public redResult_img: eui.Image;
		public scoreBoard: Scoreboard;
		public betDetails_btn: eui.Button;
		public betRecord_btn: eui.Button;
		public prizeInfo_btn: eui.Button;
		public gameMethod_btn: eui.Button;

		public hx_group: eui.Group;
		public oneHXNum_lab: eui.Label;
		public twoHXNum_lab: eui.Label;
		public hxList: eui.List;
		public kuangL_img: eui.Image;
		public kuangR_img: eui.Image;
		public hxpanel_scr: eui.Scroller;
		public move_lab: eui.Label

		private _selectedBall: BallBtn;
		private _selectIndex: number;
		private _timer: egret.Timer;
		private _cards: Card[];
		private _GetCardAmiL: egret.Tween;
		private _getCardAmiR: egret.Tween;
		private _timeNum: number;
		private _card1StarX: number;
		private _card1StarY: number;
		private _cardStarXs: number[];
		private _vsManBlackX: number;
		private _vsManRedX: number;
		private _cac: ContinueAmiChain;
		private _isFirstOpenGame: boolean = true;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/mainYDD/MainUIYDDSkin.exml";
			this._cards = [this.card1, this.card2, this.card3, this.card4, this.card5, this.card6];
			this._cardStarXs = [];
			this._cardStarXs[0] = this.card1.x;
			this._cardStarXs[1] = this.card2.x;
			this._cardStarXs[2] = this.card3.x;
			this._cardStarXs[3] = this.card4.x;
			this._cardStarXs[4] = this.card5.x;
			this._cardStarXs[5] = this.card6.x;
			this._vsManBlackX = this.vsManBlack_img.x;
			this._vsManRedX = this.vsManRed_img.x;
			this._selectIndex = -1;
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
			this._card1StarX = this.card1.x;
			this._card1StarY = this.card1.y;
			this.regitEvent();
			this.refreshMoneyLab();
			core.SoundUtils.getInstance().setMusicEnable(true);
		}

		private regitEvent(): void
		{
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


			this.begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBeginBtnClick, this);
			this.setCard_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetCardBtnClick, this);
			this.ballAmi_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallAmiBtnClick, this);
		}

		private removeEvent(): void
		{
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



			this.begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBeginBtnClick, this);
			this.setCard_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetCardBtnClick, this);
			this.ballAmi_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBallAmiBtnClick, this)
		}

		/**
		 * 游戏开始
		 */
		public onBegigGame(): void
		{
			this.mengBan_btn.visible = false;
			this.blackResult_img.alpha = 0;
			this.redResult_img.alpha = 0;
			this._selectIndex = -1;
			if (this._selectedBall)
			{
				this._selectedBall.hideSelectedAmi();
			}
			this.regionRed.removeAllBall();
			this.regionBlack.removeAllBall();
			this.regionOther.removeAllBall();
			AllData.instance.withdrawBet();

			let starPoint = 0;
			if (this._isFirstOpenGame)
			{
				let currentSecond = AllData.instance.getCurrentSecond();
				egret.log("游戏执行到" + currentSecond + "秒");
				this._isFirstOpenGame = false;
				if (currentSecond <= 4)
				{
					this.showBeginAmi();
				}
				else if (currentSecond < 28)
				{//处于25秒倒计时内
					this.playAllLine(28 - currentSecond);
				}
				else
				{
					GameResultRequest.sendGameResultRequest();
				}
			}
			else
			{
				this.showBeginAmi();
			}
			// this.showBeginAmi();
			// if (this._cac == null)
			// {
			// 	this._cac = new ContinueAmiChain(50);
			// 	//播放开始动画 3
			// 	this._cac.registerAction(this.showBeginAmi, this, 0, 60);
			// 	//倒计时 25
			// 	this._cac.registerAction(this.playAllLine, this, 0, 500);
			// 	//停止下注 1.5
			// 	this._cac.registerAction(this.onStopBet, this, 0, 30);
			// 	//显示哈希选牌界面 0
			// 	this._cac.registerAction(this.showHXUI, this, 0, 0);
			// 	//设置卡牌数据 0
			// 	this._cac.registerAction(this.setCardData, this, 0, 0);

			// 	let len = this._cards.length;
			// 	let cardCenterXs = [521, 557, 596, 218, 254, 290];
			// 	let cardCenterY = 59;
			// 	let cardCenterS = 1.65;
			// 	//设置发牌起始位置 0
			// 	for (let i = 0; i < len; i++)
			// 	{
			// 		this._cac.registerAction(this.setCardStarTF, this, 0, 0, this._cards[i]);
			// 	}
			// 	//发牌 0.7
			// 	for (let i = 0; i < len; i++)
			// 	{
			// 		let value = { com: this._cards[i], endX: cardCenterXs[i], endY: cardCenterY, sX: cardCenterS, sY: cardCenterS, time: 200 };
			// 		let starTime = i == 0 ? 0 : -2;
			// 		let needTime = 4;
			// 		this._cac.registerAction(this.playSendCardMoveAmi, this, starTime, needTime, value);
			// 	}
			// 	//翻前两张牌 1
			// 	this._cac.registerAction(this.playOpenCardAmi, this, 10, 10);
			// 	//增加哈希列表动画 1
			// 	this.playHXItemAmi();
			// 	//飘字动画 1
			// 	this._cac.registerAction(this.playMoveLabAmi, this, 0, 20);
			// 	//飘完亮黄框 1
			// 	this._cac.registerAction(this.showWinK, this, 10, 10);
			// 	//隐藏选牌界面 1
			// 	this._cac.registerAction(this.hideHXUI, this, 20, 0);
			// 	//卡牌归位置 1
			// 	for (let i = 0; i < len; i++)
			// 	{
			// 		let value = { com: this._cards[i], endX: this._cardStarXs[i], endY: this._card1StarY, sX: 1, sY: 1, time: 1000 };
			// 		let needTime = 20;
			// 		let starTime = i == 0 ? 0 : -needTime;
			// 		this._cac.registerAction(this.playBackCardMoveAmi, this, starTime, needTime, value);
			// 	}
			// 	//翻黑牌第三张 1
			// 	this._cac.registerAction(this.showCard3OpenAmi, this, 0, 20, true);
			// 	//显示黑牌牌型 0.5
			// 	this._cac.registerAction(this.playCardResultAmiL, this, 0, 10);
			// 	//翻红牌第三张牌 1
			// 	this._cac.registerAction(this.showCard6OpenAmi, this, 0, 20, true);
			// 	//显示红牌牌型 0.5
			// 	this._cac.registerAction(this.playCardResultAmiR, this, 0, 10);
			// 	//显示胜利区域 3
			// 	this._cac.registerAction(this.showWinner, this, 0, 60);
			// 	//显示记录分数面板 0
			// 	this._cac.registerAction(this.scoreBoard.addWinner, this.scoreBoard, -10, 10);
			// 	//显示大赢家 2.8
			// 	this._cac.registerAction(this.playShowBigWinner, this, 0, 56);
			// }
			// this._cac.play(starPoint);
		}

		/**
		 * 停止下注
		 */
		public onStopBet(): void
		{
			// if (this._isFirstOpenGame)
			// {
			// 	return;
			// }
			this.mengBan_btn.visible = true;
			let self = this;
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_STOP_BET);
			this._selectIndex = -1;
			// let temp = setTimeout(function ()
			// {
			// 	game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_STOP_BET);
			// 	clearTimeout(temp);
			// }, 1500);
			GameResultRequest.sendGameResultRequest();
		}

		/**
		 * 刷新下注金额
		 */
		public refreshMoneyLab(): void
		{
			this.moneyNumB_lab.text = AllData.instance.BleckMoneyNum.toString();
			this.moneyNumR_lab.text = AllData.instance.RedMoneyNum.toString();
			this.moneyNumO_lab.text = AllData.instance.OtherMoneyNum.toString();
			this.myBetRed_lab.text = AllData.instance.PlayerBetRed.toString();
			this.myBetBlack_lab.text = AllData.instance.PlayerBetBlack.toString();
			this.myBetOther_lab.text = AllData.instance.PlayerBetOther.toString();
			this.myHdag_lab.text = AllData.instance.MyHDAG.toString();
		}

		/**刷新计分面板数据 */
		public refreshScoreBoard(): void
		{
			this.scoreBoard.addAllWinner();
		}

		/**刷新本人数据 */
		public refreshPlayerMoney(): void
		{
			this.myHdag_lab.text = "" + AllData.instance.MyHDAG + " HDAG";
			this.myMoney_lab.text = "" + AllData.instance.MyMoney;
		}

		/**
		 * 下注成功
		 */
		public onBetSecceed(): void
		{
			this.regionBlack.onBetSucceed();
			this.regionRed.onBetSucceed();
			this.regionOther.onBetSucceed();
			this.refreshMoneyLab();
			this.refreshPlayerMoney();
		}

		/**
		 * 播放开始动画
		 */
		public showBeginAmi(): void
		{
			if (this._isFirstOpenGame)
			{
				this._isFirstOpenGame = false;
			}
			let self = this;
			let vsLeft = this.vsManBlack_img;
			let vsRight = this.vsManRed_img;

			vsLeft.visible = true;
			vsRight.visible = true;

			this.moveTw(vsLeft, -vsLeft.width, this._vsManBlackX, this.playAllLine);
			this.moveTw(vsRight, this.width, this._vsManRedX);
			core.SoundUtils.getInstance().playSound(10);
		}

		private playAllLine(surplusTime: number = 0): void
		{
			if (!surplusTime)
			{
				surplusTime = 28 - AllData.instance.getCurrentSecond();
			}
			this.regionBlack.playLineAmi();
			this.regionRed.playLineAmi();
			this.regionOther.playLineAmi();

			this.clock.starTiming(surplusTime, this.onStopBet);
			core.SoundUtils.getInstance().playSound(11);
		}

		private getResultData(): void
		{ }

		private moveTw(uiCom: eui.UIComponent, starX: number, endX: number, call?: Function): void
		{
			let self = this;
			this.touchEnabled = false;
			uiCom.x = starX;

			let tw = egret.Tween.get(uiCom);
			tw.to({ x: endX }, 500)
				.wait(1000)
				.to({ x: starX }, 500)
				.wait(1000)
				.call(function ()
				{
					if (call)
					{
						call.apply(this);
					}
				}, this);
		}

		/**
		 * 哈希选牌
		 */
		public SelectCard(): void
		{
			// this.selectCardCom.showSelectAmi();
			AllData.instance.dispatchEventWith(GameNotify.SEND_CARD);
		}

		/**
		 * 设置卡牌数据
		 */
		public setCardData(): void
		{
			for (let i = 0; i < 6; i++)
			{
				this._cards[i].setCard(i);
			}
			this.blackResult_img.source = EnumerationType.CardType[AllData.instance.CardTypeB] + "_png";
			this.redResult_img.source = EnumerationType.CardType[AllData.instance.CardTypeR] + "_png";
		}

		private playCardResultAmiL(): void
		{
			this.changeAlpha(this.blackResult_img, 500, this.showCard6OpenAmi);
			let soundId = AllData.instance.CardTypeB;
			core.SoundUtils.getInstance().playSound(soundId);
		}

		private playCardResultAmiR(): void
		{
			this.changeAlpha(this.redResult_img, 500, this.showWinner);
			let soundId = AllData.instance.CardTypeR;
			core.SoundUtils.getInstance().playSound(soundId);
		}

		private changeAlpha(com: eui.Image, time: number, call?: Function): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			egret.Tween.get(com).to({ alpha: 1 }, time)
				.call(function ()
				{
					if (call)
					{
						call.apply(this);
					}
				}, this);
		}

		private playShowBigWinner(): void
		{
			if (this._isFirstOpenGame)
			{
				this._isFirstOpenGame = false;
			}
			if (AllData.instance.BigWinnerDatas.length > 0)
			{
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BIG_WINNER, true);
			}
		}

		/**增加哈希列表动画 1 */
		private playHXItemAmi(): void
		{
			if (this._cac == null)
			{
				return;
			}
			let len = AllData.instance.HX_ItemData.length;
			let speed = Math.floor(1000 / len);
			for (let i = 0; i < len; i++)
			{
				// this._cac.registerAction(this.setHXListData, this, speed, 0, i);
				let self = this;
				let temp = setTimeout(function ()
				{
					self.setHXListData(i + 1);
					clearTimeout(temp);
					if (i == len - 1)
					{
						self.playMoveLabAmi();
					}
				}, i * speed);
			}
		}

		private setHXListData(count: number): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			this.hxList.dataProvider = new eui.ArrayCollection(AllData.instance.getHXItemDataByNum(count));
		}

		private showHXUI(): void
		{
			this.hx_group.visible = true;
			this.hxList.itemRenderer = HxItem;
			this.oneHXNum_lab.textFlow = (new egret.HtmlTextParser).parser(AllData.instance.getOneHXStr());
			this.twoHXNum_lab.textFlow = (new egret.HtmlTextParser).parser(AllData.instance.getTwoHXStr());
			this.move_lab.visible = false;
			this.kuangR_img.visible = false;
			this.kuangL_img.visible = false;
			this.setHXListData(0);
			this.setCardData();
			game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_STOP_BET);
		}

		/**发牌 */
		private openCards(): void
		{
			let len = this._cards.length;
			let cardCenterXs = [521, 557, 596, 218, 254, 290];
			let cardCenterY = 59;
			let cardCenterS = 1.65;
			//设置发牌起始位置 0
			for (let i = 0; i < len; i++)
			{
				this.setCardStarTF(this._cards[i]);
			}
			//发牌 0.7
			let i = 0;
			for (; i < len - 1; i++)
			{
				let starTime = i * 100;
				let value = { com: this._cards[i], endX: cardCenterXs[i], endY: cardCenterY, sX: cardCenterS, sY: cardCenterS, time: 200, waitTime: starTime };
				this.playSendCardMoveAmi(value);
			}
			let starTime = i * 100;
			let value = { com: this._cards[i], endX: cardCenterXs[i], endY: cardCenterY, sX: cardCenterS, sY: cardCenterS, time: 200, waitTime: starTime, call: this.playOpenCardAmi };
			this.playSendCardMoveAmi(value);
		}

		/**飘字动画 */
		private playMoveLabAmi(): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			this.move_lab.x = 436;
			this.move_lab.y = 272;
			this.move_lab.text = AllData.instance.getMoveChat();
			let endX = 0;
			let endY = this.oneHXNum_lab.y;
			let winner = AllData.instance.Winner;
			let changeLab: eui.Label;
			if (winner == EnumerationType.RegionWinner.black || winner == EnumerationType.RegionWinner.blackS)
			{
				endX = this.twoHXNum_lab.x + this.twoHXNum_lab.size * AllData.instance.getMoveNum();
				changeLab = this.twoHXNum_lab;
			}
			else
			{
				endX = this.oneHXNum_lab.x + this.oneHXNum_lab.size * AllData.instance.getMoveNum();
				changeLab = this.oneHXNum_lab;
			}
			this.move_lab.visible = true;
			let self = this;
			egret.Tween.get(this.move_lab).to({ x: endX, y: endY }, 1000)
				.call(function ()
				{
					self.move_lab.visible = false;
					let str = AllData.instance.getWinHXstr();
					changeLab.textFlow = (new egret.HtmlTextParser).parser(str);
				})
				.wait(100)
				.call(function ()
				{
					self.showWinK();
				})
				.wait(300)
				.call(function ()
				{
					self.hideHXUI();
				});
		}

		//卡牌归位
		private playCardBackAmi(): void
		{
			let len = this._cards.length;
			let i = 0
			for (; i < len - 1; i++)
			{
				let value = { com: this._cards[i], endX: this._cardStarXs[i], endY: this._card1StarY, sX: 1, sY: 1, time: 1000 };
				this.playBackCardMoveAmi(value);
			}
			let value = { com: this._cards[i], endX: this._cardStarXs[i], endY: this._card1StarY, sX: 1, sY: 1, time: 1000, call: this.showCard3OpenAmi };
			this.playBackCardMoveAmi(value);
		}

		private showWinK(): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			let winner = AllData.instance.Winner;
			if (winner == EnumerationType.RegionWinner.black || winner == EnumerationType.RegionWinner.blackS)
			{
				this.kuangR_img.visible = true;
			}
			else
			{
				this.kuangL_img.visible = true;
			}
		}

		private hideHXUI(): void
		{
			this.hx_group.visible = false;
		}

		private setCardStarTF(com: eui.UIComponent): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			com.scaleX = 1.65;
			com.scaleY = 1.65;
			com.x = 404;
			com.y = 108;
			com.visible = true;
		}
		/**翻前两张牌 1 */
		private playOpenCardAmi(): void
		{
			if (this._isFirstOpenGame)
			{
				this.beforePlayOpenCardAmi();
			}
			let cards = this._cards;
			this.playOpenTwoCardAmi(cards[0], cards[1], cards[2], this.playHXItemAmi);
			this.playOpenTwoCardAmi(cards[3], cards[4], cards[5]);
		}

		private beforePlayOpenCardAmi(): void
		{
			this._isFirstOpenGame = false;
			this.showHXUI();
			let len = this._cards.length;
			let cardCenterXs = [521, 557, 596, 218, 254, 290];
			for (let i = 0; i < len; i++)
			{
				this._cards[i].visible = true;
				this._cards[i].x = cardCenterXs[i];
				this._cards[i].y = 59;
				this._cards[i].scaleX = this._cards[i].scaleY = 1.65;
			}
		}

		private showCard(): void
		{
			let len = this._cards.length;
			for (let i = 0; i < len; i++)
			{
				this._cards[i].visible = true;
			}
		}

		private playOpenTwoCardAmi(card1: Card, card2: Card, card3: Card, call?: Function): void
		{
			let starX1 = card1.x;
			let starX3 = card3.x;

			egret.Tween.get(card1).to({ x: card2.x }, 250)
				.call(function () { card1.openSelf(); card2.openSelf() })
				.to({ x: starX1 }, 250)
				.call(function ()
				{
					if (call)
					{
						call.apply(this)
					}
				}, this);

			egret.Tween.get(card3).to({ x: card2.x }, 250)
				.to({ x: starX3 }, 250);
		}

		/**
		 * 发牌移动动画
		 */
		public playSendCardMoveAmi(value: { com: eui.UIComponent, endX: number, endY: number, sX: number, sY: number, time: number, waitTime?: number }): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			core.SoundUtils.getInstance().playSound(7);
			this.playMoveAmi(value);
		}

		private judgeOpenCard(): void
		{
			let cardNums = AllData.instance.CardNums;
			if (cardNums == null || cardNums.length == 0)
			{
				this.AmiPause();
			}
		}

		/**暂停动画 */
		public AmiPause(): void
		{
			this._cac.pause();
		}

		/**动画继续 */
		public AmiContinue(): void
		{
			this._cac.continue();
		}

		/**
		 * 还牌移动动画
		 */
		public playBackCardMoveAmi(value: { com: eui.UIComponent, endX: number, endY: number, sX: number, sY: number, time: number }): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			this.playMoveAmi(value);
		}
		/**
		 * 翻黑牌第三张牌
		 */
		public showCard3OpenAmi(): void
		{
			if (this._isFirstOpenGame)
			{
				this.showCard();
				this._isFirstOpenGame = false;
				this.setCardData();
				this.card1.openSelf();
				this.card2.openSelf();
				this.card4.openSelf();
				this.card5.openSelf();
			}
			this.card3.showOpenCardAmi(true, this.playCardResultAmiL);
		}

		/**
		 * 翻红牌第三张牌
		 */
		public showCard6OpenAmi(): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			this.card6.showOpenCardAmi(true, this.playCardResultAmiR);
		}

		/**
		 * 播放移动动画
		 */
		public playMoveAmi(value: { com: eui.UIComponent, endX: number, endY: number, sX: number, sY: number, time: number, waitTime?: number, call?: Function }): void
		{
			egret.Tween.removeTweens(value.com);
			egret.Tween.get(value.com)
				.wait(value.waitTime ? value.waitTime : 0)
				.to({ x: value.endX, y: value.endY, scaleX: value.sX, scaleY: value.sY }, value.time)
				.call(function ()
				{
					if (value.call)
					{
						value.call.apply(this);
					}
				}, this);
		}

		public showWinner(): void
		{
			if (this._isFirstOpenGame)
			{
				return;
			}
			let winner: EnumerationType.RegionWinner = AllData.instance.Winner;
			switch (winner)
			{
				case EnumerationType.RegionWinner.black:
					this.regionBlack.showWinAmi()
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
			this.scoreBoard.addWinner();
			let self = this;
			let temp = setTimeout(function ()
			{
				self.playShowBigWinner();
			}, 3000);
			this.playShowBigWinner();
		}

		private playLeftGetCardAmi(index: number, speed: number = 300): void
		{
			let card: Card = this._cards[index];
			let endX = this._cardStarXs[index];
			let starX = this.width / 2 - card.width / 2;
			let centerX = this._card1StarX;
			let endTime = (endX - centerX) / speed * 1000;
			card.x = starX;
			card.visible = true;

			egret.Tween.removeTweens(card);
			this._GetCardAmiL = egret.Tween.get(card);
			this._GetCardAmiL.to({ x: centerX }, 300)
				.to({ x: endX }, endTime);
		}

		private playRightGetCardAmi(index: number, speed: number = 300): void
		{
			let card: Card = this._cards[index];
			let endX = this._cardStarXs[index];
			let starX = this.width / 2 + card.width / 2;
			card.x = starX;
			card.visible = true;
			let endTime = (endX - starX) / speed * 1000;
			this._getCardAmiR = egret.Tween.get(card);
			this._getCardAmiR.to({ x: endX }, endTime);
		}

		private onBetDetailsBtnClick(ent: egret.TouchEvent): void
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BET_DETAIL, true);
		}

		private onBetRecordsBtnClick(ent: egret.TouchEvent): void
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BET_DETAIL, false);
		}

		private onGameMethodBtnClick(ent: egret.TouchEvent): void
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_METHOD, true);
		}

		private onPrizeInfoBtnClick(ent: egret.TouchEvent): void
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_GAME_METHOD, false);
		}

		private onRegionClick(ent: egret.TouchEvent): void
		{
			if (this._selectIndex >= 0)
			{
				let value = AllData.instance.ballValue[this._selectIndex];
				if (AllData.instance.getMoneyIsEnough(value, true))
				{
					let indexs: number[] = [this._selectIndex];
					let id: string[] = [AllData.instance.playerInfo.id];
					let btn = ent.target;
					core.SoundUtils.getInstance().playSound(4);
					switch (btn)
					{
						case this.regionRed_btn:
							this.regionRed.addBall(indexs, id, true);
							AllData.instance.playerAddBetR(value);
							break;
						case this.regionBlack_btn:
							this.regionBlack.addBall(indexs, id, true);
							AllData.instance.playerAddBetB(value);
							break;
						case this.regionOther_btn:
							this.regionOther.addBall(indexs, id, true);
							AllData.instance.playerAddBetO(value);
							break;
					}
				}
			}
		}

		private ht: HttpManager = new HttpManager();
		private onBetsBtn(e: egret.TouchEvent): void
		{
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_INPUT_PASSWORD);
		}

		private onBackBetsBtnClick(e: egret.TouchEvent): void
		{
			AllData.instance.withdrawBet();
			let ch1 = this.regionRed.withdrawBall();
			let ch2 = this.regionBlack.withdrawBall();
			let ch3 = this.regionOther.withdrawBall();
			if (ch1 || ch2 || ch3)
			{
				TipsUtils.showTipsFromCenter("撤回成功", false);
			}
			else
			{
				TipsUtils.showTipsFromCenter("没有可撤回的投注", false);
			}
		}




		private onBallBtnClick(ent: egret.TouchEvent): void
		{
			if (this._selectedBall)
			{
				this._selectedBall.hideSelectedAmi();
			}
			let btn: BallBtn = ent.target;
			this._selectedBall = btn;
			btn.showSelectedAmi();
			switch (btn)
			{//todo
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
		}

		public begin_btn: eui.Button;
		public setCard_btn: eui.Button;
		public cardAmi_btn: eui.Button;
		public ballAmi_btn: eui.Button;
		public bigWinner_btn: eui.Button;

		private onBeginBtnClick(): void
		{
			// this.showBeginAmi();
			// AllData.instance.dispatchEventWith(GameNotify.GAME_STAR);
			// this.refreshMoneyLab();

			// core.SoundUtils.getInstance().playSound(1, 0);
			SocketManager.connectServer();
			// GameResultRequest.sendGameResultRequest();
		}
		private onSetCardBtnClick(): void
		{
			AllData.instance.testSetData();
			this.setCardData();
		}

		private onBallAmiBtnClick(): void
		{
			let ballNum = AllData.instance.getRandomInt(1, 10);
			let ballIndexs: number[] = [];
			let ballId: string[] = [];
			this.regionRed.removeAllBall();
			this.regionBlack.removeAllBall();
			this.regionOther.removeAllBall();
			for (let i = 0; i < ballNum; i++)
			{
				let ballIndex: number = AllData.instance.getRandomInt(0, 5);
				ballIndexs.push(ballIndex);
				ballId.push("6566655asd");
			}
			this.regionRed.addBall(ballIndexs, ballId);
			this.regionBlack.addBall(ballIndexs, ballId);
			this.regionOther.addBall(ballIndexs, ballId);
			this.refreshPlayerMoney();
			core.SoundUtils.getInstance().playSound(6);
		}
	}
}