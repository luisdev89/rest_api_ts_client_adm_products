import  request from "supertest";
import app from "../server";


describe('GET /api', ()=>{
    it("should send back a json response",  async ()=>{
        const res = await request(app).get('/api')
        // console.log(res)//toda la info de la rspuest 
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
        expect(res.body.data).toBe('Desde api')
        //negando la condicion 
        expect(res.status).not.toBe(404)
        expect(res.headers['conten-type']).not.toBe("Desde api")//debe devolver un json

        
    })
})









// describe('primera prueba', ()=>{
//     test('Debe revisar que 1 + 1 es igual a 2',()=>{
//         expect(1+1).toBe(2)
//     })

//     it("1 + 1 no debe dar 3", ()=>{
//         expect(1+1).not.toBe(3)
//     })


// })