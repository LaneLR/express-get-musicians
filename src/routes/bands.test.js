const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('../../db/connection');
const { Band } = require('../../models/index')
const app = require('../app');
const {seedBand} = require("../../seedData");

describe('./bands endpoint', () => {
    
    test("can access", async () => {
        const res = await request(app).get("/bands")
        expect(res.statusCode).toEqual(200)
    })

    test("can retrieve correct data", async () => {
        const res = await request(app).get("/bands")
        const resData = JSON.parse(res.text)
        expect(resData[1].genre).toEqual("Pop")
        expect(resData[2].name).toEqual("Coldplay")
    })

    test("throws errors", async () => {
        const res = await request(app).get("/bands")
        const resData = JSON.parse(res.text)
        expect(resData[1].genre).toEqual("Pop")
        expect(resData[2].name).toEqual("Coldplay")
    })
})