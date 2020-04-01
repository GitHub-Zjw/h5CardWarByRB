class GameNotify
{
	public constructor()
	{
	}


	/**
	 * 游戏结束
	 */
	public static GAME_OVER: string = "GameNotify_GAME_OVER";

	/**
	 * 游戏开始
	 */
	public static GAME_STAR: string = "GameNotify_GAME_STAR";

	/**
	 * 下注时间到
	 */
	public static STOP_BETS: string = "GameNotify_STOP_BETS";

	/**
	 * 发牌
	 */
	public static SEND_CARD: string = "GameNotify_SEND_CARD";

	/**首次打开游戏 */
	public static FIRST_OPEN_GAME: string = "FIRST_OPEN_GAME";

	/**游戏首页信息获取*/
	public static HOME_PAGE_DATA: string = "HOME_PAGE_DATA";

	/**本局投注金额消息 */
	public static BET_MONEY: string = "BET_MONEY";

	/**玩家下注消息 */
	public static BET: string = "BET";

	/**游戏结果消息 */
	public static GAME_RESULT: string = "GAME_RESULT";

	/**投注详情信息 */
	public static BET_DETAILE: string = "BET_DETAILE";

	/**投注详情数据已全部获取 */
	public static BET_DETAILE_OVER: string = "BET_DETAILE_OVER";

	/**投注记录信息 */
	public static BET_RECORD: string = "BET_RECORD";

	/**投注记录数据已全部获取 */
	public static BET_RECORD_OVER: string = "BET_RECORD_OVER";

	/**密码验证 */
	public static PWD: string = "PWD";

	/**今日大赢家数据获取 */
	public static BIG_WINNER: string = "BIG_WINNER";
	
	/**今日大赢家数据已全部获取 */
	public static BIG_WINNER_OVER: string = "BIG_WINNER_OVER";

	/**交易信息 */
	public static AG_DATA: string = "AG_DATA";
}