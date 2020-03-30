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
			AllData.instance.setBetInfo(data);
			game.AppFacade.instance.sendNotification(GameNotify.BET);
			TipsUtils.showTipsFromCenter(data.Msg);
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
				"0": 
				{
					k_1: 
					{
						ar: number,
						hr: string,
						tr: string
					},
					k_2: 
					{
						ar: number,
						hr: string,
						tr: string
					},
					k_3: 
					{
						ar: number,
						hr: string,
						tr: string
					}
				},
				/**中奖的key */
				luck: string
			}
		}
	}
}