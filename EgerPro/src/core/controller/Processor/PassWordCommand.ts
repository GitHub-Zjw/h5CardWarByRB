module game
{
	export class PassWordCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.checkpwd, PassWordCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: AllResponseData = notification.getBody();
			if (data.Code == 200)
			{
				game.AppFacade.instance.sendNotification(GameNotify.PWD, true);
			}
			else
			{
				game.AppFacade.instance.sendNotification(GameNotify.PWD, false);
			}
		}
	}
}