module game
{
	export class TodayBigWinnerCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.bigwin, TodayBigWinnerCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: BigWinnerData = notification.getBody();
			if (data.Data.length == 0)
			{
				game.AppFacade.instance.sendNotification(GameNotify.BIG_WINNER_OVER);
			}
			else
			{
				AllData.instance.setBigWinner(data);
				game.AppFacade.instance.sendNotification(GameNotify.BIG_WINNER);
			}
		}
	}
	export interface BigWinnerItemData
	{
		"name": string,
		/**牌型 */
		"fr": string,
		"money": string
	}

	export interface BigWinnerData extends AllResponseData
	{
		Data: BigWinnerItemData[]
	}
}