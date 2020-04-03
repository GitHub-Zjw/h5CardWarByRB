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

	public qihao: number;
	public isQihaos: boolean[];
	/**小球资源名 */
	public ballSource: string[];
	/**小球大小 */
	public ballValue: number[];
	public Sunlight: string;
	public Language: string;

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
	private _isNoShowAgreem: boolean;
	public IsNoShowPwd: boolean;
	private _wp: { black: string, red: string, other: string };
	private _thisBigWinner: game.ThisBigWinnerData[];
	private _ballIndexs: number[][];			//新增小球投注
	private _blackCardIsLaft: boolean;

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
		this._beginTimeStamp = 1575302400;
		this._playerAddBNum = 0;
		this._playerAddRNum = 0;
		this._playerAddONum = 0;
		this._myBetBlackNum = 0;
		this._myBetRedNum = 0;
		this._myBetOtherNum = 0;
		this._playerInfo = { id: "2333", name: "", money: 666 };
		this._isNoShowAgreem = false;
		this._bigWinnerDatas = [];
		this._ballIndexs = [];
		this.isQihaos = [];
		this.qihao = 0;
		this.IsNoShowPwd = false;
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
		{
			switch (jhgame.Data.w.list[i])
			{
				case 1:
					this._allWinners[i] = EnumerationType.RegionWinner.black;
					break;
				case 2:
					this._allWinners[i] = EnumerationType.RegionWinner.red;
					break;
				case 3:
					this._allWinners[i] = EnumerationType.RegionWinner.blackS;
					break;
				case 4:
					this._allWinners[i] = EnumerationType.RegionWinner.redS;
					break;
			}
		}
		this._wp = {
			black: jhgame.Data.w.block,
			red: jhgame.Data.w.red,
			other: jhgame.Data.w.lucky
		}
	}

	/**
	 * 
	 * 设置本局投注金额消息
	 */
	public setBetMoney(betMoneyData: game.BetMoneyData): void
	{
		let black = betMoneyData.Data.h.z;
		let red = betMoneyData.Data.r.z;
		let other = betMoneyData.Data.l.z;
		this._ballIndexs[0] = [];
		this._ballIndexs[1] = [];
		this._ballIndexs[2] = [];
		this._ballIndexs[0] = this.getBallIndexByValue(black - this._bleckMoneyNum);
		this._ballIndexs[1] = this.getBallIndexByValue(red - this._redMoneyNum);
		this._ballIndexs[2] = this.getBallIndexByValue(other - this._otherMoneyNum);
		this._bleckMoneyNum = black;
		this._redMoneyNum = red;
		this._otherMoneyNum = other;
	}

	/**
	 * 获取投注小球的索引数组
	 * 0：黑色投注
	 * 1: 红色投注
	 * 2: 幸运一击投注
	 */
	public get BallIndexs(): number[][]
	{
		return this._ballIndexs;
	}

	/**
	 * 根据投注大小获取筹码索引
	 */
	public getBallIndexByValue(value: number): number[]
	{
		let returnValue: number[] = [];
		let fave = Math.floor(value / this.ballValue[5]);
		let faver = value % this.ballValue[5];
		let four = faver
		for (let i = 5; i >= 0; i--)
		{
			let num = Math.floor(value / this.ballValue[i]);
			for (let k = num; k > 0; k--)
			{
				returnValue.push(i);
			}
			value -= num * this.ballValue[i];
		}
		return returnValue;
	}

	/**
	 * 设置投注详情界面数据
	 */
	public setBetDetaile(betDetaile: game.BetDetaileData): void
	{
		let i = this._betDetailsTypeDatas.length;
		for (let key in betDetaile.Data)
		{
			let value = betDetaile.Data[key];
			let itemData: betDetails.BetDetailsTypeData = { money: value.money, playerName: value.name, region: [] };
			let len = value.qy.length;
			for (let i = 0; i < len; i++)
			{
				if (value.qy[i] == "b")
				{
					itemData.region.push(EnumerationType.RegionWinner.black);
				}
				if (value.qy[i] == "h")
				{
					itemData.region.push(EnumerationType.RegionWinner.red);
				}
				if (value.qy[i] == "z")
				{
					itemData.region.push(EnumerationType.RegionWinner.blackS);
				}
			}
			this._betDetailsTypeDatas[i++] = itemData;
		}
	}

	/**
	 * 设置投注记录界面数据
	 */
	public setBetRecord(betRecord: game.BetRecordData): void
	{

		let i = this._betRecordsTypeDatas.length;
		for (let key in betRecord.Data)
		{
			let value = betRecord.Data[key];
			let itemData: betDetails.BetRecordsTypeData = { money: value.betmoney, isWin: value.hcoin, region: [] };
			let len = value.qy.length;
			for (let i = 0; i < len; i++)
			{
				if (value.qy[i] == "b")
				{
					itemData.region.push(EnumerationType.RegionWinner.black);
				}
				if (value.qy[i] == "h")
				{
					itemData.region.push(EnumerationType.RegionWinner.red);
				}
				if (value.qy[i] == "z")
				{
					itemData.region.push(EnumerationType.RegionWinner.blackS);
				}
			}
			this._betRecordsTypeDatas[i++] = itemData;
		}
	}

	/**
	 * 设置今日大赢家数据
	 */
	public setBigWinner(bigWinner: game.BigWinnerData): void
	{

		let i = this._bigWinnerDatas.length;
		for (let key in bigWinner.Data)
		{
			let value = bigWinner.Data[key];
			let itemData: bigWinner.RankItemTypeData = { playerName: value.name, value: value.fr, jiangBeiNum: value.money };
			this._bigWinnerDatas[i++] = itemData;
		}
	}

	/**清空大赢家截面数据 */
	public cleanBigWinner(): void
	{
		this._bigWinnerDatas = [];
	}

	/**清空投注界面数据 */
	public cleanBetDetaile(): void
	{
		this._betDetailsTypeDatas = [];
	}

	/**清空投注记录数据 */
	public cleanBetRecord(): void
	{
		this._betRecordsTypeDatas = [];
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
	 * 新一轮游戏开始，重置数据
	 */
	public onBeginGame(): void
	{
		this._bleckMoneyNum = 0;
		this._redMoneyNum = 0;
		this._otherMoneyNum = 0;
		this._playerAddBNum = 0;
		this._playerAddRNum = 0;
		this._playerAddONum = 0;
		this._myHdag = 0;
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
	 * 黑牌是否在左边
	 */
	public get BlackCardIsLaft(): boolean
	{
		return this._blackCardIsLaft;
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
		}

		//哈希列表数据
		let hsListData = resultData.Data.hash[0];
		let key = resultData.Data.hash.luck;

		this._blackCardType = this.parseCardType(resultData.Data.block.m);
		this._redCardType = this.parseCardType(resultData.Data.red.m);
		let winnerInfo = resultData.Data.br;
		let winnerStr: string = resultData.Data.hash[0][key].hr;
		this._moveChat = winnerStr[winnerStr.length - 1];
		let oneIndex = this.getOneHXStr().indexOf(this._moveChat);
		let twoIndex = this.getTwoHXStr().indexOf(this._moveChat);
		resultData.Data.hash[0][key].hr = winnerStr.slice(0, winnerStr.length - 1) + "<font color='#F9C834'>" + this._moveChat + "</font>";
		if (oneIndex >= 0)
		{
			this._moveNum = oneIndex;
			this._winHxStr = this.getOneHXStr().replace(this._moveChat, "<font color='#F9C834'>" + this._moveChat + "</font>");
			this._blackCardIsLaft = true;
		}
		else if (twoIndex >= 0)
		{
			this._moveNum = twoIndex;
			this._winHxStr = this.getTwoHXStr().replace(this._moveChat, "<font color='#F9C834'>" + this._moveChat + "</font>");
			this._blackCardIsLaft = false;
		}
		else if (oneIndex < 0 && twoIndex < 0)
		{
			return;
		}
		this._hX_ItemData = [];
		for (let itemIdex in hsListData)
		{
			let index = parseInt(itemIdex[itemIdex.length - 1]);
			index = index == 0 ? 10 : index;
			if (this._hX_ItemData[index] == undefined)
			{
				this._hX_ItemData[index] = [];
			}
			let hxItmeData: game.HxListItemData = hsListData[itemIdex];
			this._hX_ItemData[index][0] = hxItmeData.ar.toString();
			this._hX_ItemData[index][1] = hxItmeData.hr;
			this._hX_ItemData[index][2] = hxItmeData.tr;
			if (itemIdex == key)
			{
				break;
			}
		}

		//设置本轮赢方
		if (winnerInfo.b == 1)
		{
			if (winnerInfo.z == 1)
			{
				this._winner = EnumerationType.RegionWinner.blackS;
			}
			else
			{
				this._winner = EnumerationType.RegionWinner.black;
			}
		}
		if (winnerInfo.r == 1)
		{
			this._winner = EnumerationType.RegionWinner.red
			if (winnerInfo.z == 1)
			{
				this._winner = EnumerationType.RegionWinner.redS;
			}
			else
			{
				this._winner = EnumerationType.RegionWinner.red;
			}
		}

		if (resultData.Data.bw && resultData.Data.bw.length > 0)
		{
			this._thisBigWinner = resultData.Data.bw;
			let len = this._thisBigWinner.length;
			for (let i = 0; i < len; i++)
			{
				this._thisBigWinner[i].index = i + 1;
			}
		}
		else
		{
			this._thisBigWinner = [];
		}
	}

	/**本轮大赢家数据 */
	public get ThisBigWinnerData(): game.ThisBigWinnerData[]
	{
		return this._thisBigWinner;
	}

	/**是否显示交易信息 */
	public get IsNoShowAgreem(): boolean
	{
		return this._isNoShowAgreem;
	}

	public set IsNoShowAgreem(value: boolean)
	{
		this._isNoShowAgreem = value
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
			case 9: return EnumerationType.CardType.shunJin;
			case 8: return EnumerationType.CardType.jinHua;
			case 7: return EnumerationType.CardType.shunZi;
			case 6: return EnumerationType.CardType.duiZi;
			case 5: return EnumerationType.CardType.sanPai;
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
	/**投注记录数据 */
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
		for (let i = count; i > 0; i--)
		{
			if (this._hX_ItemData[i] && this._hX_ItemData[i].length != 0)
			{
				returnValue.push(this._hX_ItemData[i]);
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
	public getWP(): { black: string, red: string, other: string }
	{
		return this._wp;
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

	/**
	 * 解析url
	 */
	public parseUrl(): any
	{
		if (location.port == "5660")
		{//测试服
			return {sunlight:"HD30d4c42d31283b52f175f83400865e5102a35fd0c54ad864602dd9dfdca",language:"cn"};
		}
		var searchHref = window.location.search.replace('?', '');
		var params = searchHref.split('&');
		var returnParam = {};
		params.forEach(function (param){
			var paramSplit = param.split('=');
			returnParam[paramSplit[0]] = paramSplit[1];
		});
		return returnParam;
	}

	/**
	 * 获取请求网址
	 */
	public getWebsite(): string
	{
		if (location.port == "5660")
		{//测试服
			return "www.libraw.io";
		}
		else
		{
			return "www.harmonydag.com";
		}
	}
}