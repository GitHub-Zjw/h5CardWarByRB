module gameMethod
{
	export class GameMethodItem extends eui.ItemRenderer implements eui.UIComponent
	{
		public winner_lab: eui.Label;
		public regionType_lab: eui.Label;
		public moneyNum_lab: eui.Label;

		public data: bigWinner.RankItemTypeData;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/GameMethod/GameMethodItemSkin.exml"
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
			this.winner_lab.text = this.data.playerName;
			this.regionType_lab.text = this.data.jiangBeiNum;
			this.moneyNum_lab.text = this.data.value;
		}
	}
}