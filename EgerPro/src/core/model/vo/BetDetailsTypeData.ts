module betDetails
{
	/**下注详细信息 */
	export interface BetDetailsTypeData
	{
		/**玩家名 */
		playerName: string;
		/**胜利区域 */
		region: EnumerationType.RegionWinner[];
		/**投注大小 */
		money: string;
	}

	/**下注详细信息 */
	export interface BetRecordsTypeData
	{
		/**输赢*/
		isWin: string;
		/**胜利区域 */
		region: EnumerationType.RegionWinner[];
		/**投注大小 */
		money: string;
	}
}