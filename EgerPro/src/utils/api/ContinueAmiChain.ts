/**
 * 连续动画链
 */
class ContinueAmiChain
{
	private _amiFunctionChain: Function[];			//方法链
	private _objChain: Object[];					//执行方法的对象，与方法链一一对应
	private _parameterChain: Object[];				//参数，与方法链一一对应
	private _starChecks: number[];					//开始执行的检查点(相对于上一个)，与方法链一一对应
	private _starPoins: NIDictionarie[];			//开始执行的检查点(相对于开始点)
	private _needCheck: number[];					//需要持续的检查点个数，与方法链一一对应

	private _timeSpeed: number;						//每次检查的时间间隔
	private _currentCheckNum: number;				//当前检查的次数
	private _timer: egret.Timer;					//计时器

	private _doOrderIndex: number[];				//执行顺序索引
	private _nextDoIndex: number;					//下一次执行函数的索引，与 _doOrderIndex 对应

	/**
	 * @param timeSpeed 检查时间间隔
	 */
	public constructor(timeSpeed: number)
	{
		this._timeSpeed = timeSpeed;
		this._amiFunctionChain = [];
		this._objChain = [];
		this._parameterChain = [];
		this._starChecks = [];
		this._needCheck = [];
		this._doOrderIndex = [];
		this._currentCheckNum = 0;
		this._nextDoIndex = 0;
	}

	/**
	 * 注册进一个函数
	 * @param fun 执行函数
	 * @param thisArg 执行对象
	 * @param starCheck	需要在第几个检查点执行,这里是相对于前一个函数的结束点（可为负数）
	 * @param needCheck 需要执行的时长
	 * @param parameter 执行函数参数
	 */
	public registerAction(fun: Function, thisArg: Object, starCheck: number, needCheck: number, parameter?: Object): void
	{
		let pushIndex = this._amiFunctionChain.length;
		this._amiFunctionChain[pushIndex] = fun;
		this._objChain[pushIndex] = thisArg;
		this._starChecks[pushIndex] = starCheck;
		this._needCheck[pushIndex] = needCheck;
		this._parameterChain[pushIndex] = parameter;

		this._starPoins = [];
		let starPoins: NIDictionarie[] = this.getAllStarPoint();
		let len = starPoins.length;
		for (let i = 0; i < len; i++)
		{
			let pointTemp: NIDictionarie = { index: starPoins[i].index, value: starPoins[i].value };
			this._starPoins.push(pointTemp);
			for (let j = i + 1; j < len; j++)
			{
				if (starPoins[j].value < starPoins[i].value)
				{
					let temp = starPoins[j];
					starPoins[j] = starPoins[i];
					starPoins[i] = temp;
				}
			}
		}
		for (let i = 0; i < len; i++)
		{
			let temp = starPoins[i];
			this._doOrderIndex[i] = temp.index;
		}
	}

	/**
	 * 开始执行
	 */
	public play(): void
	{
		this._nextDoIndex = 0;
		this._currentCheckNum = 0;
		this.startTimer();
	}

	private startTimer(): void
	{
		if (this._timer == null)
		{
			this._timer = new egret.Timer(this._timeSpeed);
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

	//发牌具体时间控制
	private onTimer(e: egret.TimerEvent): void
	{
		this.checkToDo();
		this._currentCheckNum++;
	}

	/**判断，执行函数 */
	private checkToDo(): void
	{
		let index = this._doOrderIndex[this._nextDoIndex];
		if (index == undefined)
		{
			this.removeTimer();
			return;
		}
		if (this._starPoins[index].value == this._currentCheckNum)
		{
			this._amiFunctionChain[index].apply(this._objChain[index], [this._parameterChain[index]]);
			this._nextDoIndex++;
			this.checkToDo();
		}
	}

	/**
	 * 获取所有函数的执行检查点
	 */
	private getAllStarPoint(): NIDictionarie[]
	{
		let returnValue: NIDictionarie[] = [];
		let temp: NIDictionarie = {
			index: 0,
			value: this._starChecks[0]
		};
		if (temp != null)
		{
			returnValue.push(temp);
		}

		let len = this._amiFunctionChain.length;
		for (let i = 1; i < len; i++)
		{
			let time: number = this._starChecks[i];
			for (let k = i - 1; k >= 0; k--)
			{
				time += this._starChecks[k];
				time += this._needCheck[k];
			}
			let temp2: NIDictionarie = {
				index: i,
				value: time
			};
			returnValue.push(temp2);
		}
		return returnValue;
	}
}

interface NIDictionarie
{
	index: number,
	value: number
}