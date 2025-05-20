const express = require("express");
const musicRouter = express.Router();
const { Musician } = require("../../models/index");

musicRouter.get("/", async (req, res) => {
    const musicians = await Musician.findAll();
    res.json(musicians)
})

musicRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const musician = await Musician.findByPk(id);
    res.json(musician)
})

musicRouter.post("/", async (req, res) => {
    const { name, instrument } = req.body;
    const newMusician = await Musician.create({name, instrument})
    res.json(newMusician)
})

musicRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await Musician.destroy({where: {id}})
    res.json(deleted)
})

musicRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {name, instrument} = req.body
    const update = await Musician.update({name, instrument}, {where: {id}})
    res.json(update)
})

module.exports = musicRouter;