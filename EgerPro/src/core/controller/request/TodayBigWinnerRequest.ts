module TodayBigWinnerRequest
{
	export function sendTodayBigWinnerRequest(): void
	{
		let page = Math.ceil(AllData.instance.BigWinnerDatas.length / 6) + 1;
		let content = { page: page };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.bigwin, content);
	}
}