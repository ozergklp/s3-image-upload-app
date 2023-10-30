import express, { Router, Request, Response } from 'express';
import { createItem, getItem } from '../controllers/itemController';
import multer from 'multer';
const upload = multer({dest: 'uploads/'})

export const itemRouter: Router = express.Router();

itemRouter.post('/', upload.single('image'),createItem);

itemRouter.get('/:key', getItem);
