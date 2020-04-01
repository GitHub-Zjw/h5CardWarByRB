module passWord
{
	export class SelectBtn extends eui.Button implements eui.UIComponent
	{
		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/passWord/SelectBtn.exml";
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
		}
	}
}