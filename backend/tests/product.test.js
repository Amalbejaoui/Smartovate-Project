const request = require("supertest");
const app = require("../app");

jest.setTimeout(30000);

let productId;

describe("Products API Tests", () => {
    test("POST should fail if name is missing", async () => {

        const response = await request(app)
            .post("/products")
            .send({
                price: 100,
                stock: 5
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);

    });

    // ==========================
    // GET ALL PRODUCTS
    // ==========================
    test("GET /products should return all products", async () => {

        const response = await request(app)
            .get("/products");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

    });



    // ==========================
    // CREATE PRODUCT
    // ==========================
    test("POST /products should create a new product", async () => {

        const response = await request(app)
            .post("/products")
            .send({

                name: "Sac Test",
                description: "Produit de test",
                price: 49.99,
                stock: 20,
                imageUrl: "test.jpg"

            });

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);

        productId = response.body.data.id;

    });



    // ==========================
    // UPDATE PRODUCT
    // ==========================
    test("PUT /products/:id should update product", async () => {

        const response = await request(app)
            .put(`/products/${productId}`)
            .send({

                name: "Sac Updated",
                description: "Updated Product",
                price: 79.99,
                stock: 15,
                imageUrl: "updated.jpg"

            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

    });



    // ==========================
    // DELETE PRODUCT
    // ==========================
    test("DELETE /products/:id should delete product", async () => {

        const response = await request(app)
            .delete(`/products/${productId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);

    });

});