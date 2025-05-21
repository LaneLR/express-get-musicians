const express = require("express");
const {check, validationResult} = require("express-validator")
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

musicRouter.post("/", [check("name").not().trim().isEmpty(), check("instrument").not().isEmpty().trim()], async (req, res, next) => {
    const errors = validationResult(req) 
    if (!errors.isEmpty()) {
        return res.json({error: errors.array()})
    }
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