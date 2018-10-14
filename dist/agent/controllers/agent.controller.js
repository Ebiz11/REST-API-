"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agent_service_1 = __importDefault(require("../services/agent.service"));
var Buyer = /** @class */ (function () {
    function Buyer() {
        this.agentService = new agent_service_1.default();
    }
    Buyer.prototype.topup = function (req, data, callback) {
        var _this = this;
        var id_master = req.body.master;
        var insert = {
            user_request: data,
            user_confirm: id_master,
            value: req.body.jml_coin
        };
        this.agentService.cek_level(insert, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            if (i.results.length < 1) {
                callback({ status: false, msg: 'master not found!' });
                return;
            }
            _this.agentService.topup(insert, function (i) {
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
