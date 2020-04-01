module game
{
	export class HomePageCommand extends CommandBase
	{
        /**
         * 注册消息
         */
		public register(): void
		{
			this.facade.registerCommand(RequestsNotify.jhgame, HomePageCommand);
		}

		public execute(notification: puremvc.INotification): void
		{
			super.execute(notification);
			let data = notification.getBody();
			AllData.instance.setHomePageData(data);
			game.AppFacade.instance.sendNotification(GameNotify.HOME_PAGE_DATA);
		}
	}

	export interface JhGameData extends AllResponseData
	{
		Data:
		{
			/**当前余额 */
			m: number,
			/**本剧投注金额 */
			bm: number,
			/**计分面板数据 */
			w: 
			{
				/**历史开奖记录-
				 * 1：黑色
				 * 2：红色
				 * 3：黑色 + 横杠
				 * 4：红色 + 横杠
				 */
				list: number[];
				/**红球占比 */
				red: string;
				/**黑球占比 */
				block: string;
				/**幸运一击占比 */
				lucky: string;
			}
		}
	}

}