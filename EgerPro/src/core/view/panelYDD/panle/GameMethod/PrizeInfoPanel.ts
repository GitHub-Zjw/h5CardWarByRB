module gameMethod
{
	export class PrizeInfoPanel extends ZjwComponent
	{

		public scr: eui.Scroller;
		public close_btn: eui.Button;
		public descrotion_lab: eui.Label;

		public constructor()
		{
			super();
			this.skinName = "resource/ui/panelYDD/GameMethod/PrizeInfoPanelSkin.exml"
		}

		protected partAdded(partName: string, instance: any): void
		{
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void
		{
			super.childrenCreated();
			this.scr.verticalScrollBar.visible = false;
			this.scr.verticalScrollBar.autoVisibility = false;
			this.descrotion_lab.text = this.desc;
		}


		protected onBtnClick(e: egret.TouchEvent): void
		{
			super.onBtnClick(e);

			let btn = e.target;
			switch (btn)
			{
				case this.close_btn:
					game.AppFacade.getInstance().sendNotification(PanelNotify.CLOSE_GAME_METHOD, true);
					break;
			}
		}

		private get desc(): string
		{
			return "·可验证公平性\n\n    开放投注前,服务端生成随机数种子,由其决定本局两手牌,确保牌型在游戏开始前已确定。将种子签名交给智能合约,以便在链上查验,您也可在游戏页面查看。\n    选择本局游戏停止下注后的首个区块ID为0或者为5的区块,以该区块的区块哈希尾数决定黑方牌归属,余下那组自动成为红方牌。\n    由于去中心化特征,区块希是不可预测和不可篡改的,因此也最为公平。\n\n·玩法介绍\n\n    红黑大战分为红黑双方进行三张手牌的比拼,玩家可根据历史走势及自身判断投注。\n\n·玩法步骤\n\n    STEP 1 投注并支付\n    开局后,玩家可以单独或者同时下注黑方区域、红方区域、Lucky card。在黑方或红方下注,表示押这方获胜。在Lucky card下注,表示押胜方持有特定牌型:豹、金、金花、顺子、对9-A。\n    玩家选择筹码,点击相应区域进行投注。投注后,请及时支付,若在45秒投注时间内支付,则支付失败。\n    STEP 2 亮牌与结算\n    亮出红黑双方手牌,进行结算。赢家奖金=投注金额*赔率。\n\n·规则介绍\n\n    1.牌型说明\n        用牌为4种花色的A-K,无大小王,共52张牌。牌型分为特殊牌型与散牌两类。\n       特殊牌型\n        豹子:三张点数相同的牌。AAA最大,222最小。\n        顺金:花色相同的顺子。QKA最大,A23最小。\n        金花:三张花色相同的牌,且非顺子。JKA最大,235最小。\n        顺子:花色不同的顺子。最大的顺子为花色不同的QKA,最小的顺子为花色不同的A23。\n        对子:两张点数相同的牌。AAK最大,223最小。\n       散牌\n        无法构成以上特殊牌型的三张牌,称为散牌。JKA最大,235最小。\n    2.手牌比较\n        首先比较牌型大小,若牌型相同,依据上方同类牌型的大小说明进行比较。\n        若双方三张手牌除花色外都相同,以最大牌花色论输赢。\n        牌型:豹子>顺金>金花>顺子>对子>散牌\n        牌点A>K>Q>J>10>9>8>7>6>5>4>3>2\n        花色:黑桃>红桃>梅花>方块\n";
		}
	}
}