module api
{
	export class Tool
	{
		private static _tool: Tool;

		private _adaptationScreenTool: AdaptationScreen;
		public constructor()
		{
			this._adaptationScreenTool = new AdaptationScreen();
		}

		public static get instance(): Tool
		{
			if (Tool._tool == null)
			{
				Tool._tool = new Tool();
			}
			return Tool._tool;
		}

		/**
		 * 屏幕适配工具
		 */
		public get AdaptationScreenTool(): AdaptationScreen
		{
			return this._adaptationScreenTool;
		}
	}
}