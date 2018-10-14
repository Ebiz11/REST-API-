import { Router, Request, Response } from 'express';


const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    console.log('agent routes');
    
    res.send('agent routes');
});

export const agentRoutes: Router = router;