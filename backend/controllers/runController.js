const asyncHandler = require('express-async-handler');

const Run = require('../models/runModel')
const User = require('../models/userModel')

//@desc get runs
//@route GET /api/runs
//@access Private
const getRuns = asyncHandler(async (req, res) => {
    const runs = await Run.find({ user: req.user.id });

    res.status(200).json(runs)
})

//@desc set run
//@route POST /api/runs
//@access Private
const setRun = asyncHandler(async(req, res) => {
    if(!req.body.length){
        res.status(400)
        throw new Error('Please add a length of your run')
    }

    // let dateDay = new Date()

    const run = await Run.create({
        length: req.body.length,
        date: req.body.date,
        user: req.user.id
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

    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the run user
    if(run.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
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

    // check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //make sure the logged in user matches the run user
    if(run.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
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