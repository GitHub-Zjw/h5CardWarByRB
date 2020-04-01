module BetRecordRequest
{
	export function sendBetRecordRequest(): void
	{
		let page = Math.ceil(AllData.instance.BetRecordsTypeDatas.length / 6) + 1;
		let content = { page: page };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.userbet, content);
	}
}