const express = require("express");
const bandRouter = express.Router();
const { Band } = require("../../models/index");

bandRouter.get("/", async (req, res) => {
    const bands = await Band.findAll();
    res.json(bands)
})

bandRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const band = await Band.findByPk(id);
    res.json(band)
})

bandRouter.post("/", async (req, res) => {
    const { name, genre } = req.body;
    const newBand = await Band.create({name, genre})
    res.json(newBand)
})

bandRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const deleted = await Band.destroy({where: {id}})
    res.json(deleted)
})

bandRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const {name, genre} = req.body
    const update = await Band.update({name, genre}, {where: {id}})
    res.json(update)
})

module.exports = bandRouter;