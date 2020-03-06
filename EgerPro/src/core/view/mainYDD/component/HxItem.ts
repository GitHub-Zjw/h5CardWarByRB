class HxItem extends eui.ItemRenderer implements eui.UIComponent
{
	public qj_lab: eui.Label;
	public hx_lab: eui.Label;
	public time_lab0: eui.Label;

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
		this.qj_lab.text = this.data[0];
		this.time_lab0.text = this.data[2];
		let tx = this.hx_lab;
		tx.textFlow = (new egret.HtmlTextParser).parser(this.data[1]);
	}
}