module BetInfoRequest
{
	export function sendBetRequestData(block: number, red: number, lucky: number): void
	{
		let content = { 
			issue: AllData.instance.getCurrentIssueNumber().toString() ,
			block: block,
			red: red,
			lucky: lucky
		};
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.jhbet, content);
	}
}