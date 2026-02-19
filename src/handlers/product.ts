import { Request, Response } from "express";
import Product from "../models/Product.model";


// Crear los Productos
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    const productSaved = await product.save();
    res.status(201).json({ data: productSaved });
  } catch (error) {
    console.log(error);
  }

};


//Obtener todos los productos
export const getAllProducts = async(req: Request, res: Response)=>{
    try {
        const products = await Product.findAll({
            order:[['id', 'DESC']],
            attributes:{exclude:["createdAt","updatedAt"]}
        })
        res.json({data:products})
    } catch (error) {
        console.log(error)
    }
}


//Obtener productos por su ID
export const getProductById = async (req:Request,res:Response)=>{
    try {
        const {id} = req.params
        const product = await Product.findByPk(+id)
        if(!product){
           return res.status(404).json({error:'Producto no encontrado o no existe'})
        }
        res.json({data:product})
    } catch (error) {
        console.log(error)
    }
}

// Actualizar un Producto
export const updateProduct = async (req:Request,res:Response)=>{
      try {
        //validando si el producto existe
        const {id} = req.params
        const product = await Product.findByPk(+id)
        if(!product){
            return res.status(404).json({error:'El Producto a editar no existe'})
        }

        //actualizando y guardando en la BD si pasa la validacion 
        // console.log(req.body)
        
        // await product.update(req.body)
        product.name = req.body.name
        product.price= req.body.price
        product.availability = req.body.availability

        await product.save()
        res.json({data:"Se edito el producto correctamente"})


      } catch (error) {
        console.log(error)
      }
}

//actualizar el estado de la disponibilidad
export const updateAvailabilty = async (req:Request,res:Response)=>{
   try {
      //validando si el producto existe
        const {id} = req.params
        const product = await Product.findByPk(+id)
        if(!product){
            return res.status(404).json({error:'El Producto a actualizar no existe'})
        }
        // cambiando disponibilidad
         product.availability = !product.dataValues.availability // cambiara al valor contrario en cada req
        await product.save()
        res.json({data:product})
    
   } catch (error) {
      console.log(error)
   }
}

//borrar un producto

export const deleteProduct = async (req:Request,res:Response)=>{
      //validando si el producto existe
        const {id} = req.params
        const product = await Product.findByPk(+id)
        if(!product){
            return res.status(404).json({error:'El Producto a eliminar no existe'})
        }
       // eliminando
        await product.destroy()
        res.json({data:'Producto Eliminado'})

        //eliminando producto
}
