/**
 * 枚举类型定义
 */
module EnumerationType
{
	/**
	 * 卡片花色
	 */
	export enum Color
	{
		"null" = 0,
		"fangKuai" = 1,
		"meiHua" = 2,
		"hongTao" = 3,
		"heiTao" = 4,
		"boss" = 5
	}
	/**
	 * 牌形
	 */
	export enum CardType
	{
		"niuba",
		"niuer",
		"niujiu",
		"niuniu",
		"niusan",
		"niusi",
		"niuwu",
		"niuyi",
		"tonghuashun",
		"wuhuaniu",
		"wuniu",
		"wuxiaoniu",
		"zhadanniu",
		"niuqi",
		"niuliu"
	}
	/**
	 * 胜利区域
	 */
	export enum RegionWinner
	{
		/**
		 * 红方赢
		 */
		"red",
		/**
		 * 黑方赢
		 */
		"black",
		/**
		 * 红方赢 + 特殊牌型
		 */
		"redS",
		/**
		 * 红方赢 + 特殊牌型
		 */
		"blackS"
	}
}