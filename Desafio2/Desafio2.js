const { log } = require('console')

const fs = require('fs').promises

class Contenedor {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo
    }

    async getAllProducts() {
        try {
            const rawProducts = await fs.readFile(this.rutaArchivo, 'utf-8')
            return rawProducts ? JSON.parse(rawProducts) : []
        } catch (error) {
            return []
        }
    }

    async saveProducts(array) {
        try {
            await fs.writeFile(this.rutaArchivo, JSON.stringify(array))
        } catch (error) {
            console.log(`Hubo un error al guardar archivos: ${error}`);
        }
    }

    async save(title, price, thumbnail) {
        try {
            let products = await this.getAllProducts()
            let lastID = products.length > 0 ? products[products.length - 1].id : 0
            let newID = lastID + 1
            let newObject = { title: title, price: price, thumbnail: thumbnail, id: newID }
            products.push(newObject)
            await this.saveProducts(products)
        } catch (error) {
            console.log(`error al guardar los productos: ${error}`);
        }
        finally { console.log("Producto agregado con exito"); }
    }

    async getById(id) {
        let products = await this.getAllProducts()
        console.log(products.find((o) => o.id === id) || null);
    }

    async getAll() {
        let products = await this.getAllProducts()
        console.log(products);
    }

    async deleteById(id) {
        try {
            let products = await this.getAllProducts()
            let newProducts = products.filter((o) => o.id !== id)
            await this.saveProducts(newProducts)
        } catch (error) {
            console.log(`Error al eliminar: ${error}`);
        }
        finally { console.log("Producto eliminado"); }

    }

    async deleteAll() {
        try {
            let emptyArray = []
            await this.saveProducts(emptyArray)
        } catch (error) {
            console.log(`Error al eliminar todo: ${error}`);
        }
        finally { console.log("Todos los productos han sido eliminados"); }
    }


}

// PRUEBA DE AGREGAR PRODUCTOS:

let usuario1 = new Contenedor('Primerarchivo.json')
usuario1.save("titulo producto", 234, "imagen no disponible")
setTimeout(() => {
    usuario1.save("titulo producto2", 444, "imagen no disponible2")
}, 2000);
setTimeout(() => {
    usuario1.save("titulo producto3", 888, "imagen no disponible3")
}, 3000);

// --------------------------------------------------------------------------------

// PRUEBA GET BY ID

setTimeout(() => {
    usuario1.getById(5)
}, 5000);
setTimeout(() => {
    usuario1.getById(2)
}, 6000);

// --------------------------------------------------

// PRUEBA GET ALL
setTimeout(() => {
    usuario1.getAll()
}, 7000);

// --------------------------------------------------

//PRUEBA DELETE BY ID
setTimeout(() => {
    usuario1.deleteById(2)
}, 8000);

// ---------------------------------------------------

// PRUEBA DELETE ALL
setTimeout(() => {
    usuario1.deleteAll()
}, 9000);