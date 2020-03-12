module passWord
{
	export class PassWordMediator extends BasePanelMediator
	{
		public static NAME: string = "PassWordMediator";

		public constructor(viewComponent: any = null)
		{
			super(PassWordMediator.NAME, viewComponent);
		}

		public listNotificationInterests(): Array<any>
		{
			return [
				PanelNotify.OPEN_INPUT_PASSWORD,
				PanelNotify.CLOSE_INPUT_PASSWORD
			];
		}
		private _passWordPanel: PassWordPanel;
		public handleNotification(notification: puremvc.INotification): void
		{
			let badyData = notification.getBody();

			switch (notification.getName())
			{
				case PanelNotify.OPEN_INPUT_PASSWORD:
					let group = "passWord";//要确保
					if (RES.getRes("srbmBg_png"))
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
				case PanelNotify.CLOSE_INPUT_PASSWORD:
					this.closePanel(1);
					break;
			}
		}

		public showMainUI(): void
		{
			if (this._passWordPanel == null)
			{
				this._passWordPanel = new PassWordPanel();
			}
			this.showUI(this._passWordPanel, true, 384, 191, 1);
		}

		private stLoadProcess(): void
		{ }

		private error(): void
		{
			console.warn("资源加载失败：passWord");
		}

		/**
		 * 面板关闭后需要销毁的对象
		 */
		public destroy(): void
		{
			RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showMainUI, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
			RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
			this._passWordPanel = null;
			super.destroy();
		}
	}
}