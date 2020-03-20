module bigWinner
{
	export class BigWinnerMediator extends BasePanelMediator
	{
		public static NAME: string = "BigWinnerMediator";

		public constructor(viewComponent: any = null)
		{
			super(BigWinnerMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any>
		{
			return [
				PanelNotify.OPEN_BIG_WINNER,
				PanelNotify.CLOSE_BIG_WINNER
			];
		}
		private _bigWinnerPanel: BigWinnerPanel;
		public handleNotification(notification: puremvc.INotification): void
		{
			let badyData = notification.getBody();

			switch (notification.getName())
			{
				case PanelNotify.OPEN_BIG_WINNER:
					let group = "bigWinner";//要确保
					if (RES.getRes("bigWinnerBg_png"))
					{
						this.showMainUI();
					}
					else
					{
						RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showMainUI, this);
						RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
						RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
					}
					RES.loadGroup(group);
					//显示角色面板
					break;
				case PanelNotify.CLOSE_BIG_WINNER:
					this.closePanel(1);
					break;
			}
		}

		public showMainUI(): void
		{
			if (this._bigWinnerPanel == null)
			{
				this._bigWinnerPanel = new BigWinnerPanel();
			}
			this.showUIInCenter(this._bigWinnerPanel, true, 1);
			core.SoundUtils.getInstance().playSound(3);
		}

		private stLoadProcess(): void
		{ }

		private error(): void
		{
			console.warn("资源加载失败：bigWinner");
		}

		/**
		 * 面板关闭后需要销毁的对象
		 */
		public destroy(): void
		{
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showMainUI, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
			this._bigWinnerPanel = null;
			super.destroy();
		}
	}
}