module game
{
	export class AgCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.trainfo, AgCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: AgData = notification.getBody();
			game.AppFacade.instance.sendNotification(GameNotify.AG_DATA, data);
		}
	}

	export class AgData extends AllResponseData
	{
		Data:
		{
			to: string,
			name: string
		}
	}
}