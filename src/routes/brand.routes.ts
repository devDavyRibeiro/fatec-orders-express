import express from 'express'
import { Request, Response, NextFunction } from "express";
import { listAll,create } from '../controllers/brand.controller';
//Utilizamos para implementar as rotas de produto
const router = express.Router()

const logger = (req: Request, res: Response, next:NextFunction) => {
    console.log('Logged');
}
const createBrandMiddware = (req: Request, res: Response, next:NextFunction) =>{
    console.log(`Descrição: ${req.body.description}`)
}
router.use(logger); //todas as rotas terão o middleware logger implementado

router.get('/', async (req:Request,res:Response)=>{
    const brand = await listAll();
    res.json(brand);
})
router.post('/', createBrandMiddware , async (req:Request , res:Response)=>{
    const {description} = req.body
    const brand = await create(description);
    res.status(201).json(brand);

})

export default router;