// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('../../db/connection');
const { Musician } = require('../../models/index')
const app = require('../app');
const {seedMusician} = require("../../seedData");
const { Json } = require('sequelize/lib/utils');


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
    test("can throw errors", async () => {
        const res1 = await request(app).post("/musicians").send({name: "Prince   ", instrument: "  Vocals "})
        const res2 = await request(app).post("/musicians").send({name: "  ", instrument: "Vocals"})
        const res3 = await request(app).post("/musicians").send({name: "KeyBoardSpamIFellOnMyKeyboardOwww", instrument: "Keyboard"})
        const resData = JSON.parse(res1.text)
        const res2Data = JSON.parse(res2.text)
        const res3Data = JSON.parse(res3.text)
        console.log(resData)
        expect(resData.name).toEqual("Prince")
        expect(res2Data.name).toBeUndefined()
        expect(res3Data).toHaveProperty("error")
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