module game
{
	export class GameResultCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.gamedata, GameResultCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: GameResultData = notification.getBody();
			AllData.instance.setGameResult(data);
			game.AppFacade.instance.sendNotification(GameNotify.GAME_RESULT);
		}

		private sortHXList(data: GameResultData): GameResultData
		{
			for(let i = 1; i< 6; i++)
			{
				let temp = data.Data.hash[0]["k_"+1];
				data.Data.hash[0]["k_"+i] = data.Data.hash[0]["k_"+(11-i)];
				data.Data.hash[0]["k_"+(11-i)] = temp;
			}
			return data;
		}
	}
	export interface GameResultData extends AllResponseData
	{
		Data:
		{
			/**黑方手牌 */
			block:
			{
				/**代表手牌 */
				p: string[],
				/**代表牌型 */
				m: number
			},
			/**红方手牌 */
			red:
			{
				p: string[],
				m: number
			},
			/**获胜方 值等于 1 得代表 win */
			br:
			{
				b: number,
				r: number,
				z: number
			}
			hash:
			{
				"0": any,
				/**中奖的key */
				luck: string
			}
			/**本轮大赢家 */
			bw: ThisBigWinnerData[]
		}
	}
	export interface HxListItemData
	{
		ar: number,
		hr: string,
		tr: string
	}

	/**
	 * 本轮大赢家数据
	 */
	export interface ThisBigWinnerData
	{
		/**玩家名 */
		account: string,
		/**玩家钱 */
		hcoin: string,

		/**索引前端数据 */
		index: number
	}
}