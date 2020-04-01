class RegionRed extends BaseRegion
{
	public win_img: eui.Image;

	public constructor()
	{
		super();
		this.skinName = "resource/ui/mainYDD/component/RegionRedSkin.exml";
	}

	protected get StarPointX(): number
	{
		return 0;
	}
	protected get StarPointY(): number
	{
		return this.height + 10;
	}

	protected get SelfStarPointX(): number
	{
		return this.width * 0.45;
	}

	protected get SelfStarPointY(): number
	{
		return this.height ;
	}
}
