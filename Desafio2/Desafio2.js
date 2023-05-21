// DESAFIO 2 CORRESPONDIENTE A MANEJO DE DOCUMENTOS CON JAVASCRIPT

const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async addProduct(title, description, price, thumbnail, code, stock) {

        if (fs.existsSync(this.path)) {

            let Jproducts = await fs.promises.readFile(this.path, 'utf-8')
            let products = JSON.parse(Jproducts)

            let check = false
            products.forEach((product) => {
                if (product.code === code) {
                    check = true
                }
            })

            if (check) { return "El producto que desea ingresar ya se encuentra en el sistema" }
            else {
                let id = 0
                if (products.length === 0) { id = 1 }
                else { id = products[products.length - 1].id + 1 }

                let product = { id, title, description, price, thumbnail, code, stock }
                products.push(product)
                await fs.promises.writeFile(this.path, JSON.stringify(products))
                return "El producto ha sido agregado"
            }
        } else {
            let id = 1
            let product = [{ id, title, description, price, thumbnail, code, stock }]
            await fs.promises.writeFile(this.path, JSON.stringify(product))
            return "El producto ha sido agregado"
        }
    }

    async getProducts (){
        if (fs.existsSync(this.path)) {
            let Jproducts = await fs.promises.readFile(this.path,'utf-8')
            let products = JSON.parse(Jproducts)
            products.forEach((prod)=>{ console.log(prod);})
        } else {
            let products = []
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            setTimeout(()=>{
            let Jproducts = fs.readFile(this.path,'utf-8')
            let products = JSON.parse(Jproducts)
            products.forEach((prod)=>{ console.log(prod);})
            }, 2000)
            
        }
    }

    async getProductsById(id){
        if (fs.existsSync(this.path)) {
            let Jproducts = await fs.promises.readFile(this.path,'utf-8')
            let products = JSON.parse(Jproducts)

            let find = products.findIndex((prod)=> prod.id===id)

            find === -1? console.log("No se encontró ningún producto con el id ingresado") : console.log(products[find])

        } else {
            console.log("No se ha encontrado productos en la ruta seleccionada");
        }
    }

    async updateProduct (id, newInfo){
        if (fs.existsSync(this.path)) {
            let Jproducts = await fs.promises.readFile(this.path,'utf-8')
            let products = JSON.parse(Jproducts)
            let find = products.findIndex((prod)=> prod.id === id)
            
            if (find === -1) {
                console.log("No se encontró el producto correspondiente al id ingresado");
            } else {
                products[find] = {...products[find], ...newInfo}
                await fs.promises.writeFile(this.path,JSON.stringify(products))
            }

        } else {
            console.log("No se han encontrado productos en la ruta de archivo seleccionada");
        }
    }

    async deleteProduct (id){
        if (fs.existsSync(this.path)) {
            let Jproducts =  await fs.promises.readFile(this.path,'utf-8')
            let products = JSON.parse(Jproducts)
            let find = products.findIndex((prod)=> prod.id===id)
            find=== -1 ? console.log("No se han encontrado productos con el id ingresado") : products.splice(find,1)
            await fs.promises.writeFile(this.path, JSON.stringify(products))

        } else {
            console.log("Está intentando borrar productos en una ruta inexistente");
        }
    }
}

const producto1 = new ProductManager('./Productos.json')
// producto1.addProduct('titulo de ejemplo3', 'descripcion de ejemplo3', 98765423, 'sin imagen de ejemplo3', 567233, 6783)
producto1.getProducts()
// producto1.getProductsById(1)
// producto1.updateProduct(1,{description:"Descripcion actualizada"})
// producto1.deleteProduct(3)