const express = require('express')
const router = express.Router()
const {
    getRuns,
    setRun,
    updateRun,
    deleteRun
} = require('../controllers/runController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getRuns).post(protect, setRun)

router.route('/:id').put(protect, updateRun).delete(protect, deleteRun)



module.exports = router