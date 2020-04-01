module PassWordRequest
{
	export function sendPassWordRequest(passWord: string): void
	{
		let publicKey = "-----BEGIN PUBLIC KEY-----\n" +
			"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8sNuKPannn6N0g6lSGcG5HVN0\n" +
			"mGXDZ9+ndwpc5d4d8Xh5SU/w0f/tSTQ58lBs8aywIURxLIPP1/ezCsuZgGl172RC\n" +
			"gHP3zDzprefEIwRdafks0XUls7YETZKJBlXF6U5EIX45LCV9GPnEu3TFM8XBzWpX\n" +
			"DXzbpKB8d9TSBG+wCwIDAQAB\n" +
			"-----END PUBLIC KEY-----";
		let jse = new JSEncrypt();
		jse.setPublicKey(publicKey);
		var value: string = jse.encrypt(passWord);
		value = encodeURIComponent(value);
		let content = { password: value };
		game.AppFacade.getInstance().HttpManager.request(RequestsNotify.checkpwd, content, "http://www.libraw.io/hgmdapp/open/checkpwd");
	}
}