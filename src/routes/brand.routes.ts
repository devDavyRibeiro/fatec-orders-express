import express from 'express'
import { Request, Response } from "express";
import { listAll,create } from '../controllers/brand.controller';
//Utilizamos para implementar as rotas de produto
const router = express.Router()

router.get('/', async (req:Request,res:Response)=>{
    const brand = await listAll();
    res.json(brand);
})
router.post('/',  async (req:Request, res:Response)=>{
    const {description} = req.body
    const brand = await create(description);
    res.status(201).json(brand);

})

export default router;