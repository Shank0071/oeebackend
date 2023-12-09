const express = require('express')
const router = express.Router()


const {createRecord,filterRecord} = require('../controller/record.controller')



router.get('/record/:start/:end',filterRecord)
router.post('/record',createRecord)


module.exports = router