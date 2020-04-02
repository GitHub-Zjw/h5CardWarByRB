class Scoreboard extends eui.Component implements eui.UIComponent
{
	public wpRed_lab: eui.Label;
	public wpBlack_lab: eui.Label;
	public wpOther_lab: eui.Label;
	public board_group: eui.Group;

	public _pointImages: eui.Image[];
	public constructor()
	{
		super();
		this.skinName = "resource/ui/mainYDD/component/ScoreboardSkin.exml";
		this._pointImages = [];
	}

	protected partAdded(partName: string, instance: any): void
	{
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void
	{
		super.childrenCreated();
	}

	/**
	 * 记录本局胜利区域
	 */
	public addWinner(): void
	{
		let winner = AllData.instance.Winner;
		this.addOneWinner(winner);
	}

	/**
	 * 记录历史胜利
	 */
	public addAllWinner(): void
	{
		if (this._pointImages.length > 0)
		{
			return;
		}
		let allwinner = AllData.instance.AllWinners;
		let len = allwinner.length
		for (let i = 0; i < len; i++)
		{
			this.addOneWinner(allwinner[i]);
		}
		let wp = AllData.instance.getWP();
		this.wpBlack_lab.text = wp.black;
		this.wpRed_lab.text = wp.red;
		this.wpOther_lab.text = wp.other;
	}

	private addOneWinner(winner: EnumerationType.RegionWinner): void
	{
		let imgS: string = AllData.instance.getPointImgByReion(winner);
		let winPoint: eui.Image = ObjectPool.instance.pop("eui.Image", imgS);
		winPoint.width = 15;
		winPoint.height = 15;
		this.board_group.addChild(winPoint);
		this._pointImages.push(winPoint);
		if (this._pointImages.length == 60)
		{
			this.updateWinner();
		}
	}

	private updateWinner(): void
	{
		let newPoint: eui.Image[] = [];
		this.removeAllChild();
		for (let i = 6; i <= 54; i++)
		{
			newPoint.push(this._pointImages[i]);
		}
		this._pointImages = [];
		this._pointImages = newPoint;
		this.addAllChild();
	}

	private removeAllChild(): void
	{
		let len = this._pointImages.length;
		for (let i = 0; i < len; i++)
		{
			this.board_group.removeChild(this._pointImages[i]);
		}
	}

	private addAllChild(): void
	{
		let len = this._pointImages.length;
		for (let i = 0; i < len; i++)
		{
			this.board_group.addChild(this._pointImages[i]);
		}
	}
}