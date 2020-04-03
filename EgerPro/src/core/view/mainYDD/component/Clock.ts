class Clock extends eui.Component implements eui.UIComponent
{
	public surplusTime_lab: eui.Label;

	private _timer: egret.Timer;
	private _surplusTime: number = 25;
	private _call: Function;
	public constructor()
	{
		super();
		this.skinName = "resource/ui/mainYDD/component/ClockSkin.exml";
	}

	protected partAdded(partName: string, instance: any): void
	{
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void
	{
		super.childrenCreated()
	}

	public dispose(): void
	{
		this.removeTimer();
	}

	/**
	 * 开始计时
	 */
	public starTiming(timeNum: number = 25, call: Function): void
	{
		if (timeNum < 0)
		{
			console.warn("开始时间过小");
			return ;
		}
		this.visible = true;
		this._surplusTime = timeNum;
		this.surplusTime_lab.text = this._surplusTime.toString();
		this.startTimer(1000);
		this._call = call;
	}

	private startTimer(time: number): void
	{
		if (this._timer == null)
		{
			this._timer = new egret.Timer(time);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		}
		this._timer.start();
		this.onTimer(null);
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
		this._surplusTime--;
		if (this._surplusTime < 0)
		{
			this.visible = false;
			AllData.instance.dispatchEventWith(GameNotify.STOP_BETS);
			this._call.apply(game.MainManager.mainUI);
			this.removeTimer();
		}
		else
		{
			this.surplusTime_lab.text = this._surplusTime.toString();
			if (this._surplusTime == 3)
			{
				core.SoundUtils.getInstance().playSound(5);
			}
			if (this._surplusTime && this._surplusTime % 5 == 0)
			{
				BetMoneyRequest.sendBetMoneyRequest();
			}
		}
	}
}