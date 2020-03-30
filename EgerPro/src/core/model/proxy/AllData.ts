class AllData extends egret.EventDispatcher
{
	private static _info: AllData;
	public static get instance(): AllData
	{
		if (AllData._info == null)
		{
			AllData._info = new AllData();
		}
		return AllData._info;
	}

	/**小球资源名 */
	public ballSource: string[];
	/**小球大小 */
	public ballValue: number[];

	private _winHxStr: string;
	private _moveChat: string;
	private _moveNum: number;
	private _playerAddBNum: number;
	private _playerAddRNum: number;
	private _playerAddONum: number;
	private _cardColor: EnumerationType.Color[];
	private _cardNums: number[];
	private _bleckMoneyNum: number;
	private _redMoneyNum: number;
	private _otherMoneyNum: number;
	private _myBetBlackNum: number;
	private _myBetRedNum: number;
	private _myBetOtherNum: number;
	private _winner: EnumerationType.RegionWinner;
	private _redCardType: EnumerationType.CardType;
	private _blackCardType: EnumerationType.CardType;
	private _allWinners: EnumerationType.RegionWinner[];
	private _betDetailsTypeDatas: betDetails.BetDetailsTypeData[];
	private _betRecordsTypeDatas: betDetails.BetRecordsTypeData[];
	private _gmaeMethItemTypeDatas: string[][];
	private _hX_ItemData: string[][];
	private _bigWinnerDatas: bigWinner.RankItemTypeData[];
	private _myHdag: number;
	private _myMoney: number;
	private _playerInfo: game.PlayerInfo;
	private _beginTimeStamp: number;		//游戏开始时间戳

	public constructor()
	{
		super();
		this._cardColor = [];
		this._cardNums = [];
		this.ballSource = ["0.1_png", "1_png", "5_png", "10_png", "50_png", "100_png"];
		this.ballValue = [0.1, 1, 5, 10, 50, 100];
		this._bleckMoneyNum = 0;
		this._redMoneyNum = 0;
		this._redMoneyNum = 0;
		this._otherMoneyNum = 0;
		this._winner = EnumerationType.RegionWinner.redS;
		this._redCardType = EnumerationType.CardType.sanPai;
		this._blackCardType = EnumerationType.CardType.sanPai;
		this._allWinners = [];
		this._betDetailsTypeDatas = [];
		this._betRecordsTypeDatas = [];
		this._gmaeMethItemTypeDatas = [];
		this._hX_ItemData = [];
		this._bigWinnerDatas = [];
		this._myHdag = 0;
		this._myMoney = 0;
		this._beginTimeStamp = 0;
		this._playerAddBNum = 0;
		this._playerAddRNum = 0;
		this._playerAddONum = 0;
		this._myBetBlackNum = 0;
		this._myBetRedNum = 0;
		this._myBetOtherNum = 0;
		this._playerInfo = {id: "2333",name: "",money: 666};
	}

	/**
	 * 设置游戏首页信息
	 */
	public setHomePageData(jhgame: game.JhGameData): void
	{
		this._myMoney = jhgame.Data.m;
		this._myHdag = jhgame.Data.bm;
		let len = jhgame.Data.w.list.length;
		for (let i = 0; i < len; i++)
		{//fix分数面板
		}
	}

	/**
	 * 
	 * 设置本局投注金额消息
	 */
	public setBetMoney(betMoneyData: game.BetMoneyData): void
	{
		this._bleckMoneyNum = betMoneyData.Data.h.z;
		this._redMoneyNum = betMoneyData.Data.h.z;
		this._otherMoneyNum = betMoneyData.Data.l.z;
	}

	/**
	 * 玩家本人下注消息返回
	 */
	public setBetInfo(betInfo: game.BetInfoData): void
	{
		if (betInfo.Code == 200)
		{
			this._bleckMoneyNum += this._myBetBlackNum;
			this._redMoneyNum += this._myBetRedNum;
			this._otherMoneyNum += this._myBetOtherNum;
			this._playerAddBNum += this._myBetBlackNum;
			this._playerAddRNum += this._myBetRedNum;
			this._playerAddONum += this._myBetOtherNum;
			this._myHdag = this._myHdag + this._myBetOtherNum + this._myBetBlackNum + this._myBetRedNum;
			this._myBetRedNum = 0;
			this._myBetBlackNum = 0;
			this._myBetOtherNum = 0;
		}
	}

	/**
	 * 玩家撤回投注
	 */
	public withdrawBet(): void
	{
		this._myBetRedNum = 0;
		this._myBetBlackNum = 0;
		this._myBetOtherNum = 0;
	}

	/**
	 * 卡牌结果
	 */
	public setGameResult(resultData: game.GameResultData): void
	{
		let blackCards: string[] = resultData.Data.block.p;
		let redCards: string[] = resultData.Data.red.p;
		for (let i = 0; i < 3; i++)
		{
			this._cardNums[i] = this.parseCardNum(blackCards[i]);
			this._cardNums[i + 3] = this.parseCardNum(redCards[i]);
			this._cardColor[i] = this.parseCardColor(blackCards[i]);
			this._cardColor[i + 3] = this.parseCardColor(redCards[i]);
			let hsData = resultData.Data.hash[0];
			for (let k = 1; k <= 3; k++)
			{
				this._hX_ItemData[i][k] = hsData["k_" + k].toString();
			}
		}
		this._blackCardType = this.parseCardType(resultData.Data.block.m);
		this._redCardType = this.parseCardType(resultData.Data.red.m);
		//fix
	}

	private parseCardNum(str: string): number
	{
		let endChat = str.charAt(str.length - 1);
		switch (endChat)
		{
			case "A":
				return 10;
			case "B":
				return 11;
			case "C":
				return 12;
			case "D":
				return 13;
		}
		return parseInt(endChat);
	}

	private parseCardColor(str: string): EnumerationType.Color
	{
		let endChat = str.charAt(str.length - 2);
		switch (endChat)
		{
			case "0": return EnumerationType.Color.heiTao;
			case "1": return EnumerationType.Color.hongTao;
			case "2": return EnumerationType.Color.meiHua;
			case "3": return EnumerationType.Color.fangKuai;
		}
	}

	private parseCardType(num: number): EnumerationType.CardType
	{
		switch (num)
		{
			case 10: return EnumerationType.CardType.baoZi;
			case 9: return EnumerationType.CardType.sunJin;
			case 8: return EnumerationType.CardType.jinHua;
			case 7: return EnumerationType.CardType.sunZi;
			case 6: return EnumerationType.CardType.duiZi;
		}
	}

	/**本人已投注黑色金额 */
	public get PlayerBetBlack(): number
	{
		return this._playerAddBNum;
	}

	/**本人已投住红色金额 */
	public get PlayerBetRed(): number
	{
		return this._playerAddRNum;
	}

	/**本人已投注紫色金额 */
	public get PlayerBetOther(): number
	{
		return this._playerAddONum;
	}

	/**本人黑色下注金额 */
	public get MyBetBlackNum(): number
	{
		return this._myBetBlackNum;
	}

	/**本人红色下注金额 */
	public get MyBetRedNum(): number
	{
		return this._myBetRedNum;
	}

	/**本人幸运一击下注金额 */
	public get MyBetOtherNum(): number
	{
		return this._myBetOtherNum;
	}

	/**增加投注黑色区域 */
	public playerAddBetB(addNum: number): void
	{
		this._myBetBlackNum += addNum;
	}
	/**增加投注红色区域 */
	public playerAddBetR(addNum: number): void
	{
		this._myBetRedNum += addNum;
	}
	/**增加投注紫色区域 */
	public playerAddBetO(addNum: number): void
	{
		this._myBetOtherNum += addNum;
	}
	/**
	 * 获取游戏进行到的时间（秒）
	 */
	public getCurrentSecond(): number
	{
		let w = Math.floor(Date.parse((new Date()).toString()) / 1000);
		let s = this._beginTimeStamp;
		let j = Math.floor((w - s) / 45);
		let t = w - (s + j * 45);
		return t;
	}

	/**
	 * 获取当前游戏期号
	 */
	public getCurrentIssueNumber(): number
	{
		let w = Math.floor(Date.parse((new Date()).toString()) / 1000);
		let s = this._beginTimeStamp;
		let j = Math.floor((w - s) / 45);
		let n = j + 1;
		return n;
	}


	/**
	 * 获取金币是否足够
	 * @param value 需要的金币
	 * @param isShowTip 是否显示提示
	 */
	public getMoneyIsEnough(value: number, isShowTip: boolean = false): boolean
	{
		let afUse = AllData.instance.MyMoney - value - this._myBetRedNum - this._myBetOtherNum - this._myBetBlackNum;
		if (afUse >= 0)
		{
			return true;
		}
		else
		{
			if (isShowTip)
			{
				EffectUtils.showTips("剩余游戏币不足", 4);
			}
			return false;
		}
	}

	/**玩家信息 */
	public get playerInfo(): game.PlayerInfo
	{
		return this._playerInfo;
	}
	/**大奖玩家数据 */
	public get BigWinnerDatas(): bigWinner.RankItemTypeData[]
	{
		return this._bigWinnerDatas;
	}

	/**我的下注金额 */
	public get MyHDAG(): number
	{
		return this._myHdag;
	}

	public set MyHDAG(value: number)
	{
		this._myHdag = value;
	}

	/**我的游戏币 */
	public get MyMoney(): number
	{
		return this._myMoney;
	}

	public set MyMoney(value: number)
	{
		this._myMoney = value;
	}

	/**
	 * 当前卡牌花色
	 */
	public get cardColor(): number[]
	{
		return this._cardColor;
	}

	/**投注详情数据 */
	public get BetDetailsTypeDatas(): betDetails.BetDetailsTypeData[]
	{
		return this._betDetailsTypeDatas;
	}
	/**投注详情数据 */
	public get BetRecordsTypeDatas(): betDetails.BetRecordsTypeData[]
	{
		return this._betRecordsTypeDatas;
	}
	/**大奖数据 */
	public get GmaeMethItemTypeDatas(): string[][]
	{
		return this._gmaeMethItemTypeDatas;
	}
	/**
	 * 获取 1 位置的哈希字符串
	 */
	public getOneHXStr(): string
	{
		return "0,2,4,6,8,a,c,e";
	}

	/**
	 * 获取 2 位置的哈希字符串
	 */
	public getTwoHXStr(): string
	{
		return "1,3,5,7,9,b,d,f";
	}

	/**
	 * 获取胜利位置的哈希字符串
	 */
	public getWinHXstr(): string
	{
		return this._winHxStr;//"2,2,2,2,2,2,2,2,2,2,<font color='#F9C834'>4</font>,2";
	}

	/**
	 * 获取中奖需要移动的字符
	 */
	public getMoveChat(): string
	{
		return this._moveChat;
	}

	/**
	 * 获取第几个字符中奖
	 */
	public getMoveNum(): number
	{
		return this._moveNum;
	}

	/**
	 * 根据个数获取哈希选牌数据
	 */
	public getHXItemDataByNum(count: number): string[][]
	{
		let returnValue: string[][] = [];
		let len = this._hX_ItemData.length;
		for (let i = count; i > 0; i--)
		{
			if (this._hX_ItemData[i - 1] && this._hX_ItemData[i - 1].length != 0)
			{
				returnValue.push(this._hX_ItemData[i - 1]);
			}
		}
		return returnValue;
	}

	/**哈希选牌数据 */
	public get HX_ItemData(): string[][]
	{
		return this._hX_ItemData;
	}

	/**
	 * 获取胜利区域
	 */
	public get Winner(): EnumerationType.RegionWinner
	{
		return this._winner;
	}

	/**
	 * 根据胜利区域获取红黑点资源名
	 */
	public getPointImgByReion(region: EnumerationType.RegionWinner): string
	{
		let imgS: string = "";
		switch (region)
		{
			case EnumerationType.RegionWinner.black:
				imgS = "heiSheng";
				break;
			case EnumerationType.RegionWinner.blackS:
				imgS = "heiJia";
				break;
			case EnumerationType.RegionWinner.red:
				imgS = "hongSheng";
				break;
			case EnumerationType.RegionWinner.redS:
				imgS = "hongJia";
				break;
			default:
				break;
		}
		imgS += "_png"
		return imgS;
	}

	/**
	 * 获取历史胜利
	 */
	public get AllWinners(): EnumerationType.RegionWinner[]
	{
		return this._allWinners;
	}

	/**
	 * 获取胜率
	 */
	public getWP(): { black: number, red: number, other: number }
	{
		let black: number = 0;
		let red: number = 0;
		let other: number = 0;
		let allNum = this.AllWinners.length;
		for (let i = 0; i < allNum; i++)
		{
			let winner = this.AllWinners[i];
			switch (winner)
			{
				case EnumerationType.RegionWinner.black:
					black++;
					break;
				case EnumerationType.RegionWinner.blackS:
					black++;
					other++;
					break;
				case EnumerationType.RegionWinner.red:
					red++;
					break;
				case EnumerationType.RegionWinner.redS:
					red++;
					other++;
					break;
				default:
					break;
			}
		}
		black = Math.floor(black / allNum * 10000) / 100;
		red = 100 - black;
		other = Math.floor(other / allNum * 10000) / 100;

		return { black: black, red: red, other: other };
	}

	/**
	 * 获取黑色押注
	 */
	public get BleckMoneyNum(): number
	{
		return this._bleckMoneyNum;
	}

	/**
	 * 黑牌牌型
	 */
	public get CardTypeB(): EnumerationType.CardType
	{
		return this._blackCardType;
	}

	/**
	 * 红牌牌型
	 */
	public get CardTypeR(): EnumerationType.CardType
	{
		return this._redCardType;
	}

	/**
	 * 获取红色押注
	 */
	public get RedMoneyNum(): number
	{
		return this._redMoneyNum;
	}

	/**
	 * 获取特殊押注
	 */
	public get OtherMoneyNum(): number
	{
		return this._otherMoneyNum;
	}

	/**
	 * 当前卡牌数字
	 */
	public get CardNums(): number[]
	{
		return this._cardNums;
	}

	/**
	 * 获取随机整数
	 */
	public getRandomInt(min, max): number
	{
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * 获取随机浮点数
	 */
	public getRandomF(min, max): number
	{
		return Math.random() * (max - min) + min;
	}
	/**
	 * 获取两点间的距离
	 */
	public getDistance(p1: egret.Point, p2: egret.Point): number
	{
		let dx = Math.abs(p1.x - p2.x);
		let dy = Math.abs(p1.y - p2.y);

		return Math.sqrt(dx * dx + dy * dy);
	}

	public testSetData(): void
	{

		for (let i = 0; i < 15; i++)
		{
			let cardNum = this.getRandomInt(1, 13);
			this._cardNums[i] = cardNum;
			let color = this.getRandomInt(1, 4);
			this._cardColor[i] = color;
			let betData: betDetails.BetDetailsTypeData = { playerName: i.toString(), money: this.getRandomF(0, 1000), region: this.getRandomInt(0, 3) };
			this._betDetailsTypeDatas.push(betData);
			let recordData: betDetails.BetRecordsTypeData = { money: this.getRandomInt(100, 1000), isWin: this.getRandomInt(0, 2) == 1, region: this.getRandomInt(0, 3) };
			this._betRecordsTypeDatas.push(recordData);
			let strs: string[] = [i.toString(), EnumerationType.CardType[this.getRandomInt(0, 6)], this.getRandomInt(0, 7) * 100 + " HDAG"];
			this._gmaeMethItemTypeDatas.push(strs);
		}
		this._beginTimeStamp = 1575302400;
		let bwData1: bigWinner.RankItemTypeData = { playerName: "十七项", value: "651454.68", jiangBeiNum: 1 };
		let bwData2: bigWinner.RankItemTypeData = { playerName: "十七项", value: "65154.68", jiangBeiNum: 2 };
		let bwData3: bigWinner.RankItemTypeData = { playerName: "十七项", value: "65126454.68", jiangBeiNum: 3 };
		this._bigWinnerDatas = [bwData1, bwData2, bwData3];
		this._winner = EnumerationType.RegionWinner.blackS;
		this._bleckMoneyNum = this.getRandomInt(1, 1000);
		this._redMoneyNum = this.getRandomInt(1, 1000);
		this._otherMoneyNum = this.getRandomInt(1, 1000);
		this._myMoney = 250;
		this._hX_ItemData[2] = ["21365", "...ee7b24123<font color='#E7B846'>4</font>", "14:15:16"];
		this._hX_ItemData[1] = ["2123", "...ee7b241234", "14:15:16"];
		this._hX_ItemData[0] = ["2g5", "...ee7b241234", "14:15:16"];
		this._playerInfo = { name: "旺气象", money: 669, id: "adsf" };
		console.log("动画数据设置完毕");
	}
}