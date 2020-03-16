  /**
    * 注册mediator
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    */
module game {

	export class ViewPrepCommand extends puremvc.SimpleCommand implements puremvc.ICommand{
           
		public constructor(){
			super();
		}
		public execute(notification:puremvc.INotification):void{
			var main = GameLayerManager.gameLayer().panelLayer;

            this.facade.registerMediator(new StopBetMediator());
            this.facade.registerMediator(new betDetails.BetDetailsMediator());
            this.facade.registerMediator(new gameMethod.GameMethodMediator());
            this.facade.registerMediator(new bigWinner.BigWinnerMediator());
            this.facade.registerMediator(new passWord.PassWordMediator());                        
		}
	}
}