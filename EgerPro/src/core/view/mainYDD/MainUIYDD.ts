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
		}

		private resetView(): void
		{
			this._selectIndex = -1;
			this.mengBan_btn.visible = false;
			this.blackResult_img.alpha = 0;
			this.redResult_img.alpha = 0;
			if (this._selectedBall)
			{
				this._selectedBall.hideSelectedAmi();
			}
			AllData.instance.withdrawBet();
			this.refreshMoneyLab();
			this.regionRed.removeAllBall();
			this.regionBlack.removeAllBall();
			this.regionOther.removeAllBall();
			this.refreshPlayerMoney();
		}
		/**
		 * 游戏开始
		 */
		public onBegigGame(): void
		{
			this.resetView();

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
		}

		/**
		 * 停止下注
		 */
		public onStopBet(): void
		{
			this.mengBan_btn.visible = true;
			let self = this;
			game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_STOP_BET);
			this._selectIndex = -1;
			GameResultRequest.sendGameResultRequest();
		}

		/**
		 * 刷新下注金额
		 */
		public refreshMoneyLab(): void
		{
			let numB = AllData.instance.BleckMoneyNum;
			let numR = AllData.instance.RedMoneyNum;
			let numO = AllData.instance.OtherMoneyNum;
			let myR = AllData.instance.PlayerBetRed;
			let myB = AllData.instance.PlayerBetBlack;
			let myO = AllData.instance.PlayerBetOther;
			this.moneyNumB_lab.text = numB == 0 ? "" : this.ceilNum(numB).toString();
			this.moneyNumR_lab.text = numR == 0 ? "" : this.ceilNum(numR).toString();
			this.moneyNumO_lab.text = numO == 0 ? "" : this.ceilNum(numO).toString();
			this.myBetRed_lab.text = myR == 0 ? "" : this.ceilNum(myR).toString();
			this.myBetBlack_lab.text = myB == 0 ? "" : this.ceilNum(myB).toString();
			this.myBetOther_lab.text = myO == 0 ? "" : this.ceilNum(myO).toString();
		}

		private ceilNum(num: number): number
		{
			return Math.ceil(num * 10) / 10;
		}

		public addBall(): void
		{
			this.regionRed.addBall(AllData.instance.BallIndexs[1]);
			this.regionBlack.addBall(AllData.instance.BallIndexs[0]);
			this.regionOther.addBall(AllData.instance.BallIndexs[2]);
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
			if (AllData.instance.ThisBigWinnerData.length > 0)
			{
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_BIG_WINNER, true);
			}
			else
			{
				HomePageRequest.sendHomePageData();
			}
		}

		/**增加哈希列表动画 1 */
		private playHXItemAmi(): void
		{
			let len = AllData.instance.HX_ItemData.length;
			let speed = 500;//Math.floor(1000 / len);
			for (let i = 0; i < len; i++)
			{
				let self = this;
				let temp = setTimeout(function ()
				{
					self.setHXListData(i);
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

		public showHXUI(): void
		{
			this.hx_group.visible = true;
			this.hxList.itemRenderer = HxItem;
			this.twoHXNum_lab.textFlow = (new egret.HtmlTextParser).parser(AllData.instance.getOneHXStr());
			this.oneHXNum_lab.textFlow = (new egret.HtmlTextParser).parser(AllData.instance.getTwoHXStr());
			this.move_lab.visible = false;
			this.kuangR_img.visible = false;
			this.kuangL_img.visible = false;
			this.setHXListData(0);
			this.setCardData();
			this.openCards();
		}

		/**发牌 */
		private openCards(): void
		{
			let len = this._cards.length;
			let cardCenterXs = [];
			if (AllData.instance.BlackCardIsLaft)
			{
				cardCenterXs = [521, 557, 596, 218, 254, 290];
			}
			else
			{
				cardCenterXs = [218, 254, 290, 521, 557, 596];
			}
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
			if (AllData.instance.BlackCardIsLaft)
			{
				endX = this.twoHXNum_lab.x + this.twoHXNum_lab.size * AllData.instance.getMoveNum() / 2;
				changeLab = this.twoHXNum_lab;
			}
			else
			{
				endX = this.oneHXNum_lab.x + this.oneHXNum_lab.size * AllData.instance.getMoveNum() / 2;
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
				.wait(1500)
				.call(function ()
				{
					self.hideHXUI();
					self.playCardBackAmi();
				});
		}

		//卡牌归位
		private playCardBackAmi(): void
		{
			let len = this._cards.length;
			let i = 0
			for (; i < len - 1; i++)
			{
				let value = { com: this._cards[i], endX: this._cardStarXs[i], endY: this._card1StarY, sX: 1, sY: 1, time: 500 };
				this.playBackCardMoveAmi(value);
			}
			let value = { com: this._cards[i], endX: this._cardStarXs[i], endY: this._card1StarY, sX: 1, sY: 1, time: 500, call: this.showCard3OpenAmi };
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
		// /**翻前两张牌 1 */
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
					let btn = ent.target;
					core.SoundUtils.getInstance().playSound(4);
					switch (btn)
					{
						case this.regionRed_btn:
							this.regionRed.addBall(indexs, true);
							AllData.instance.playerAddBetR(value);
							break;
						case this.regionBlack_btn:
							this.regionBlack.addBall(indexs, true);
							AllData.instance.playerAddBetB(value);
							break;
						case this.regionOther_btn:
							this.regionOther.addBall(indexs, true);
							AllData.instance.playerAddBetO(value);
							break;
					}
				}
			}
		}

		private ht: HttpManager = new HttpManager();
		private onBetsBtn(e: egret.TouchEvent): void
		{
			if (AllData.instance.IsNoShowAgreem)
			{
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_INPUT_PASSWORD);
			}
			else
			{
				game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_AGREEMENT_PANEL);
			}
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
			{
				case this.ball0_btn:
					this._selectIndex = 0;
					break;
				case this.ball1_btn:
					this._selectIndex = 1;
					break;
				case this.ball2_btn:
					this._selectIndex = 2;
					break;
				case this.ball3_btn:
					this._selectIndex = 3;
					break;
				case this.ball4_btn:
					this._selectIndex = 4;
					break;
				case this.ball5_btn:
					this._selectIndex = 5;
					break;
			}
		}
	}
}