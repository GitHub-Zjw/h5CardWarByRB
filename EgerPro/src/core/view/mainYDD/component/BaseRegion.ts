class BaseRegion extends eui.Component implements eui.UIComponent
{
	public line_img: eui.Image;
	public showLine: egret.tween.TweenGroup;
	public win_img: eui.Image;

	private _balls: BallCom[];
	private _myBalls: BallCom[];
	public constructor()
	{
		super();
		this._balls = [];
		this._myBalls = [];
		this.addEventListener(eui.UIEvent.COMPLETE, this.onUIComplete, this);
	}

	private onUIComplete(): void
	{
	}


	protected partAdded(partName: string, instance: any): void
	{
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void
	{
		super.childrenCreated();
	}

	/**
	 * 播放亮光
	 */
	public playLineAmi(): void
	{
		this.showLine.play(0);
	}

	/**
	 * 显示胜利动画
	 */
	public showWinAmi(): void
	{
		this.playLineAmi();
		if (this.win_img)
		{
			let num = this.numChildren - 1;
			this.setChildIndex(this.win_img, num);
			this.win_img.alpha = 1;
		}
	}

	/**隐藏胜利标签 */
	public hideWin(): void
	{
		this.win_img.alpha = 0;
	}

	/**
	 * 增加小球
	 * @param indexs 小球类型数组
	 * @param boolean 是否是玩家本人
	 */
	public addBall(indexs: number[], isSelf: boolean = false): void
	{
		if (indexs && indexs.length > 0)
		{
			core.SoundUtils.getInstance().playSound(6);
		}
		let len = indexs.length;
		for (let i = 0; i < len; i++)
		{
			let ball: BallCom = ObjectPool.instance.pop(BallCom.NAME);
			ball.setData(indexs[i]);
			this.addChild(ball);
			if (isSelf)
			{
				ball.x = this.SelfStarPointX;
				ball.y = this.SelfStarPointY;
				this._myBalls.push(ball);
			}
			else
			{
				ball.x = this.StarPointX;
				ball.y = this.StarPointY;
				this._balls.push(ball);
			}
			let pEnd = this.getEndPoint();
			ball.showJoinAmi(pEnd.x, pEnd.y);
		}
	}

	/**
	 * 移除小球
	 */
	public removeAllBall(): void
	{
		let len = this._balls.length;
		for (let i = 0; i < len; i++)
		{
			ObjectPool.instance.push(this._balls[i], "hideBall");
			this.removeChild(this._balls[i]);
		}
		this._balls = [];
		this.withdrawBall();
		this.hideWin();
	}

	/**
	 * 撤回小球
	 */
	public withdrawBall(): boolean
	{
		let len = this._myBalls.length;
		if (len == 0)
		{
			return false;
		}
		for (let i = 0; i < len; i++)
		{
			ObjectPool.instance.push(this._myBalls[i], "hideBall");
			this.removeChild(this._myBalls[i]);
		}
		this._myBalls = [];
		return true;
	}

	/**投注成功 */
	public onBetSucceed(): void
	{
		this._balls.push.apply(this._balls, this._myBalls);
		this._myBalls = [];
	}

	/**
	 * 获取小球最终停止点
	 */
	protected getEndPoint(): egret.Point
	{
		let pEnd = new egret.Point();
		pEnd.x = AllData.instance.getRandomF(0, this.width * 0.7);
		pEnd.y = AllData.instance.getRandomF(this.height * 0.35, this.height * 0.7);

		let leftDownP = new egret.Point(0, this.height);
		if (AllData.instance.getDistance(pEnd, leftDownP) < this.height * 0.7)
		{
			return this.getEndPoint();
		}
		return pEnd;
	}

	protected get StarPointX(): number
	{
		return 0;
	}
	protected get StarPointY(): number
	{
		return this.height;
	}

	protected get SelfStarPointX(): number
	{
		return 100;
	}

	protected get SelfStarPointY(): number
	{
		return this.height;
	}
}