module passWord
{
	export class PassWordMediator extends BasePanelMediator
	{
		public static NAME: string = "PassWordMediator";

		public constructor(viewComponent: any = null)
		{
			super(PassWordMediator.NAME, viewComponent);
			AgRequest.sendAgRequest();
		}

		public listNotificationInterests(): Array<any>
		{
			return [
				PanelNotify.OPEN_INPUT_PASSWORD,
				PanelNotify.CLOSE_INPUT_PASSWORD,
				PanelNotify.OPEN_AGREEMENT_PANEL,
				PanelNotify.CLOSE_AGREEMENT_PANEL,
				GameNotify.PWD,
				GameNotify.AG_DATA
			];
		}
		private _passWordPanel: PassWordPanel;
		public handleNotification(notification: puremvc.INotification): void
		{
			let badyData = notification.getBody();
			let group = "passWord";//要确保
			switch (notification.getName())
			{
				case PanelNotify.OPEN_INPUT_PASSWORD:
					if (RES.getRes("srbmBg_png"))
					{
						if (AllData.instance.IsNoShowPwd)
						{
							let data = AllData.instance;
							BetInfoRequest.sendBetRequestData(data.MyBetBlackNum, data.MyBetRedNum, data.MyBetOtherNum);
						}
						else
						{
							this.showMainUI();
						}
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
					PopUpManager.removePopUp(this._passWordPanel, 0);
					this.destroy();
					break;
				case PanelNotify.OPEN_AGREEMENT_PANEL:
					if (RES.getRes("srbmBg_png"))
					{
						this.showAgPanel();
					}
					else
					{
						RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showAgPanel, this);
						RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
						RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
					}
					RES.loadGroup(group);
					break;
				case PanelNotify.CLOSE_AGREEMENT_PANEL:
					this.hideAgPanle();
					break;
				case GameNotify.PWD:
					if (badyData)
					{
						let data = AllData.instance;
						BetInfoRequest.sendBetRequestData(data.MyBetBlackNum, data.MyBetRedNum, data.MyBetOtherNum);
						AllData.instance.IsNoShowPwd = AllData.instance.IsNoShowAgreem;
					}
					else
					{
						TipsUtils.showTipsFromCenter("密码错误");
					}
					break;
				case GameNotify.AG_DATA:
					this._agPanelData = badyData;
					break;
			}
		}
		
		private _agPanelData: game.AgData;

		public showMainUI(): void
		{
			if (this._passWordPanel == null)
			{
				this._passWordPanel = new PassWordPanel();
			}
			this.showUI(this._passWordPanel, false, 384, 191, 1);
		}

		private _agPanel: AgreementPanel;
		public showAgPanel(): void
		{
			if (this._agPanel == null)
			{
				this._agPanel = new AgreementPanel(this._agPanelData);
			}
			PopUpManager.addPopUp(this._agPanel, true, 384, 375, 1);
		}

		public hideAgPanle(): void
		{
			if (this._agPanel)
			{
				PopUpManager.removePopUp(this._agPanel, 0);
				if (this._agPanel)
				{
					RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.showAgPanel, this);
					RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.stLoadProcess, this);
					RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.error, this);
					this._agPanel = null;
					super.destroy();
				}
			}
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