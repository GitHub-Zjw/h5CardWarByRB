module passWord
{
	export class PassWordPanel extends ZjwComponent
	{
		public cencle_btn: eui.Button;
		public tip_lab: eui.Label;
		public ok_btn: eui.Button;
		public input_elab: eui.EditableText;

		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/passWord/PassWordPanelSkin.exml";
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
			this.input_elab.restrict = "0-9,a-z,A-Z";
			(<eui.Label>this.cencle_btn.labelDisplay).size = 13;
			(<eui.Label>this.ok_btn.labelDisplay).size = 13;
		}
		/**
		 * 添加事件
		 */
		public addEvent(): void
		{
			super.addEvent();
			this.input_elab.addEventListener(egret.Event.CHANGE, this.onInputPw, this);
		}

		/**
		 * 移除事件
		 */
		public removeEvent(): void
		{
			super.removeEvent();
			this.input_elab.removeEventListener(egret.Event.CHANGE, this.onInputPw, this);
		}

		public onBtnClick(e: egret.TouchEvent): void
		{
			let btn = e.target;
			switch (btn)
			{
				case this.cencle_btn:
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_INPUT_PASSWORD);
					break;
				case this.ok_btn:
					PassWordRequest.sendPassWordRequest(this.input_elab.text);
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_INPUT_PASSWORD);
					break;
			}
		}

		private onInputPw(e: egret.TextEvent): void
		{
			this.tip_lab.visible = false;
		}
	}
}