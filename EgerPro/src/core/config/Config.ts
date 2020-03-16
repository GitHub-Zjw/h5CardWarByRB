module core {
    export class Config {

        private static s_configs: Object;

        constructor() {
        }
        /**
         * 初始化
         */
        public static init(bin: any): void {
            Config.s_configs = {};
            if (bin) {
                let zip: JSZip = new JSZip(bin);
                let files: any = zip.files;
                for (let fileName in files) {
                    let file: any = files[fileName];
                    if (file) {
                        let data: any = JSON.parse(file.asText());
                        let name: string = data.name;
                        let classRef = egret.getDefinitionByName(name);
                        if (!classRef) {
                            egret.log(`${name}在ConfigDef文件中未定义`);
                            break;
                        }
                        let dic: Dictionary<any> = new Dictionary<any>();
                        Config.s_configs[name] = dic;
                        let values: any[] = data.data;
                        if (values) {
                            for (let i: number = 0, iLen: number = values.length; i < iLen; i++) {
                                let value: any = values[i];
                                dic.add(value[data.key], value);
                            }
                        }
                    }
                }
            }
        }

        /**
         * 获取配置文件
         * 示例：let configs:Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
         * let configs:Dictionary<HeadConfig> = Config.getConfig(HeadConfig);
         * configs.get('1').emojiID;
         */
        public static getConfig<T>(className: { new (): T; }): Dictionary<T> {
            let name: string = egret.getQualifiedClassName(className);
            return Config.s_configs[name];
        }
    }
}