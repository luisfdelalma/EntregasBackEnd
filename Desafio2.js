// DESAFIO 2 CORRESPONDIENTE A MANEJO DE DOCUMENTOS CON JAVASCRIPT

class ProductManager {
    constructor (path){
        this.products = []
        this.path=path
    }

    addProduct(title, description, price,thumbnail,code,stock){

        let check = false
        this.products.forEach((product)=> {
            if (product.code===code) {
                check = true
            }})
            
            if(check){return "El producto que desea ingresar ya se encuentra en el sistema"}
            else{
                let id=0
                if (this.products.length===0){ id=1}
                else {id = this.products[this.products.length-1].id+1}

                let product = {id, title,description,price,thumbnail,code,stock}
        }
    }
}

const producto1=new ProductManager("./textoEjemplo.json")
producto1.addProduct(
{id:"ejemplo",
title:"ejemplo",
description:"ejemplo"
}
)
