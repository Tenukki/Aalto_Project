import {
    Router, Request, Response, NextFunction,
} from 'express';

const IndexRouter = Router();

IndexRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send("hello!!!!!");
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

export default IndexRouter;
