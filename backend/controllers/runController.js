const asyncHandler = require('express-async-handler');

const Run = require('../models/runModel')

//@desc get runs
//@route GET /api/runs
//@access Private
const getRuns = asyncHandler(async (req, res) => {
    const runs = await Run.find();

    res.status(200).json(runs)
})

//@desc set run
//@route POST /api/runs
//@access Private
const setRun = asyncHandler(async(req, res) => {
    if(!req.body.length){
        res.status(400)
        throw new Error('Please add a text field')
    }

    let dateDay = new Date()

    const run = await Run.create({
        length: req.body.length,
        date: req.body.date,
        user: req.body.user
    })

    res.status(200).json(run)
})

//@desc update run
//@route PUT /api/runs/:id
//@access Private
const updateRun = asyncHandler(async(req, res) => {
    const run = await Run.findById(req.params.id)

    if(!run){
        res.status(400)
        throw new Error('Run not found')
    }

    const updatedRun = await Run.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })

    res.status(200).json(updatedRun)
})

//@desc delete run
//@route DELETE /api/runs/:id
//@access Private
const deleteRun = asyncHandler(async(req, res) => {
    const run = await Run.findById(req.params.id)

    if(!run){
        res.status(400)
        throw new Error('Run not found')
    }

    const deletedRun = run.remove()

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getRuns,
    setRun,
    updateRun,
    deleteRun
}