// let semana = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

// semana.forEach((el, i)=>{
//     semana[i]=el.toUpperCase()
// })
// console.table(semana)

// --------------------------------------------------------------------------------------------------------

const fs = require('fs')
const crypto = require('crypto')

class UserManager {
    constructor (path){
        this.path = path
    }

    async createUser(user){

        const cipher = crypto.createCipheriv('aes-192', crypto.randomBytes(16), crypto.randomBytes(12))
        let encrypted = cipher.update(user.password, 'utf-8', 'hex')
        encrypted += cipher.final('hex')
        console.log(encrypted.toString("hex"));

        try{
            let credentials = {
                username: user.username,
                password: user.password
            }
            await fs.promises.writeFile(this.path, JSON.stringify(credentials),'utf-8')
            console.log("User added!");
        }catch(err){
            console.log("Error al crear usuario");
        }
    }
}

let newUser = new UserManager('./Usuarios.json')
newUser.createUser({username: "pepito96", password: "contra96"})