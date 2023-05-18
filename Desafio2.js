// DESAFIO 2 CORRESPONDIENTE A MANEJO DE DOCUMENTOS CON JAVASCRIPT

const { log } = require('console')
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
            console.log("No se encontraron productos en la ruta seleccionada");
        }
    }

    // getProductsById(id){
    //     let proIndex = this.products.findIndex((product)=> product.id===id)
    //     if (proIndex===-1) { return "No se encontró ningún producto con el id ingresado"
    //         } else { return this.products[proIndex]
    //     }
    // }

    // updateProduct (){

    // }
}

const producto1 = new ProductManager('./Productos.json')
// producto1.addProduct('titulo de ejemplo1', 'descripcion de ejemplo1', 98765421, 'sin imagen de ejemplo1', 567231, 6781)
producto1.getProducts()
