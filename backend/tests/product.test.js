const request = require("supertest");
const jwt = require("jsonwebtoken");

// ==========================================
// MOCK USER MODEL
// ==========================================

jest.mock("../src/models/userModel", () => ({
    findUserByEmail: jest.fn(),
    createUser: jest.fn()
}));

// ==========================================
// MOCK PRODUCT MODEL
// ==========================================

jest.mock("../src/models/productModel", () => ({
    getAllProducts: jest.fn(),
    getProductById: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn()
}));

// ==========================================
// IMPORT MOCKED MODELS
// ==========================================

const User = require("../src/models/userModel");
const Product = require("../src/models/productModel");

// ==========================================
// IMPORT APP
// ==========================================

const app = require("../app");

// ==========================================
// JEST TIMEOUT
// ==========================================

jest.setTimeout(10000);

let productId;
let token;


// ==========================================
// PRODUCTS API TESTS
// ==========================================

describe("Products API Tests", () => {

    // ==========================================
    // BEFORE ALL
    // ==========================================

    beforeAll(() => {

        process.env.JWT_SECRET = "test-secret";

        // Generate fake admin JWT
        token = jwt.sign(
            {
                id: 1,
                role: "admin"
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        expect(token).toBeDefined();
    });


    // ==========================================
    // RESET MOCKS
    // ==========================================

    beforeEach(() => {

        jest.clearAllMocks();

    });


    // ==========================================
    // VALIDATION TEST
    // ==========================================

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

        expect(
            Product.createProduct
        ).not.toHaveBeenCalled();

    });


    // ==========================================
    // GET ALL PRODUCTS
    // ==========================================

    test("GET /products should return all products", async () => {

        Product.getAllProducts.mockResolvedValue([
            {
                id: 1,
                name: "Sac Test",
                description: "Produit test",
                price: 49.99,
                stock: 20,
                imageUrl: "test.jpg"
            }
        ]);

        const response = await request(app)
            .get("/products");

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(
            Array.isArray(response.body.data)
        ).toBe(true);

        expect(
            Product.getAllProducts
        ).toHaveBeenCalledTimes(1);

    });


    // ==========================================
    // CREATE PRODUCT
    // ==========================================

    test("POST /products should create a new product", async () => {

        const mockProduct = {

            id: 100,

            name: "Sac Test CI",

            description: "Produit de test CI",

            price: 49.99,

            stock: 20,

            imageUrl: "test.jpg"

        };

        Product.createProduct.mockResolvedValue(
            mockProduct
        );

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

        expect(response.body.data.id).toBe(100);

        productId = response.body.data.id;

        expect(
            Product.createProduct
        ).toHaveBeenCalledTimes(1);

    });


    // ==========================================
    // UPDATE PRODUCT
    // ==========================================

    test("PUT /products/:id should update product", async () => {

        expect(productId).toBeDefined();

        const updatedProduct = {

            id: productId,

            name: "Sac Updated CI",

            description: "Updated Product CI",

            price: 79.99,

            stock: 15,

            imageUrl: "updated.jpg"

        };

        Product.updateProduct.mockResolvedValue(
            updatedProduct
        );

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

        expect(response.body.data).toBeDefined();

        expect(
            response.body.data.name
        ).toBe("Sac Updated CI");

        expect(
            Product.updateProduct
        ).toHaveBeenCalledTimes(1);

    });


    // ==========================================
    // DELETE PRODUCT
    // ==========================================

    test("DELETE /products/:id should delete product", async () => {

        expect(productId).toBeDefined();

        Product.deleteProduct.mockResolvedValue(true);

        const response = await request(app)
            .delete(`/products/${productId}`)
            .set(
                "Authorization",
                `Bearer ${token}`
            );

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(
            Product.deleteProduct
        ).toHaveBeenCalledTimes(1);

    });

});