module bigWinner
{
	export class BigWinnerItem extends eui.ItemRenderer implements eui.UIComponent
	{
		public jiangBei_img: eui.Image;
		public playerName_lab: eui.Label;
		public value_lab: eui.Label;

		public data: RankItemTypeData;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/BigWinner/BigWinnerItemSkin.exml";
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
		}

		protected dataChanged(): void
		{
			this.jiangBei_img.source = "jiangBei" + this.data.jiangBeiNum + "_png";
			this.playerName_lab.text = this.data.playerName;
			this.value_lab.text = this.data.value;
		}
	}
}