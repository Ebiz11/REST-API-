"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var secret_1 = __importDefault(require("../config/secret"));
var router = express_1.Router();
// middleware
router.use(function (req, res, next) {
    var jwt = require('jsonwebtoken');
    var token = req.headers['token'];
    if (!token) {
        res.send({ status: false, msg: 'no token provided.' });
        return;
    }
    jwt.verify(token, secret_1.default.secret, function (err, decoded) {
        if (err) {
            res.send({ status: false, msg: 'invalid token' });
            return;
        }
        if (decoded.level != 'master') {
            res.send({ status: false, msg: 'invalid token master' });
            return;
        }
        next();
    });
});
// 
// if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
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
