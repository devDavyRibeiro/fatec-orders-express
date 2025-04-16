import express from 'express'
import { Request, Response } from "express";
import { IProductListFilters } from '../../IProduct';
import { listProducts } from '../controllers/product.controller'
//Utilizamos para implementar as rotas de produto
const router = express.Router()

const products = [
    {
        id: 1,
        name: 'Feijão Carioca',
        brand: 'Broto Legal',
        barCode: '93298432984942',
        supplier: 'Rede de Distribuição Ltda',
        stockId: 98,
        price: 100.99,
        weight: 1,
        measureUnit: 'kg'
    },
    {
        id: 2,
        name: 'Arroz',
        brand: 'Tio João',
        barCode: '34324324242',
        supplier: 'Rede de Distribuição Ltda',
        stockId: 65,
        price: 100.99,
        weight: 500.25,
        measureUnit: 'kg'
    },
]

//Define método Get que responde no path /product/:id (para exibir o produto específico)
router.get("/:id", (req: Request, res: Response) => {
    const product = products.find((product) => {
        return product.id === Number(req.params.id)
    })
    if (!product) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um produto com esse ID"
        });
        return;
    }
    res.status(200).json(product);
});

//Define método Get que responde no path /product (para exibir todos os produtos)
router.get("/", (req: Request, res: Response) => {

    const productFilters = req.query as unknown as IProductListFilters
    
    const products =  listProducts(productFilters)

    //Caso nenhum produto seja encontrado com os filtros passados, retorna 404
    if (products.length === 0) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar nenhum produto com o filtro"
        })
        return;
    }
    
    //Retorna o array filtrado
    res.status(200).json(products)
});

//Define método Post que responde no path /product/ (para inserir o produto no body)
router.post("/", (req: Request, res: Response) => {
    const newProduct = req.body;
    //Verificando se no array há um produto com o id igual ao do novo produto
    const existProduct = products.find((product) => product.id === Number(newProduct.id));
    if (existProduct) {
        res.status(409).json({
            "error": true,
            "message": "Um produto cadastrado com o ID já existe"
        })
        return
    }
    products.push(newProduct);
    res.status(201).json({
        "message": "Cadastrado com sucesso",
        "product": newProduct
    })
});

//Define método Delete que responde no path /product/:id (para excluir o produto com id especificado)
router.delete("/:id", (req: Request, res: Response) => {
    const productId = Number(req.params.id);

    const index = products.findIndex((product) => product.id === productId)

    if (index === -1) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um produto com esse ID"
        });
        return;
    }

    const removedProduct = products.splice(index, 1)
    res.status(200).json({
        "message": "Produto excluído com sucesso",
        "product": removedProduct
    });
});

//Define método Put que responde no path /product/:id (para editar o produto com id especificado)
router.put("/:id", (req: Request, res: Response) => {
    const productId = Number(req.params.id);

    const index = products.findIndex((product) => product.id === productId)

    //Caso não encontre um produto (retorna -1 por padrão da função)
    if (index === -1) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um produto com esse ID"
        });
        return;
    }

    const {name, brand, barCode, supplier, stockId, price, weight, measureUnit} = req.body;
    const updatedProduct = {name, brand, barCode, supplier, stockId, price, weight, measureUnit}
    products[index] = {
        id: productId,
        ...updatedProduct
    }
    res.status(200).json({
        "message": "Produto atualizado com sucesso",
        "product": products[index]
    });
});

export default router