import { Router, Request, Response } from 'express';


const router: Router = Router();

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