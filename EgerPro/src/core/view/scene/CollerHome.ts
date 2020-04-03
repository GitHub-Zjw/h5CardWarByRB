module game
{
	export class CollerHome extends eui.Component implements eui.UIComponent
	{
		public moreAll_btn: eui.Button;
		public closeAll_btn: eui.Button;
		public all_group: eui.Group;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/scene/CollerHomeSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
			this.moreAll_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMoreAllBtnClick, this);
			this.closeAll_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseAllBtnClick, this);
			this.layerdaptation();
		}

		private onMoreAllBtnClick(e: egret.TouchEvent): void
		{
			// TipsUtils.showTipsFromCenter("更多按钮点击");
		}

		private onCloseAllBtnClick(e: egret.TouchEvent): void
		{
			let str = GameConfig.systemType();
			core.SoundUtils.getInstance().stopAllSound();
			setTimeout(function ()
			{
				if (str == "windows")
				{
					window.close();
				}
				else if (str == "ios")
				{
					eval("finishPage()");
				}
				else if (str == "android")
				{
					eval("javaInterface.finishPage()");
				}
			}, 500);
		}


		private layerdaptation(): void
		{
			let clientWidth = document.documentElement.clientWidth;
			let clientHeight = document.documentElement.clientHeight;
			let curWidth = 812;
			let curHeight = 375;
			let stageW = curHeight / clientHeight;
			if (clientWidth > clientHeight)
			{
				let change = curHeight / clientHeight;
				// this.all_group.x += (clientWidth - curWidth) / 2 - 5;
				this.all_group.x = clientWidth - (clientWidth - curWidth) / 2 - 40;
				this.all_group.scaleX = this.all_group.scaleY = change;
			}
			else
			{
				let change = curHeight / clientWidth;
				this.all_group.scaleX = this.all_group.scaleY = change;
				this.all_group.x = clientHeight - 15;
			}
			this.all_group.y = 10;
		}
	}
}