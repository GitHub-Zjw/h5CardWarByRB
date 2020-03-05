export class HxItem extends eui.ItemRenderer implements eui.UIComponent
{
	public playerName_lab: eui.Label;
	public playerbet_lab: eui.Label;
	public color_img: eui.Image;

	public data: string[];
	public constructor()
	{
		super();
		this.skinName = "resource/ui/mainYDD/component/HxItemSkin.exml"
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
	}
}