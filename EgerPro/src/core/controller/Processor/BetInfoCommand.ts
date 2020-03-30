module game
{
	export class BetInfoCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.jhbet, BetInfoCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: BetInfoData = notification.getBody();
			TipsUtils.showTipsFromCenter(data.Msg, false);
			AllData.instance.setBetInfo(data);
			game.AppFacade.instance.sendNotification(GameNotify.BET);
		}
	}
	export interface BetInfoData extends AllResponseData
	{
	}
}