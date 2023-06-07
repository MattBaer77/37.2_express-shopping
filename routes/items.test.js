process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let testItem1 = {name: "testName1", price: "testPrice1"}
let testItem2 = {name: "testName2", price: "testPrice2"}
let testItem3 = {price: "testPrice3"}
let testItem4 = {name: "testName4"}
let testItem5 = {}

// BEFORE / AFTER EACH -

beforeEach(() => {
    items.push(testItem1)
})

afterEach(() => {
    items.length = 0;
})

// TESTS -

describe("GET /items", () => {
    test("Get all items", async () => {
        const res = await request(app).get("/items");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([testItem1])
    })
})

describe('POST /items', () => {

    test("Post an item", async () => {

        const res = await request(app).post("/items").send(testItem2);
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(testItem2)

    })

    test("Post an item - NO NAME", async () => {

        const res = await request(app).post("/items").send(testItem3);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({"error": "Item Name is required"})

    })
  
    test("Post an item - NO PRICE", async () => {

        const res = await request(app).post("/items").send(testItem4);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({"error": "Item Price is required"})

    })
  
    test("Post an item - NO NAME OR PRICE", async () => {

        const res = await request(app).post("/items").send(testItem5);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({"error": "Item Name is required"})

    })
  
})

describe('GET /items/:name', () => {

    test("Get an item by name", async () => {

        const res = await request(app).get(`/items/${testItem1.name}`);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(testItem1)

    })

    test("Get an item by name - NOT FOUND", async () => {

        const res = await request(app).get(`/items/not-valid-item`);
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({"error": "Item not found"})

    })

})

describe('PATCH /items/:name', () => {

    test("Patch an item by name", async () => {

        const res = await request(app).patch(`/items/${testItem1.name}`).send(testItem2);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(testItem2)

    })

    test("Patch an item by name - no Price", async () => {

        const res = await request(app).patch(`/items/${testItem1.name}`).send(testItem4);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({name: "testName4", price: null})

    })

    test("Patch an item by name - no Name", async () => {

        const res = await request(app).patch(`/items/${testItem1.name}`).send(testItem3);
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({"error": "Item Name is required"})

    })

    test("Patch an item by name - no Price", async () => {

        const res = await request(app).patch(`/items/${testItem1.name}`).send(testItem5);
        expect(res.statusCode).toBe(400)
        expect(res.body).toEqual({"error": "Item Name and Price is required"})

    })

    test("Patch an item by name - non-existent item", async () => {

        const res = await request(app).patch(`/items/${testItem2.name}`).send(testItem1);
        expect(res.statusCode).toBe(404)
        expect(res.body).toEqual({"error": "Item not found"})

    })

})

describe('DELETE /items/:name', () => {

    test("Delete an item by name", async () => {

        const res = await request(app).delete(`/items/${testItem1.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: "Deleted"})

    })

    test("Delete an item by name", async () => {

        const res = await request(app).delete(`/items/${testItem2.name}`);
        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({"error": "Item not found"})

    })

})