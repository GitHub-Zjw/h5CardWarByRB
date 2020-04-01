module AgRequest
{
	export function sendAgRequest(): void
	{
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.trainfo, null);
	}
}