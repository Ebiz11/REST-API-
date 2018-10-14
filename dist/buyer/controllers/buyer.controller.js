"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var buyer_service_1 = __importDefault(require("../services/buyer.service"));
var Buyer = /** @class */ (function () {
    function Buyer() {
        this.buyerService = new buyer_service_1.default();
    }
    Buyer.prototype.buy_coin = function (req, data, callback) {
        var _this = this;
        var id_agent = req.body.agent;
        var insert = {
            user_request: data,
            user_confirm: id_agent,
            value: req.body.jml_coin
        };
        this.buyerService.cek_level(insert, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            if (i.results.length < 1) {
                callback({ status: false, msg: 'agent not found!' });
                return;
            }
            _this.buyerService.buy(insert, function (i) {
                if (!i.status) {
                    callback(i);
                    return;
                }
                callback({ status: true, msg: 'topup successfully!' });
            });
        });
    };
    return Buyer;
}());
exports.default = Buyer;
