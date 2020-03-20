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
	 * 数值是音效id
	 */
	export enum CardType
	{
		/**散牌 */
		"sanPai" = 12,
		/**顺子 */
		"sunZi" = 13,
		/**顺金 */
		"sunJin" = 14,
		/**对子 */
		"duiZi" = 15,
		/**豹子 */
		"baoZi" = 16,
		/**金花 */
		"jinHua" = 17
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