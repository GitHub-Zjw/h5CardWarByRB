module betDetails
{
	export class BetDetailsPanel extends ZjwComponent
	{
		public details_list: eui.List;
		public details_scl: eui.Scroller;
		public close_btn: eui.Button;

		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/BetDetails/BetDetailsPanelSkin.exml";
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
			// this.details_scl.verticalScrollBar.visible = false;
			this.details_list.dataProvider = this.listData();
			this.details_list.itemRenderer = BetDetailsItem;
		}

		private listData(): eui.ArrayCollection
		{
			let returnValue = new eui.ArrayCollection(AllData.instance.BetDetailsTypeDatas);
			return returnValue;
		}

		public onBtnClick(e: egret.TouchEvent): void
		{
			let btn = e.target;
			switch (btn)
			{
				case this.close_btn:
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_BET_DETAIL);
					break;
			}
		}

		/**
		 * 刷新界面
		 */
		public refreshView(): void
		{
			this.details_list.dataProvider = this.listData();
		}
	}
}