import { Router, Request, Response } from 'express';


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('buyer routes');
    res.send('buyer routes');
    
});

export const buyerRoutes: Router = router;