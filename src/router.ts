import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateAvailabilty,
  updateProduct,
} from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();
// router.get("/", (req, res) => {
//   res.json("Probando el router");
// });

// agregar Producto
router.post(
  "/",
  //validacion
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El precio es invalido")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El precio es invalido"),
  //middleware de errores
  handleInputErrors,

  createProduct,
);

//Obtener todos los Productos
router.get("/", getAllProducts);

//obtener producto por id
router.get(
  "/:id",
  param("id").isInt().withMessage("Id del Producto no valido"),
  handleInputErrors,
  getProductById,
);

//actualizar producto
router.put(
  "/:id",
  param("id").isInt().withMessage("Id del Producto no valido"),
  body("name").notEmpty().withMessage("El nombre del producto es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("El precio es invalido")
    .notEmpty()
    .withMessage("El precio del producto es obligatorio")
    .custom((value) => value > 0)
    .withMessage("El precio es invalido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor de disponibilidad no valido"),
  handleInputErrors,
  updateProduct,
);

// actualizar disponibilidad
router.patch(
  "/:id",
  param("id").isInt().withMessage("Id del Producto no valido"),
  handleInputErrors,
  updateAvailabilty,
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("Id del Producto no valido"),
  handleInputErrors,
  deleteProduct,
);

export default router;
