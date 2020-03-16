var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var core;
(function (core) {
    /**
     * 声音控制
     */
    var SoundUtils = (function () {
        function SoundUtils() {
            this.m_BGMVolume = 1;
            this.m_effectVolume = 1;
            /**
             * 音效开关
             */
            this.m_effectEnable = true;
            /**
             * 音乐开关
             */
            this.m_musicEnable = false;
            this.m_sounds = new Dictionary();
            this.m_loadings = new Dictionary();
            this.m_channels = new Dictionary();
            this.m_curBGM = new Dictionary();
            this.m_curEffect = new Dictionary();
            this.m_callbacks = new Dictionary();
            this.m_playChannel = new Dictionary();
            var value = egret.localStorage.getItem('soundEffect');
            if (value) {
                this.m_effectVolume = parseInt(value);
            }
            value = egret.localStorage.getItem('soundBGM');
            if (value) {
                this.m_BGMVolume = parseInt(value);
            }
        }
        SoundUtils.getInstance = function () {
            if (SoundUtils.s_instance == null) {
                SoundUtils.s_instance = new SoundUtils();
            }
            return SoundUtils.s_instance;
        };
        /**
         * 音乐播放完成
         * @param  {egret.Event} event
         */
        SoundUtils.prototype.onPlayComplete = function (event) {
            var channel = event.currentTarget;
            var callback = this.m_callbacks.get(channel.hashCode);
            if (callback) {
                callback();
            }
            channel['count']++;
            if (channel['count'] >= channel['maxCount']) {
                this.stop(channel['owner']);
            }
        };
        /**
         * 停止音乐通道播放
         * @param  {number} coverChannel
         */
        SoundUtils.prototype.stopSound = function (coverChannel) {
            var sound = this.m_playChannel.get(coverChannel);
            if (sound) {
                this.stop(sound);
            }
        };
        /**
         * 停止播放音乐
         * @param  {egret.Sound} sound
         */
        SoundUtils.prototype.stop = function (sound) {
            var _this = this;
            var channel = this.m_channels.get(sound.hashCode);
            if (channel) {
                egret.setTimeout(function () {
                    if (channel) {
                        channel.stop();
                        if (channel.hasEventListener(egret.Event.SOUND_COMPLETE)) {
                            channel.removeEventListener(egret.Event.SOUND_COMPLETE, _this.onPlayComplete, _this);
                        }
                        _this.m_callbacks.remove(channel.hashCode);
                        _this.m_channels.remove(sound.hashCode);
                    }
                }, this, 500);
            }
            this.m_playChannel.remove(sound['cover']);
            if (sound.type == egret.Sound.EFFECT) {
                this.m_curEffect.remove(this.m_sounds.getKeyByValue(sound));
            }
            else {
                this.m_curBGM.remove(this.m_sounds.getKeyByValue(sound));
            }
        };
        /**
         * 停止所有音乐
         */
        SoundUtils.prototype.stopAllMusic = function () {
            var sounds = this.m_curBGM.values;
            for (var i = 0, iLen = sounds.length; i < iLen; i++) {
                var sound = sounds[i];
                if (sound) {
                    this.stop(sound);
                }
            }
        };
        /**
         * 停止所有音效
         */
        SoundUtils.prototype.stopAllEffect = function () {
            var sounds = this.m_curEffect.values;
            for (var i = 0, iLen = sounds.length; i < iLen; i++) {
                var sound = sounds[i];
                if (sound) {
                    this.stop(sound);
                }
            }
        };
        /**
         * 播放音乐或音效
         * @param  {number} id  声音配置ID
         * @param  {number=1} loop 播放次数，默认值是 1，循环播放。 大于 0 为播放次数，如 1 为播放 1 次；小于等于 0，为循环播放。
         * @param  {()=>void} onPlayComplete?   播放完毕回调
         */
        SoundUtils.prototype.playSound = function (id, loop, onPlayComplete) {
            if (loop === void 0) { loop = 1; }
            var config = core.Config.getConfig(SoundConfig).get(id);
            if (config) {
                if (this.isSoundPlaying(id) && config.soundType == 1) {
                    return;
                }
                this.stopSound(config.coverKey);
            }
            else {
                egret.warn("ID\u4E3A" + id + "\u7684\u97F3\u6548\u5728SoundConfig\u4E2D\u4E0D\u5B58\u5728");
                return;
            }
            if ((config.soundType == 0 && !this.m_effectEnable) ||
                (config.soundType != 0 && !this.m_musicEnable)) {
                return;
            }
            var sound = this.m_sounds.get(id);
            if (!sound) {
                sound = RES.getRes(config.soundName);
                if (sound) {
                    sound.type = config.soundType == 0 ? egret.Sound.EFFECT : egret.Sound.MUSIC;
                    this.m_sounds.add(id, sound);
                }
                else {
                    var data = {
                        config: config,
                        loop: loop,
                        callback: onPlayComplete
                    };
                    if (config.soundType != 0) {
                        this.m_loadings.add(id, data);
                    }
                    RES.getResAsync(config.soundName, function () {
                        return function (value, key) {
                            egret.log("\u540D\u79F0\u4E3A" + config.soundName + "\u7684\u97F3\u6548\u8D44\u6E90\u52A0\u8F7D\u5B8C\u6210");
                            if (this.m_loadings.remove(id)) {
                                this.playSound(id, loop, onPlayComplete);
                            }
                        };
                    }(), this);
                }
            }
            if (sound) {
                if (sound.type == egret.Sound.EFFECT) {
                    this.m_curEffect.add(id, sound);
                }
                else {
                    this.m_curBGM.add(id, sound);
                }
                this.m_playChannel.add(config.coverKey, sound);
                sound['cover'] = config.coverKey;
                var channel = sound.play(0, loop);
                if (channel) {
                    channel['owner'] = sound;
                    channel['maxCount'] = loop > 0 ? loop : Number.MAX_VALUE;
                    channel['count'] = 0;
                    if (sound.type == egret.Sound.EFFECT) {
                        channel.volume = this.m_effectVolume;
                    }
                    else {
                        channel.volume = this.m_BGMVolume;
                    }
                    if (onPlayComplete) {
                        this.m_callbacks.add(channel.hashCode, onPlayComplete);
                    }
                    channel.addEventListener(egret.Event.SOUND_COMPLETE, this.onPlayComplete, this);
                    this.m_channels.add(sound.hashCode, channel);
                }
            }
            else {
                egret.warn("\u540D\u79F0\u4E3A" + config.soundName + "\u7684\u97F3\u6548\u8D44\u6E90\u4E0D\u5B58\u5728");
                return;
            }
        };
        /**
         * 停止播放音乐
         * @param id 声音ID
         */
        SoundUtils.prototype.stopSoundByID = function (id) {
            var sound = this.m_sounds.get(id);
            if (sound) {
                this.stop(sound);
                this.m_loadings.remove(id);
            }
        };
        /**
         * 停止播放所有音乐及音效
         */
        SoundUtils.prototype.stopAllSound = function () {
            //停止所有音效
            this.stopAllEffect();
            //停止所有音乐
            this.stopAllMusic();
            if (this.m_loadings) {
                this.m_loadings.clear();
            }
        };
        /**
         * 设置背景音乐音量
         * @param  {number} volume
         */
        SoundUtils.prototype.setBGMValume = function (volume) {
            egret.localStorage.setItem('soundBGM', volume.toString());
            this.m_BGMVolume = volume;
            var sounds = this.m_curBGM.values;
            for (var i = 0, iLen = sounds.length; i < iLen; i++) {
                var sound = sounds[i];
                if (sound) {
                    var channel = this.m_channels.get(sound.hashCode);
                    if (channel) {
                        channel.volume = this.m_musicEnable ? volume : 0;
                    }
                }
            }
        };
        /**
         * 得到背景音乐音量
         * @returns number
         */
        SoundUtils.prototype.getBGMValue = function () {
            return this.m_BGMVolume;
        };
        /**
         * 设置音效音量
         * @param  {number} volume
         */
        SoundUtils.prototype.setEffectValume = function (volume) {
            egret.localStorage.setItem('soundEffect', volume.toString());
            this.m_effectVolume = volume;
            var sounds = this.m_curEffect.values;
            for (var i = 0, iLen = sounds.length; i < iLen; i++) {
                var sound = sounds[i];
                if (sound) {
                    var channel = this.m_channels.get(sound.hashCode);
                    if (channel) {
                        channel.volume = this.m_effectEnable ? volume : 0;
                    }
                }
            }
        };
        /**
         * 得到音效音量
         * @returns number
         */
        SoundUtils.prototype.getEffectValue = function () {
            return this.m_effectVolume;
        };
        /**
         * 开关音效
         * @param  {boolean} bool
         */
        SoundUtils.prototype.setEffectEnable = function (bool) {
            this.m_effectEnable = bool;
            this.setEffectValume(this.m_effectVolume);
        };
        /**
         * 开关音乐
         * @param  {boolean} bool
         */
        SoundUtils.prototype.setMusicEnable = function (bool) {
            this.m_musicEnable = bool;
            this.setBGMValume(this.m_BGMVolume);
        };
        /**
         * 检测ID是否播放
         * @param  {number} id
         */
        SoundUtils.prototype.isSoundPlaying = function (id) {
            var sound = this.m_sounds.get(id);
            if (sound) {
                var channel = this.m_channels.get(sound.hashCode);
                if (channel) {
                    return true;
                }
            }
            return false;
        };
        return SoundUtils;
    }());
    core.SoundUtils = SoundUtils;
    __reflect(SoundUtils.prototype, "core.SoundUtils");
})(core || (core = {}));
//# sourceMappingURL=SoundUtils.js.map