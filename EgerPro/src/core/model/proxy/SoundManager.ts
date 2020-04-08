module SoundManager
{
	export class SoundManager
	{
		/**是否可以播放背景音乐 */
		public IsShowBgSound: boolean;
		/**是否可以播放音效 */
		public IsShowESound: boolean;
		public constructor()
		{
			this.IsShowBgSound = true;
			this.IsShowESound = true;
		}

		/**
		 * 播放测试音效
		 */
		public playTestSound(): void
		{
			let span = document.getElementById("bgSound");
			span.innerHTML = "</br></br></br><audio id='bgTest' loop='loop' controls='controls'><source src='http://download.harmonydag.com/sound/tzxz.mp3' type='audio/mp3' />Your browser does not support this audio format.</audio>";
			let audio: any = document.getElementById("bgTest");
			audio.play();
		}

		public stopSound(): void
		{
			let span = document.getElementById("bgSound");
			span.innerHTML = "";
		}

		public playBgSound(name: string): void
		{
			if (!this.IsShowBgSound)
			{
				return;
			}
			let span = document.getElementById("bgSound");
			span.innerHTML = "<audio id='backGroundSound' loop='loop' hidden='true' controls='controls' autoplay='autoplay'><source src='http://download.harmonydag.com/sound/" + name + "' type='audio/mp3' />Your browser does not support this audio format.</audio>"
			let audio : any= document.getElementById("backGroundSound");
			audio.play();
		}

		public stopBgSound(name: string): void
		{
			let span = document.getElementById("bgSound");
			span.innerHTML = "";
		}
	}

	export function addMicroserviceConfPage()
	{
		//新建的时候不需要查之前的配置名字
		//rememberName='';
		// var spanId = "span_" + Math.floor(Math.random() * 100000000);
		// var inputId = "input_" + Math.floor(Math.random() * 100000000);
		// var addTab = "<button  style='margin-left:10px;margin-bottom:10px;' class='btn btn-default btn-style indexBtn checked'>" +
		// 	"<span  id=" + spanId + "></span>" +
		// 	"<input id=" + inputId + " value='请为当前配置文件命名'  style='border:none;width: 153px;color: black;'  onchange='changeConfNames(this);' /></button>";
		// $("#buttonDivTab").append(addTab);
	}


	export function raw(a: TemplateStringsArray, ...values: any[]): string
	{

		var len = a.length - 1;

		var outstr = a[0];

		for (var i = 0; i < len; i++)
		{

			outstr += values[i] + a[i + 1];

		}

		return outstr;

	}

	export function html(a: TemplateStringsArray, ...values: any[]): HTMLDivElement
	{

		var div = document.createElement("div");

		div.innerHTML = raw(a, values);

		return div;

	}
}