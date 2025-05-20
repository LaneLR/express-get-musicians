// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    
    
    test("can access", async () => {
        const res = await request(app).get("/musicians")
        expect(res.statusCode).toEqual(200)
    })

    test("can retrieve correct data", async () => {
        const res = await request(app).get("/musicians")
        const resData = JSON.parse(res.text)
        expect(resData[0].name).toEqual("Mick Jagger")
    })
})


describe('./musicians/1 endpoint', () => {
    
    
    test("can access", async () => {
        const res = await request(app).get("/musicians/1")
        expect(res.statusCode).toEqual(200)
    })

    test("can retrieve correct data", async () => {
        const res = await request(app).get("/musicians/1")
        const resData = JSON.parse(res.text)
        expect(resData.id).toEqual(1)
        expect(resData.instrument).toEqual("Voice")
    })

})

describe('./musicians/:id endpoint', () => {
    
    
    test("can access", async () => {
        const id = await Musician.findByPk(2).id
        const res = await request(app).get(`/musicians/${id}`)
        expect(res.statusCode).toEqual(200)
    })

    test("can retrieve correct data", async () => {
       const id = await Musician.findByPk(2)
        const res = await request(app).get(`/musicians/${id.id}`)
        expect(res.body.name).toEqual("Drake")
    })

})

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

})