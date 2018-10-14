"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var master_service_1 = __importDefault(require("../services/master.service"));
var Master = /** @class */ (function () {
    function Master() {
        this.masterService = new master_service_1.default();
    }
    Master.prototype.list_topup = function (data, callback) {
        this.masterService.list_topup(data, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            callback({ status: true, data: i.results });
        });
    };
    Master.prototype.confirm_topup = function (req, data, callback) {
        var update = {
            user_id: data,
            topup_id: req.body.topup_id,
            status: req.body.status
        };
        this.masterService.confirm_topup(update, function (i) {
            if (!i.status) {
                callback(i);
                return;
            }
            callback({ status: true, msg: 'topup successfully!' });
        });
    };
    return Master;
}());
exports.default = Master;
