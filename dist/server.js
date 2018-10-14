"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
// Routes
var agent_routes_1 = require("./agent/agent.routes");
var master_routes_1 = require("./master/master.routes");
var buyer_routes_1 = require("./buyer/buyer.routes");
// 
// class
var register_controller_1 = __importDefault(require("./auth/controllers/register.controller"));
var login_controller_1 = __importDefault(require("./auth/controllers/login.controller"));
// 
var bodyParser = __importStar(require("body-parser"));
var port = process.env.PORT || 4200;
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.register = new register_controller_1.default();
        this.login = new login_controller_1.default();
        this.mountRoutes();
    }
    App.prototype.mountRoutes = function () {
        var _this = this;
        var router = express_1.Router();
        router.use(bodyParser.urlencoded({ extended: false }));
        router.use(bodyParser.json());
        // middleware
        router.use(function (req, res, next) {
            console.log(req.method, req.url);
            next();
        });
        // 
        router.post('/register', function (req, res) {
            _this.register.tambah(req, function (i) {
                res.send(i);
            });
        });
        router.post('/login', function (req, res) {
            _this.login.signin(req, function (i) {
                res.send(i);
            });
        });
        // var token = req.headers['x-access-token'];
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        // jwt.verify(token, config.secret, function(err:any, decoded:any) {
        //     res.send({status: true, token: token, data: decoded});
        // });
        this.app.use('/agent', agent_routes_1.agentRoutes);
        this.app.use('/master', master_routes_1.masterRoutes);
        this.app.use('/buyer', buyer_routes_1.buyerRoutes);
        this.app.use('', router);
        this.app.use(function (req, res, next) {
            if (res.status(404))
                res.send('page not found');
        });
    };
    App.prototype.listen = function (port) {
        this.app.listen(port, function (err) {
            if (err) {
                return console.log(err);
            }
            return console.log("server is listening on port " + port);
        });
    };
    return App;
}());
var app = new App();
app.listen(port);
