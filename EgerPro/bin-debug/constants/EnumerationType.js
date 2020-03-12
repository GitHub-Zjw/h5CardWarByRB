/**
 * 枚举类型定义
 */
var EnumerationType;
(function (EnumerationType) {
    /**
     * 卡片花色
     */
    var Color;
    (function (Color) {
        Color[Color["null"] = 0] = "null";
        Color[Color["fangKuai"] = 1] = "fangKuai";
        Color[Color["meiHua"] = 2] = "meiHua";
        Color[Color["hongTao"] = 3] = "hongTao";
        Color[Color["heiTao"] = 4] = "heiTao";
        Color[Color["boss"] = 5] = "boss";
    })(Color = EnumerationType.Color || (EnumerationType.Color = {}));
    /**
     * 牌形
     */
    var CardType;
    (function (CardType) {
        CardType[CardType["niuba"] = 0] = "niuba";
        CardType[CardType["niuer"] = 1] = "niuer";
        CardType[CardType["niujiu"] = 2] = "niujiu";
        CardType[CardType["niuniu"] = 3] = "niuniu";
        CardType[CardType["niusan"] = 4] = "niusan";
        CardType[CardType["niusi"] = 5] = "niusi";
        CardType[CardType["niuwu"] = 6] = "niuwu";
        CardType[CardType["niuyi"] = 7] = "niuyi";
        CardType[CardType["tonghuashun"] = 8] = "tonghuashun";
        CardType[CardType["wuhuaniu"] = 9] = "wuhuaniu";
        CardType[CardType["wuniu"] = 10] = "wuniu";
        CardType[CardType["wuxiaoniu"] = 11] = "wuxiaoniu";
        CardType[CardType["zhadanniu"] = 12] = "zhadanniu";
        CardType[CardType["niuqi"] = 13] = "niuqi";
        CardType[CardType["niuliu"] = 14] = "niuliu";
    })(CardType = EnumerationType.CardType || (EnumerationType.CardType = {}));
    /**
     * 胜利区域
     */
    var RegionWinner;
    (function (RegionWinner) {
        /**
         * 红方赢
         */
        RegionWinner[RegionWinner["red"] = 0] = "red";
        /**
         * 黑方赢
         */
        RegionWinner[RegionWinner["black"] = 1] = "black";
        /**
         * 红方赢 + 特殊牌型
         */
        RegionWinner[RegionWinner["redS"] = 2] = "redS";
        /**
         * 红方赢 + 特殊牌型
         */
        RegionWinner[RegionWinner["blackS"] = 3] = "blackS";
    })(RegionWinner = EnumerationType.RegionWinner || (EnumerationType.RegionWinner = {}));
})(EnumerationType || (EnumerationType = {}));
//# sourceMappingURL=EnumerationType.js.map