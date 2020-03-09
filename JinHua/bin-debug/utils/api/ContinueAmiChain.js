var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 连续动画链
 */
var ContinueAmiChain = (function () {
    /**
     * @param timeSpeed 检查时间间隔
     */
    function ContinueAmiChain(timeSpeed) {
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
    ContinueAmiChain.prototype.registerAction = function (fun, thisArg, starCheck, needCheck, parameter) {
        var pushIndex = this._amiFunctionChain.length;
        this._amiFunctionChain[pushIndex] = fun;
        this._objChain[pushIndex] = thisArg;
        this._starChecks[pushIndex] = starCheck;
        this._needCheck[pushIndex] = needCheck;
        this._parameterChain[pushIndex] = parameter;
        this._starPoins = [];
        var starPoins = this.getAllStarPoint();
        var len = starPoins.length;
        for (var i = 0; i < len; i++) {
            var pointTemp = { index: starPoins[i].index, value: starPoins[i].value };
            this._starPoins.push(pointTemp);
            for (var j = i + 1; j < len; j++) {
                if (starPoins[j].value < starPoins[i].value) {
                    var temp = starPoins[j];
                    starPoins[j] = starPoins[i];
                    starPoins[i] = temp;
                }
            }
        }
        for (var i = 0; i < len; i++) {
            var temp = starPoins[i];
            this._doOrderIndex[i] = temp.index;
        }
    };
    /**
     * 开始执行
     */
    ContinueAmiChain.prototype.play = function () {
        this._nextDoIndex = 0;
        this._currentCheckNum = 0;
        this.startTimer();
    };
    ContinueAmiChain.prototype.startTimer = function () {
        if (this._timer == null) {
            this._timer = new egret.Timer(this._timeSpeed);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        }
        this._timer.start();
        this.onTimer(null);
    };
    ContinueAmiChain.prototype.removeTimer = function () {
        if (this._timer) {
            this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.stop();
            this._timer = null;
        }
    };
    //发牌具体时间控制
    ContinueAmiChain.prototype.onTimer = function (e) {
        this.checkToDo();
        this._currentCheckNum++;
    };
    /**判断，执行函数 */
    ContinueAmiChain.prototype.checkToDo = function () {
        var index = this._doOrderIndex[this._nextDoIndex];
        if (index == undefined) {
            this.removeTimer();
            return;
        }
        if (this._starPoins[index].value == this._currentCheckNum) {
            this._amiFunctionChain[index].apply(this._objChain[index], [this._parameterChain[index]]);
            this._nextDoIndex++;
            this.checkToDo();
        }
    };
    /**
     * 获取所有函数的执行检查点
     */
    ContinueAmiChain.prototype.getAllStarPoint = function () {
        var returnValue = [];
        var temp = {
            index: 0,
            value: this._starChecks[0]
        };
        if (temp != null) {
            returnValue.push(temp);
        }
        var len = this._amiFunctionChain.length;
        for (var i = 1; i < len; i++) {
            var time = this._starChecks[i];
            for (var k = i - 1; k >= 0; k--) {
                time += this._starChecks[k];
                time += this._needCheck[k];
            }
            var temp2 = {
                index: i,
                value: time
            };
            returnValue.push(temp2);
        }
        return returnValue;
    };
    return ContinueAmiChain;
}());
__reflect(ContinueAmiChain.prototype, "ContinueAmiChain");
//# sourceMappingURL=ContinueAmiChain.js.map