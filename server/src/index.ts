import express, {Express, NextFunction, Request, Response} from 'express'
import multer from 'multer'
import cors from 'cors'
import { getFileStream, uploadFile } from './s3';
import { itemRouter } from './routes/itemRoute';



const app: Express = express();

app.use(cors());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    next()
})

app.use('/api/images', itemRouter)


app.listen(4000, () => {
    console.log('listening port 4000')
})