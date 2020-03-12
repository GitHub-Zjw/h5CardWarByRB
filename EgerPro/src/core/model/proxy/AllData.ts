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

	private _cardColor: EnumerationType.Color[];
	private _cardNums: number[];
	private _bleckMoneyNum: number;
	private _redMoneyNum: number;
	private _otherMoneyNum: number;
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
		this._redCardType = EnumerationType.CardType.zhadanniu;
		this._blackCardType = EnumerationType.CardType.niuqi;
		this._allWinners = [];
		this._betDetailsTypeDatas = [];
		this._betRecordsTypeDatas = [];
		this._gmaeMethItemTypeDatas = [];
		this._hX_ItemData = [];
		this._bigWinnerDatas = [];
		this._myHdag = 0;
		this._myMoney = 0;
	}


	/**
	 * 获取金币是否足够
	 * @param value 需要的金币
	 * @param isShowTip 是否显示提示
	 */
	public getMoneyIsEnough(value: number, isShowTip: boolean = false): boolean
	{
		let afUse = AllData.instance.MyMoney - value;
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
	{//fix
		return "2,2,2,2,2,2,2,2,2,2,2";
	}

	/**
	 * 获取 2 位置的哈希字符串
	 */
	public getTwoHXStr(): string
	{//fix
		return "2,2,2,2,2,2,2,2,2,2,4,2";
	}

	/**
	 * 获取胜利位置的哈希字符串
	 */
	public getWinHXstr(): string
	{//fix
		return "2,2,2,2,2,2,2,2,2,2,<font color='#F9C834'>4</font>,2";
	}

	/**
	 * 获取中将需要移动的字符
	 */
	public getMoveChat(): string
	{//fix
		return "4";
	}

	/**
	 * 获取第几个字符中奖
	 */
	public getMoveNum(): number
	{//fix
		return 11;
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
	public get cardNums(): number[]
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
		this._playerInfo = {name: "旺气象", money: 669, id: "adsf"};
		console.log("动画数据设置完毕");
	}
}