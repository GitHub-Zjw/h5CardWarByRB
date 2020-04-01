module passWord
{
	export class AgreementPanel extends ZjwComponent
	{
		public concel_btn: eui.Button;
		public ok_btn: eui.Button;
		public name_lab: eui.Label;
		public transfer_lab: eui.Label;
		public to_lab: eui.Label;
		public selectBtn: eui.RadioButton;

		private _isSelect: boolean;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/passWord/AgreementPanelSkin.exml";
			this._isSelect = AllData.instance.IsNoShowAgreem;
		}

		protected onBtnClick(e: egret.TouchEvent): void
		{
			let btn = e.target;
			switch (btn)
			{
				case this.concel_btn:
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_AGREEMENT_PANEL);
					break;
				case this.ok_btn:
					AllData.instance.IsNoShowAgreem = this._isSelect;
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_AGREEMENT_PANEL);
					game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_INPUT_PASSWORD);
					break;
				case this.selectBtn:
					this._isSelect = !this._isSelect
					this.selectBtn.selected = this._isSelect;
					break;
			}
		}

		public refreshView(data: game.AgData): void
		{
			this.to_lab.text = data.Data.to;
			this.name_lab.text = data.Data.name;
		}
	}
}