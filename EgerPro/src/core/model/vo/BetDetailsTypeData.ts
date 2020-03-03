module betDetails
{
	export interface BetDetailsTypeData
	{
		/**玩家名 */
		playerName: string;
		/**胜利区域 */
		region: EnumerationType.RegionWinner;
		/**投注大小 */
		money: number;
	}
}