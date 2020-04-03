module GameResultRequest
{
	export function sendGameResultRequest(): void
	{
		AllData.instance.qihao = AllData.instance.getCurrentIssueNumber();
		let content = { issue: AllData.instance.qihao };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.gamedata, content);
	}
}