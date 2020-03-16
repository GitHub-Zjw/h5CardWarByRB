var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 弹窗消息
* by dily
* (c) copyright 2014 - 2035
* All Rights Reserved.
*/
var PanelNotify = (function () {
    function PanelNotify() {
    }
    /**
     * 打开 停止下注
     */
    PanelNotify.OPEN_STOP_BET = "PANELNOTIFY_OPEN_STOP_BET";
    /**
     * 关闭 停止下注
     */
    PanelNotify.CLOSE_STOP_BET = "PANELNOTIFY_CLOSE_STOP_BET";
    /**
     * 打开
     * true: 投注详情
     * false: 投注记录
     */
    PanelNotify.OPEN_BET_DETAIL = "PANELNOTIFY_OPEN_BET_DETAIL";
    /**关闭投注详情 */
    PanelNotify.CLOSE_BET_DETAIL = "PANELNOTIFY_CLOSE_BET_DETAIL";
    /**
     * 打开
     * true: 大奖界面
     * false: 玩法界面
     */
    PanelNotify.OPEN_GAME_METHOD = "PANELNOTIFY_OPEN_GAME_METHOD";
    /**关闭大奖玩法界面 */
    PanelNotify.CLOSE_GAME_METHOD = "PANELNOTIFY_CLOSE_GAME_METHOD";
    /**打开大奖玩家界面 */
    PanelNotify.OPEN_BIG_WINNER = "PANELNOTIFY_OPEN_BIG_WINNER";
    /**关闭大奖玩家界面 */
    PanelNotify.CLOSE_BIG_WINNER = "PANELNOTIFY_CLOSE__BIG_WINNER";
    /**打开输入密码界面 */
    PanelNotify.OPEN_INPUT_PASSWORD = "PANELNOTIFY_OPEN_INPUT_PASSWORD";
    /**关闭输入密码界面 */
    PanelNotify.CLOSE_INPUT_PASSWORD = "PANELNOTIFY_CLOSE_INPUT_PASSWORD";
    return PanelNotify;
}());
__reflect(PanelNotify.prototype, "PanelNotify");
//# sourceMappingURL=PanelNotify.js.map