import express from "express"
import productRoutes from './src/routes/product.routes'
import clientRoutes from './src/routes/client.routes'
import employeeRoutes from './src/routes/employee.routes'
import brandRoutes from './src/routes/brand.routes'
//Criação da aplicação
const app = express();

//Configura a aplicação para receber JSON no body das req
app.use(express.json())

app.use('/product', productRoutes)
app.use('/client', clientRoutes)
app.use('/employee', employeeRoutes)
app.use('/brand', brandRoutes)

const port = 3000;

//Inicia aplicacação na porta 3000
app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});
