process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let cats = require("../fakeDb");

// BEFORE / AFTER EACH -

// TESTS -