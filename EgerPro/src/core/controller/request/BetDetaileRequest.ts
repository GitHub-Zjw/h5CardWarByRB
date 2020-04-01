module BetDetaileRequest
{
	export function sendBetDetaileRequest(): void
	{
		let page = Math.ceil(AllData.instance.BetDetailsTypeDatas.length / 6) + 1;
		let content = { page: page };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.betdetails, content);
	}
}