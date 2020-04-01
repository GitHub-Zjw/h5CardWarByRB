  /**
    * 注册controller
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved.
    * 注意：
    * 1、主界面和场景管理使用消息通信机制，但是
    */
module game {

	export class ControllerPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
    		(new SceneManager()).register();
            (new MainManager()).register();
            
            //服务器返回command
            (new Processor_100_1()).register();
            (new HomePageCommand()).register();
            (new BetMoneyCommand()).register();
            (new BetInfoCommand()).register();
            (new GameResultCommand()).register();
            (new BetDetaileCommand()).register();
            (new BetRecordCommand()).register();
            (new PassWordCommand()).register();
            (new TodayBigWinnerCommand()).register();
            (new AgCommand()).register();
        }
	}
}