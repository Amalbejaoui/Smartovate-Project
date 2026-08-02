const request = require("supertest");
const app = require("../app");

jest.setTimeout(30000);

let productId;
let token;

describe("Products API Tests", () => {

    // =========================================
    // LOGIN AS ADMIN BEFORE TESTS
    // =========================================
    beforeAll(async () => {

        const response = await request(app)
            .post("/users/login")
            .send({
                email: process.env.CI_ADMIN_EMAIL,
                password: process.env.CI_ADMIN_PASSWORD
            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        token = response.body.token;

        expect(token).toBeDefined();

    });


    // =========================================
    // VALIDATION TEST
    // =========================================
    test("POST should fail if name is missing", async () => {

        const response = await request(app)
            .post("/products")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                price: 100,
                stock: 5
            });

        expect(response.statusCode).toBe(400);

        expect(response.body.success).toBe(false);

    });


    // =========================================
    // GET ALL PRODUCTS
    // =========================================
    test("GET /products should return all products", async () => {

        const response = await request(app)
            .get("/products");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

    });


    // =========================================
    // CREATE PRODUCT
    // =========================================
    test("POST /products should create a new product", async () => {

        const response = await request(app)
            .post("/products")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({

                name: "Sac Test CI",
                description: "Produit de test CI",
                price: 49.99,
                stock: 20,
                imageUrl: "test.jpg"

            });

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toBeDefined();

        productId = response.body.data.id;

    });


    // =========================================
    // UPDATE PRODUCT
    // =========================================
    test("PUT /products/:id should update product", async () => {

        expect(productId).toBeDefined();

        const response = await request(app)
            .put(`/products/${productId}`)
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({

                name: "Sac Updated CI",
                description: "Updated Product CI",
                price: 79.99,
                stock: 15,
                imageUrl: "updated.jpg"

            });

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

    });


    // =========================================
    // DELETE PRODUCT
    // =========================================
    test("DELETE /products/:id should delete product", async () => {

        expect(productId).toBeDefined();

        const response = await request(app)
            .delete(`/products/${productId}`)
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

    });

});