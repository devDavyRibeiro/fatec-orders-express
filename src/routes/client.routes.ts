import express, { Router } from 'express'
import { Request, Response } from "express";
//Utilizamos para implementar as rotas de produto
const router = express.Router();

const clients = [
    {
        id: 1,
        name: 'José Alberto',
        document: '1234',
        zipCode: '123',
        phone: '123',
        email: 'a@gmail.com'
    },
    {
        id: 2,
        name: 'Ruarez Francisco',
        document: '123',
        zipCode: '123',
        phone: '123',
        email: 'a@gmail.com'
    },
]

//Define método Get que responde no path /client/:id (para exibir o produto específico)
router.get("/:id", (req: Request, res: Response) => {
    const client = clients.find((client) => {
        return client.id === Number(req.params.id)
    })
    if (!client) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um cliente com esse ID"
        });
        return;
    }
    res.status(200).json(client);
});

//Define método Get que responde no path /client (para exibir todos os produtos)
router.get("/", (req: Request, res: Response) => {
    let filteredClient: any = [];

    if (Object.keys(req.query).length === 0) {
        res.status(200).json(clients);
        return;
    }

    const { name, document } = req.query

    filteredClient = clients.filter((client) => {
        let isValid: boolean = true;
        if (typeof (name) == "string") {
            const nameFilter = name.trim().toLowerCase();
            isValid = isValid && client.name.trim().toLowerCase().includes(nameFilter);
        }
        if (typeof (document) == "string") {
            const documentFilter = document.trim().toLowerCase();
            isValid = isValid && client.document.trim().toLowerCase().includes(documentFilter);
        }
        return isValid;
    })

    if (filteredClient.length === 0) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar nenhum produto com o filtro",
        })
        return;
    }

    res.status(200).json(filteredClient)
});

router.post("/", (req: Request, res: Response) => {
    const newClient = req.body;
    const clintExists = clients.find((client) => client.id === Number(newClient.id))

    if (clintExists) {
        res.status(409).json({
            "error": true,
            "message": "Já existe um cliente com o ID "
        })
        return
    }
    clients.push(newClient);
    res.status(201).json({ "message": "Cliente Cadastrado com sucesso" })
});

router.delete("/:id", (req: Request, res: Response) => {
    const clientId = Number(req.params.id);

    const index = clients.findIndex((client) => client.id === clientId)

    if (index === -1) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um cliente com esse ID"
        });
        return;
    }

    const removedClient = clients.splice(index, 1)
    res.status(200).json({
        "message": "Cliente removido com sucesso",
        "client": removedClient
    });
});

router.put("/:id", (req: Request, res: Response) => {
    const clientId = Number(req.params.id);

    const index = clients.findIndex((client) => client.id === clientId)

    //Caso não encontre um cliente (retorna -1 por padrão da função)
    if (index === -1) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um cliente com esse ID"
        });
        return;
    }

    const { name, document, zipCode, phone, email } = req.body
    const updatedClient = { name, document, zipCode, phone, email };
    clients[index] = {
        id: clientId,
        ...updatedClient
    }
    res.status(200).json({
        "message": "Cliente atualizado com sucesso",
        "client": clients[index]
    });
});

export default router