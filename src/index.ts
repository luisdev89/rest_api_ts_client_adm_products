import app from "./server";
import colors from 'colors'


const port = process.env.port || 4000
const server = app.listen(port, ()=>{
    console.log(colors.bgCyan.bold(`REST API Funcionando en el puerto ${port}`))
})

export default server