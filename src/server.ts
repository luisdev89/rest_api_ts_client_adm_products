import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import cors, {CorsOptions}from 'cors'
import morgan from 'morgan'




// config del server con la instancia de express
const app = express()
//permitir conexion cors
const corsOptions:CorsOptions={
    origin:function(origin,callback){
     if(origin === process.env.FRONTEND_URL){
       callback(null, true)
     }else{
        callback(new Error('Error de Cors'), false)
     }
    }
}

app.use(cors(corsOptions))

app.use(express.json())// para poder leer los req
//morgan para loggear las peticiones hacia la api 
app.use(morgan('dev'))
//config del router
app.use('/api/products', router)
// //routing
// server.get('/', (req, res)=>{
//    res.json('Desde get')
// })

app.get('/api',(req,res)=>{
    res.json({data:'Desde api'})
})

// conexion a la bd 
export async function connectDb() {
    try {
        //autenticamos la bd
        await db.authenticate()
        // si todo sale bien sincronizamos
        await db.sync()
        console.log(colors.bgGreen.bold('Conexion exitosa la BD'))

    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectar la BD'))
    }
 }

 connectDb()




export default app

