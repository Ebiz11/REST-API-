import express, { Router, Request, Response  } from 'express';

// Routes
import { agentRoutes } from './agent/agent.routes';
import { masterRoutes } from './master/master.routes';
import { buyerRoutes } from './buyer/buyer.routes'; 
// 

// class
import Register  from './auth/controllers/register.controller';
import Login  from './auth/controllers/login.controller';
// 

import * as bodyParser from "body-parser";

const port = process.env.PORT || 4200;

class App {

    public app: express.Application;
    public register:any;
    public login:any;

    constructor () {
        this.app = express()
        this.register = new Register();
        this.login = new Login();
        this.mountRoutes()
    }

    private mountRoutes(): void {
        const router: Router = Router();

        router.use(bodyParser.urlencoded({ extended: false }));
        router.use(bodyParser.json());

        // middleware
        router.use(function(req, res, next) {
            console.log(req.method, req.url);
            next(); 
        });
        // 

        router.post('/register', (req: Request, res: Response) => {
            this.register.tambah(req, (i:any) => {
                res.send(i);
            })
        });

        router.post('/login', (req: Request, res: Response) => {
            this.login.signin(req, (i:any) => {
                res.send(i);
            })
        });

        // var token = req.headers['x-access-token'];
        // if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
            
        // jwt.verify(token, config.secret, function(err:any, decoded:any) {
        //     res.send({status: true, token: token, data: decoded});
        // });

        this.app.use('/agent', agentRoutes);
        this.app.use('/master', masterRoutes);
        this.app.use('/buyer', buyerRoutes);
        this.app.use('', router);

        this.app.use((req, res, next) => {
            if(res.status(404))
                res.send('page not found');
        });
            
    }
    
    public listen(port: any) : void {
        this.app.listen(port, (err: any) => {
            if (err) {
              return console.log(err)
            }
          
            return console.log(`server is listening on port ${port}`)
          })
    }
}

let app = new App();

app.listen(port);