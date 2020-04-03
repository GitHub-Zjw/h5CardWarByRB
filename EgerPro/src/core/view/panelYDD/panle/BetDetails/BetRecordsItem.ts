module betDetails
{
	export class BetRecordsItem extends eui.ItemRenderer implements eui.UIComponent
	{
		public betNum_lab: eui.Label;
		public TorF_lab: eui.Label;
		public color_img0: eui.Image;
		public color_img1: eui.Image;
		public color_img2: eui.Image;

		public data: BetRecordsTypeData;
		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/BetDetails/BetRecordsItemSkin.exml";
		}

		protected dataChanged(): void
		{
			this.betNum_lab.text = this.data.money;
			this.TorF_lab.text = this.data.isWin;
			if (this.data.isWin[0] == "-")
			{
				this.TorF_lab.textColor = 0xDC5558;
			}
			else
			{
				this.TorF_lab.textColor = 0x65B54D;
			}
			let imgS: string = "";
			let len = this.data.region.length;
			this.color_img0.visible = false;
			this.color_img1.visible = false;
			this.color_img2.visible = false;
			if (len == 1)
			{
				this.setColorImg(this.data.region[0], this.color_img1);
			}
			else if (len == 2)
			{
				this.setColorImg(this.data.region[0], this.color_img0);
				this.setColorImg(this.data.region[1], this.color_img2);
			}
			else if (len == 3)
			{
				this.setColorImg(this.data.region[0], this.color_img0);
				this.setColorImg(this.data.region[1], this.color_img1);
				this.setColorImg(this.data.region[2], this.color_img2);
			}
		}
		
		private setColorImg(type: EnumerationType.RegionWinner, img: eui.Image): void
		{
			let imgS: string = "";
			switch (type)
			{
				case EnumerationType.RegionWinner.black:
					imgS = "heiSheng";
					break;
				case EnumerationType.RegionWinner.red:
					imgS = "hongSheng";
					break;
				case EnumerationType.RegionWinner.blackS:
				case EnumerationType.RegionWinner.redS:
					imgS = "otherPoint";
					break;
				default:
					break;
			}
			imgS += "_png"
			img.source = imgS;
			img.visible = true;
		}
	}
}