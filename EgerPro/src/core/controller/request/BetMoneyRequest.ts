module BetMoneyRequest
{
	export function sendBetMoneyRequest(): void
	{
		let content = { issue: AllData.instance.getCurrentIssueNumber().toString() };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.jhbetcoin, content);
	}
}