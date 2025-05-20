const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index")
const { db } = require("../db/connection")
const musicRouter = require("./routes/musicians")
const bandRouter = require("./routes/bands")

const port = 3000;

app.use(express.json())
app.use(express.urlencoded())

app.use("/musicians", musicRouter)
app.use("/bands", bandRouter)

// app.get("/musicians", async (req, res) => {
//     const musicians = await Musician.findAll();

//     if (res.statusCode !== 200) {
//         throw new Error("Could not access endpoint.")
//     }

//     res.json(musicians)
// })

// app.get("/musicians/1", async (req, res) => {
//     const musicians = await Musician.findByPk(1);

//     if (res.statusCode !== 200) {
//         throw new Error("Could not access endpoint.")
//     }

//     res.json(musicians)
// })

// app.get("/bands", async (req, res) => {
//     const bands = await Band.findAll();

//     if (res.statusCode !== 200) {
//         throw new Error("Could not access endpoint.")
//     }
//     res.json(bands)
// })

// app.get("/musicians/:id", async (req, res) => {
//     try {
//         const id = req.params.id
//         const musician = await Musician.findByPk(id)
//         res.json(musician)
//     } catch (err) {
//         next(err)
//     }
// })






module.exports = app;