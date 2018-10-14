"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    console.log('master agent routes');
    res.send('master routes');
});
router.get('/list-topup', function (req, res) {
    res.send('list topup');
});
router.get('/confirm-topup', function (req, res) {
    res.send('confirm topup');
});
exports.masterRoutes = router;
