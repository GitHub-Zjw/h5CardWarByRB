module game
{
	export class BetRecordCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.userbet, BetRecordCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: BetRecordData = notification.getBody();
			if (data.Data.length == 0)
			{
				game.AppFacade.instance.sendNotification(GameNotify.BET_RECORD_OVER);
			}
			else
			{
				AllData.instance.setBetRecord(data);
				game.AppFacade.instance.sendNotification(GameNotify.BET_RECORD);
			}
		}
	}
	export interface RecordItemData
	{
		"hcoin": string,
		"qy": string[],
		"betmoney": string
	}

	export interface BetRecordData extends AllResponseData
	{
		Data: RecordItemData[]
	}

}