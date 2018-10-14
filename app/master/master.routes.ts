import { Router, Request, Response } from 'express';
import config from '../config/secret'; 

const router: Router = Router();

// middleware
router.use(function(req, res, next) {
    const jwt = require('jsonwebtoken');

    var token = req.headers['token'];

    if(!token){
        res.send({status: false, msg: 'no token provided.'});
        return;
    }

    jwt.verify(token, config.secret, function(err:any, decoded:any) {

        if(err){
            res.send({status: false, msg: 'invalid token'});
            return;
        }

        if(decoded.level != 'master'){
            res.send({status: false, msg: 'invalid token master'});
            return;
        }

        next();
        
    });        
        
});
// 


// if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    


router.get('/', (req: Request, res: Response) => {
    console.log('master agent routes');
    res.send('master routes');
    
});

router.get('/list-topup', (req: Request, res: Response) => {
    res.send('list topup');
});

router.get('/confirm-topup', (req: Request, res: Response) => {
    res.send('confirm topup');
});

export const masterRoutes: Router = router;