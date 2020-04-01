module betDetails
{
	export class BetDetailsPanel extends ZjwComponent
	{
		public details_list: eui.List;
		public details_scl: eui.Scroller;
		public close_btn: eui.Button;
		public loading_group: eui.Group;

		/**是否正在获取数据 */
		public IsGetDataing: boolean;
		public IsGetDataing2: boolean;

		private _isDetail: boolean;
		private _isHaveMoreData: boolean;
		private _isHaveMoreData2: boolean;
		public constructor(isDetail: boolean = true)
		{
			super();
			this._isDetail = isDetail;
			this._isHaveMoreData = true;
			this._isHaveMoreData2 = true;
			this.IsGetDataing = true;
			this.IsGetDataing2 = true;
			this.skinName = "resource/ui/panelYDD/BetDetails/BetDetailsPanelSkin.exml";
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
		}

		public initView(): void
		{
			super.initView();
			if (this._isDetail)
			{
				this.currentState = "betDetail";
				this.details_list.itemRenderer = BetDetailsItem;
			}
			else
			{
				this.currentState = "betRecord";
				this.details_list.itemRenderer = BetRecordsItem;
			}
			this.details_list.dataProvider = this.listData();
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

		private listData(): eui.ArrayCollection
		{
			if (this._isDetail)
			{
				let returnValue = new eui.ArrayCollection(AllData.instance.BetDetailsTypeDatas);
				return returnValue;
			}
			else
			{
				let returnValue = new eui.ArrayCollection(AllData.instance.BetRecordsTypeDatas);
				return returnValue;
			}
		}

		public onBtnClick(e: egret.TouchEvent): void
		{
			let btn = e.target;
			switch (btn)
			{
				case this.close_btn:
					if (this._isDetail)
					{
						AllData.instance.cleanBetDetaile();
					}
					else
					{
						AllData.instance.cleanBetRecord();
					}
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
			this.loading_group.visible = false;
		}

		private onListChange(e): void
		{
			if (this._isDetail)
			{
				if (this.IsGetDataing == false && this.getIsEnd() && this._isHaveMoreData)
				{
					BetDetaileRequest.sendBetDetaileRequest();
					this.IsGetDataing = true;
					this.loading_group.visible = true;
				}
			}
			else
			{
				if (this.IsGetDataing2 == false && this.getIsEnd() && this._isHaveMoreData2)
				{
					BetRecordRequest.sendBetRecordRequest();
					this.IsGetDataing2 = true;
					this.loading_group.visible = true;
				}
			}
		}

		public setDataOver(): void
		{
			this._isHaveMoreData = false;
			this.loading_group.visible = false;
		}

		public setDataOver2(): void
		{
			this._isHaveMoreData2 = false;
			this.loading_group.visible = false;
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
	}
}