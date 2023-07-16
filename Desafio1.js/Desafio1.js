//DESAFIO 1 PRODUCTMANAGER

class ProductManager {
    constructor(){
        this.products = []
        this.id = 0
    }

    getProducts(){
        console.log(this.products)
    }

    addProduct(producto){
        if (producto.title!=null && producto.description!=null && producto.price!=null && producto.thumbnail!=null && producto.code!=null && producto.stock!=null) {
            if (this.products.some((el)=>el.code===producto.code)) {
                console.log("El producto ya existe en la base de datos");
            } else {
                let nuevoProducto = {...producto, id: this.id++}
                this.products.push(nuevoProducto)
            }
        } else {
            console.log("Todos los campos son obligatorios de llenar");
        }
        
    }

    getProductsById (id){
        if (this.products.some((el)=>el.id===id)) {
            const producto = this.products.find((el) => el.id===id)
            console.log(producto);
        } else {
            console.log("No se encontraron productos con el id ingresado");
        }
    }
}

const empleado1 = new ProductManager ()
empleado1.getProducts()
empleado1.addProduct (
    {title: "producto1",
    description: "producto de prueba1",
    price: 23,
    thumbnail: "thumbnail no disponible",
    code: 10001,
    stock: 55}
    )
empleado1.getProducts()
empleado1.getProductsById(1)
