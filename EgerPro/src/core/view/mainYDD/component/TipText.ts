class TipText extends eui.Component implements  eui.UIComponent {
	private _str: string;
	public tip_lab: eui.Label;
	public bg_png: eui.Image;
	public constructor(tip: string) {
		super();
		this._str = tip;
		this.skinName = "resource/ui/mainYDD/component/TipTextSkin.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.tip_lab.text = this._str;
		this.bg_png.width = this.tip_lab.width + 60;
	}
	
}