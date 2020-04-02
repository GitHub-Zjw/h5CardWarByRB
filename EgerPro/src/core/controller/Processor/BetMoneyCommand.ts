module game
{	
	/**
	 * 投注
	 */
	export class BetMoneyCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.jhbetcoin, BetMoneyCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data: BetMoneyData = notification.getBody();
			AllData.instance.setBetMoney(data);
			game.AppFacade.instance.sendNotification(GameNotify.BET_MONEY, data);
		}
	}
	export interface BetMoneyData extends AllResponseData
	{
		Data:
		{
			/**黑方投注金额 */
			h: 
			{
				/**总 */
				z: number,
				/**本人 */
				u: number
			}
			/**红方投注金额 */
			r:
			{
				z: number,
				u: number
			}
			/**幸运一击投注金额 */
			l:
			{
				z: number,
				u: number
			}
		}
	}
}