

class HttpManager
{
	private _requests: Dictionary<MyRequest>;
	public constructor()
	{
		this._requests = new Dictionary<MyRequest>();
	}

	/**
	 * 请求数据
	 */
	public request(typeStr: string, msgData: any, completeLink?: string): void
	{
		let sunlight = "sunlight=" + this.getRSAStr();
		let language = "&language=" + AllData.instance.Language;
		let content: string = sunlight + language + this.paseObj(msgData);
		// egret.log("发送请求：", msgData);
		let request = this._requests.get(typeStr);
		if (request == null)
		{
			request = new MyRequest(typeStr, content, completeLink);
		}
		else
		{
			request.send(content);
		}
	}
	private getRSAStr(): string
	{
		let publicKey = "-----BEGIN PUBLIC KEY-----\n" +
			"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8sNuKPannn6N0g6lSGcG5HVN0\n" +
			"mGXDZ9+ndwpc5d4d8Xh5SU/w0f/tSTQ58lBs8aywIURxLIPP1/ezCsuZgGl172RC\n" +
			"gHP3zDzprefEIwRdafks0XUls7YETZKJBlXF6U5EIX45LCV9GPnEu3TFM8XBzWpX\n" +
			"DXzbpKB8d9TSBG+wCwIDAQAB\n" +
			"-----END PUBLIC KEY-----";
		let currentTime = new Date().getTime();
		currentTime = Math.floor(currentTime / 6000) * 6000 - 1551571200;
		let src = "24c8a7fb8e2af720d8dc718e+" + AllData.instance.Sunlight + "+" + currentTime;
		let jse = new JSEncrypt();
		jse.setPublicKey(publicKey);
		var value: string = jse.encrypt(src);
		value = encodeURIComponent(value);
		return value;
	}

	private paseObj(msgData: any): string
	{
		if (msgData == null)
		{
			return "";
		}
		let returnValue: string = "";
		let isFirst = true;
		for (let i in msgData)
		{
			returnValue += "&" + i + "=" + msgData[i];
		}
		return returnValue;
	}
}

class MyRequest
{
	private _typeStr: string;
	private _content: string;
	private _request: egret.HttpRequest;
	private _completeLink: string;
	private _timeOutNum: number;
	private _timer: egret.Timer;
	private _isShowTip: boolean;
	public constructor(typeStr: string, content: string, completeLink?: string)
	{
		this._typeStr = typeStr;
		this._content = content;
		this._request = new egret.HttpRequest();
		this._completeLink = completeLink;
		this._isShowTip = true;
		this.openNet();
	}

	private openNet()
	{
		let request = this._request;
		let dizhi = this._completeLink ? this._completeLink : "http://" + AllData.instance.getWebsite() + "/hgmdapp/golden/" + this._typeStr;
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(dizhi, "POST");
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
		request.addEventListener(egret.ProgressEvent.PROGRESS, this.onPostProgress, this);
		this.send(this._content);
	}

	/**
	 * 发送数据
	 */
	public send(conent: string): void
	{
		this._request.send(conent);
		this._isShowTip = true;
		this.starTiming();
	}


	private onPostComplete(event: egret.Event): void
	{
		this._isShowTip = false;
		var request = <egret.HttpRequest>event.currentTarget;
		let data: AllResponseData = JSON.parse(request.response);
		if (data.Code == 200 || data.Code == 400)
		{
			// egret.log("收到服务器消息: ", data);
			game.AppFacade.instance.sendNotification(this._typeStr, data);
		}
		else
		{
			egret.warn("服务器返回错误消息: ", data);
		}
	}

	private onPostIOError(event: egret.IOErrorEvent): void
	{
		egret.warn(this._typeStr + "-post error: ", event);
	}

	private onPostProgress(event: egret.ProgressEvent): void
	{
		console.log("post progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
	}


	/**
	 * 开始计时
	 */
	public starTiming(timeNum: number = 15000): void
	{
		if (timeNum < 0)
		{
			console.warn("开始时间过小");
			return;
		}
		this.startTimer(timeNum);
	}

	private startTimer(time: number): void
	{
		if (this._timer == null)
		{
			this._timer = new egret.Timer(time);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		}
		this._timer.start();
	}

	private removeTimer(): void
	{
		if (this._timer)
		{
			this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._timer.stop();
			this._timer = null;
		}
	}

	private onTimer(e: egret.TimerEvent): void
	{
		this.removeTimer();
		if (this._isShowTip)
		{
			TipsUtils.showTipsFromCenter("当前网络较慢");
		}
	}
}