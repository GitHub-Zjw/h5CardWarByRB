module bigWinner
{
	export class BigWinnerPanel extends ZjwComponent
	{
		public rankList: eui.List;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/BigWinner/BigWinnerPanelSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
		}

		public initView(): void
		{
			super.initView();
			this.rankList.dataProvider = this.listData();
			this.rankList.itemRenderer = BigWinnerItem;
			let self = this;
			setTimeout(function ()
			{
				self.closePanel();
			}, 2800);
		}

		private listData(): eui.ArrayCollection
		{
			return new eui.ArrayCollection(AllData.instance.ThisBigWinnerData);
		}

		/**
		 * 刷新界面
		 */
		public refreshView(): void
		{
			this.rankList.dataProvider = this.listData();
		}

		public closePanel(): void
		{
			AllData.instance.onBeginGame();
			HomePageRequest.sendHomePageData();
			game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BIG_WINNER);
		}
	}
}