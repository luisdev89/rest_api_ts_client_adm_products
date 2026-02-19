import {exit} from 'node:process'
import db from '../config/db'


const clearDb = async ()=>{
   try {
    await db.sync({force:true})//elimina todos los datos de la BD
    console.log("datos eliminados")
    exit()// inidca que finalizo con exito

   } catch (error) {
    console.log(error)
    exit(1)// el parametro 1 indica que finalizo con error
   }
}

if(process.argv[2]){
    clearDb()
}

// console.log(process.argv)