module GameResultRequest
{
	export function sendGameResultRequest(): void
	{
		let content = { issue: AllData.instance.getCurrentIssueNumber().toString() };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.gamedata, content);
	}
}