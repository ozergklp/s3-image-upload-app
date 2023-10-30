import mongoose from 'mongoose';
import Item from '../models/itemModel';
import { Request, Response } from 'express';
import { getFileStream, uploadFile } from '../s3';

// get a single item
export const getItem = (req: Request, res: Response) => {
    const key = req.params.key;
    const readStream = getFileStream(key)

    readStream.pipe(res)

}

// create a new item
export const createItem = async (req: Request, res: Response) => {
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    console.log(result)
    const info = req.body.description
    console.log(info)
    res.send({imagePath: `/images/${result.Key}`})
}
