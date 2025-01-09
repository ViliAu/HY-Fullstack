const { test, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const validUsers = [
    {
        username: "tester69",
        name: "test user",
        password: "salis123"
    },
    {
        username: "testdude70",
        name: "test user 2",
        password: "salis123"
    }
]

const invalidUsers = [
    {
        name: "test user",
        password: "salis123"
    },
    {
        username: "tester69",
        name: "test user",
        password: "ei"
    },
    {
        username: "tester69",
        name: "paavo"
    }
]

beforeEach(async () => {
    await User.deleteMany({})
    await new User(validUsers[0]).save()
})


describe("User creation and validation suite", () => {

    test("Able to fetch users", async () => {
        const res = await api.get("/api/users")
        assert.strictEqual(res.body.length, 1)
    })

    test("Able to create users", async () => {
        let res = await api.get("/api/users").expect(200);
        assert.strictEqual(res.body.length, 1)
        await api
        .post("/api/users")
        .send(validUsers[1])
        .expect(201)
        res = await api.get("/api/users").expect(200);
        assert.strictEqual(res.body.length, 2)
        
        assert.strictEqual(res.body[1].username, validUsers[1].username)
    })

    test("Invalid users give correct response", async () => {
        for (let user of invalidUsers) {
            await api
            .post("/api/users")
            .send(user)
            .expect(400)
        }
    })

    test("Shouldn't be able to use an already existing name", async () => {
        await api
        .post("/api/users")
        .send(validUsers[0])
        .expect(400)
    })
})