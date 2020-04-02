module api
{
	export class ScreenAdaptation
	{
		public constructor()
		{
		}

		public layerdaptation(layer: eui.UILayer): void
		{
			let clientWidth = document.documentElement.clientWidth;
			let clientHeight = document.documentElement.clientHeight;
			let curWidth = 812;
			let curHeight = 375;
			let stageW = clientHeight / curHeight * curWidth;

			if (clientWidth > clientHeight)
			{
				layer.x += (clientWidth - stageW) / 2;
				layer.scaleX = layer.scaleY = clientHeight / curHeight;
			}
			else
			{
				layer.rotation = 90;
				layer.x = clientWidth;
				layer.scaleX = layer.scaleY = clientWidth / curHeight;
				let stageH = layer.scaleX * curWidth;
				layer.y += ( clientHeight - stageH) / 2;
			}
		}
	}
}