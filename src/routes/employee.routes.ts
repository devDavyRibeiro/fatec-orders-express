import express from 'express'
import {Request, Response} from 'express'

const router = express.Router();

const employees = [
    {
        id: 1,
        name: 'Ricardo Sênior',
        document: '123',
        position: 'Gerente',
        workingHours: 8,
        salary: 12.00,
        zipCode: '123'
    },
    {
        id: 2,
        name: 'Ricardo Junior',
        document: '122',
        position: 'Estagiário',
        workingHours: 40,
        salary: 1.00,
        zipCode: '321'
    },
]

//Define método Get que responde no path /employee/:id (para exibir o produto específico)
router.get("/:id", (req: Request, res: Response) => {
    const employee = employees.find((employee) => {
        return employee.id === Number(req.params.id)
    })
    if (!employee) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um funcionário com esse ID"
        });
        return;
    }
    res.status(200).json(employee);
});

//Define método Get que responde no path /employee (para exibir todos os produtos)
router.get("/", (req: Request, res: Response) => {
    let filteredEmployee: any = [];

    //Retorna o array inteiro caso nenhum query param seja passado
    if (Object.keys(req.query).length === 0) {
        res.status(200).json(employees);
        return;
    }

    const { name, position, workingHours } = req.query

    filteredEmployee = employees.filter((employee) => {
        let isValid: boolean = true;
        if (typeof (name) == "string") {
            const nameFilter = name.trim().toLowerCase();
            isValid = isValid && employee.name.trim().toLowerCase().includes(nameFilter);
        }
        if (typeof (position) == "string") {
            const positionFilter = position.trim().toLowerCase();
            isValid = isValid && employee.position.trim().toLowerCase().includes(positionFilter);
        }
        if (typeof (workingHours) == "string") {
            const workingHoursFilter = Number(workingHours);
            isValid = isValid && employee.workingHours == workingHoursFilter;
        }
        return isValid;
    })

    if (filteredEmployee.length === 0) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar nenhum produto com o filtro",
        })
        return;
    }

    res.status(200).json(filteredEmployee)
});

router.post("/", (req: Request, res: Response) => {
    const newEmployee = req.body;
    const employeeExists = employees.find((employee) => employee.id === Number(newEmployee.id))
    if (employeeExists) {
        res.status(409).json({
            "error": true,
            "message": "Já existe um funcionário com o ID"
        })
        return;
    }
    employees.push(newEmployee);
    res.status(201).json({ "message": "Funcionário Cadastrado com sucesso" })
});

router.delete("/:id", (req: Request, res: Response) => {
    const employeeId = Number(req.params.id);

    const index = employees.findIndex((employee) => employee.id === employeeId)

    if (index === -1) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um funcionário com esse ID"
        });
        return;
    }

    const removedEmployee = employees.splice(index, 1)
    res.status(200).json({
        "message": "Funcionário removido com sucesso",
        "employee": removedEmployee
    });
});

router.put("/:id", (req: Request, res: Response) => {
    const employeeId = Number(req.params.id);

    const index = employees.findIndex((employee) => employee.id === employeeId)

    //Caso não encontre um funcionário (retorna -1 por padrão da função)
    if (index === -1) {
        res.status(404).json({
            "error": true,
            "message": "Não foi possível encontrar um funcionário com esse ID"
        });
        return;
    }

    const { name, document, position, workingHours, salary, zipCode } = req.body
    const updatedEmployee = { name, document, position, workingHours, salary, zipCode };
    employees[index] = {
        id: employeeId,
        ...updatedEmployee
    }
    res.status(200).json({
        "message": "Funcionário atualizado com sucesso",
        "employee": employees[index]
    });
});

export default router