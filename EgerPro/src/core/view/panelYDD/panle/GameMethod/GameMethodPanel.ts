module gameMethod
{
	export class GameMethodPanel extends ZjwComponent
	{

		public details_list: eui.List;
		public details_scl: eui.Scroller;
		public close_btn: eui.Button;
		public loading_group: eui.Group;

		/**是否正在获取数据 */
		public IsGetDataing: boolean;

		private _isHaveMoreData: boolean;
		public constructor()
		{
			super();
			this.IsGetDataing = true;
			this._isHaveMoreData = true;
			this.skinName = "resource/ui/panelYDD/GameMethod/GameMethodPanelSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
			this.details_scl.verticalScrollBar.visible = false;
			this.details_scl.verticalScrollBar.autoVisibility = false;
			this.details_list.itemRenderer = GameMethodItem;

			this.details_list.dataProvider = this.listData();
		}

		private listData(): eui.ArrayCollection
		{
			let returnValue = new eui.ArrayCollection(AllData.instance.BigWinnerDatas);
			return returnValue;
		}

		public addEvent(): void
		{
			super.addEvent();
			this.details_scl.addEventListener(egret.Event.CHANGE, this.onListChange, this);
		}

		public removeEvent(): void
		{
			super.removeEvent();
			this.details_scl.removeEventListener(egret.Event.CHANGE, this.onListChange, this);
		}

		private onListChange(e): void
		{
			if (this.IsGetDataing == false && this.getIsEnd() && this._isHaveMoreData)
			{
				TodayBigWinnerRequest.sendTodayBigWinnerRequest();
				this.IsGetDataing = true;
				this.loading_group.visible = true;
			}
		}

		private getIsEnd(): boolean
		{
			let height = this.details_scl.height;
			let scrollV = this.details_scl.viewport.scrollV;
			let listH = this.details_scl.viewport.contentHeight;
			let viewP = listH - scrollV;
			if (height - 16 > viewP)
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		
		/**
		 * 刷新界面
		 */
		public refreshView(): void
		{
			this.details_list.dataProvider = this.listData();
			this.loading_group.visible = false;
		}
		
		public setDataOver(): void
		{
			this._isHaveMoreData = false;
			this.loading_group.visible = false;
		}

		protected onBtnClick(e: egret.TouchEvent): void
		{
			super.onBtnClick(e);

			let btn = e.target;
			switch (btn)
			{
				case this.close_btn:
					AllData.instance.cleanBigWinner();
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_GAME_METHOD, false);
					break;
			}
		}
	}
}