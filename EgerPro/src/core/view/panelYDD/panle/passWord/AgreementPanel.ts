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
		public money_lab: eui.Label;
		public hjk_lab: eui.Label;
		public selectBtn2: eui.RadioButton

		private _isSelect: boolean;
		private _agData: game.AgData;
		public constructor(data: game.AgData)
		{
			super();
			this._agData = data;
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
					setTimeout(function() {
						game.AppFacade.getInstance().sendNotification(PanelNotify.OPEN_INPUT_PASSWORD);
					}, 200);
					break;
				case this.selectBtn2:
					this._isSelect = !this._isSelect;
					this.selectBtn.selected = this._isSelect;
					break;
			}
		}

		public refreshView(data: game.AgData): void
		{
			this.to_lab.text = data.Data.to;
			this.name_lab.text = data.Data.name;
			this.money_lab.text = (AllData.instance.MyBetBlackNum + AllData.instance.MyBetRedNum + AllData.instance.MyBetOtherNum) + "HDAG";
			this.transfer_lab.text = data.Data.to;
			this.hjk_lab.text = AllData.instance.Sunlight;
		}

		public initView(): void
		{
			super.initView();
			this.refreshView(this._agData);
		}
	}
}