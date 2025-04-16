import { IProduct, IProductListFilters } from "../../IProduct";
const products : IProduct[] = [
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


export const listProducts = (productFilters : IProductListFilters) : IProduct[] => {
    //Usando alias com name : nameFilter
    const {
        name: nameFilter,
        brand: brandFilter,
        supplier: supplierFilter,
        stockId: stockIdFilter } = productFilters

    //Fazendo a filtragem com todos os filtros existentes (ao mesmo tempo, para evitar sobrescrita entre os filtros)
    const foundProducts = products.filter(({ name, brand, supplier, stockId }) => {
        let found : boolean = true
        if (!(nameFilter || brandFilter || supplierFilter || stockIdFilter)) 
            return true;
        if (nameFilter && !name.toUpperCase().includes(nameFilter?.toUpperCase())) 
            found = false;
        if (brandFilter && !brand.toUpperCase().includes(brandFilter?.toUpperCase())) 
            found = false;
        if (supplierFilter && !supplier.toUpperCase().includes(supplierFilter?.toUpperCase())) 
            found = false;
        if (stockIdFilter && stockId !== stockIdFilter) 
            found = false;
        return found;
    })

    return foundProducts
}

