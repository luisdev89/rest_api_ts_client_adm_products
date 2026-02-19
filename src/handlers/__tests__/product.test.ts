import request from "supertest";
import app, { connectDb } from "../../server";
import db from "../../config/db";



// crear producto
describe("/api/products", () => {
  (it("Should show validation errors", async () => {
    const res = await request(app).post("/api/products").send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(4);

    expect(res.status).not.toBe(404);
    expect(res.body.errors).not.toHaveLength(5);
  }),
    it("The price should be greater than 0 and it has to be number", async () => {
      const res = await request(app)
        .post("/api/products")
        .send({ name: "Lapiz", price: 0 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.status).not.toBe(201);
      expect(res.body.errors).not.toHaveLength(5);
    }));

  it("Req to add a new Product", async () => {
    const res = await request(app)
      .post("/api/products")
      .send({ name: "Prueba 3", price: 300 });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.status).not.toBe(400);
    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(200);
  });
});
//obtener los productos
describe("/api/products", () => {
  it("Should get all the products from the DB and check a valid URL", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(res.body).toHaveProperty("data");
    //la contraparte
    expect(res.status).not.toBe(404);
    expect(res.body).not.toHaveProperty("errors");
  });
});

// obtener por id
describe("Get Product by Id", () => {
  it("Should return a 404 Response for non existing product", async () => {
    const productId = 2000;
    const res = await request(app).get(`/api/products/${productId}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("Producto no encontrado o no existe");
  });

  it("Should check a valid ID in the URL", async () => {
    const res = await request(app).get(`/api/products/id`);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toHaveLength(1);
    expect(res.body.errors[0].msg).toBe("Id del Producto no valido");
  });

  it("GET a JSON response if the product exists", async () => {
    const res = await request(app).get(`/api/products/1`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");
  });
});

//actualizar producto- PuT

describe("Update a Product by ID", () => {
  it("Should display validation error messages", async () => {
    const res = await request(app).put(`/api/products/1`).send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors).toBeTruthy();
    expect(res.body.errors).toHaveLength(5);

    expect(res.status).not.toBe(200);
    expect(res.body).not.toHaveProperty("data");
  });

  it("The price should be greater than 0 and it has to be number", async () => {
    const res = await request(app)
      .put("/api/products/1")
      .send({ name: "Lapiz", price: 0 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("El precio es invalido");
    expect(res.status).not.toBe(201);
    expect(res.body.errors).not.toHaveLength(5);
  });

  it("Should return a 404 response for a non existing product", async () => {
    const res = await request(app)
      .put("/api/products/4000")
      .send({ name: "Lapiz", price: 3, availability: true });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("El Producto a editar no existe");
    expect(res.status).not.toBe(200);
  });

  it("Update an existing product", async () => {
    const res = await request(app)
      .put("/api/products/1")
      .send({ name: "Lapiz", price: 3500, availability: true });
    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toBe("Se edito el producto correctamente");

    expect(res.status).not.toBe(404);
  });
});


//patch

describe("Update Availability", () => {
    it("Should return a 404 response for non existing product", async () => {
        const res = await request(app).patch("/api/products/2000");
        expect(res.status).toBe(404);
        expect(res.body.error).toBe("El Producto a actualizar no existe");
        expect(res.status).not.toBe(200);
        expect(res.body).not.toHaveProperty("data");
    });
    
    it("Should update the product availability", async () => {
        const res = await request(app).patch("/api/products/1");
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("data");
        
        expect(res.status).not.toBe(404);
        expect(res.body).not.toHaveProperty('error')
    });
});

//delete
describe("Delete a Product", () => {
  it("Should delete a product", async () => {
    const res = await request(app).delete("/api/products/non-valid");
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");
    expect(res.body.errors[0].msg).toBe("Id del Producto no valido");
  });

  it("Should check a 404 for non existing product", async () => {
    const res = await request(app).delete("/api/products/2000");
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("El Producto a eliminar no existe");

    expect(res.status).not.toBe(200);
  });

  it("Should delete a product", async () => {
    const res = await request(app).delete("/api/products/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.status).not.toBe(404);
    expect(res.status).not.toBe(400);
  });
});

//forzando errores con los moscks de Jest

// jest.mock('../../config/db')

// describe('connectDb', ()=>{
//     it('should handle DB connection error', async()=>{
//       jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error ('Hubo un error al conectar la BD'))
//       const consoleSpy = jest.spyOn(console, 'log')
//       await connectDb()

//       expect(consoleSpy).toHaveBeenCalledWith(
//         expect.stringContaining('Hubo un error al conectar la BD')
//       )
//     })
// })
