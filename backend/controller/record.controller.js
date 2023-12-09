
const Record = require('../models/record.model')


const createRecord = async (req,res)=>{
    try {
        let {NUT,production,defect,operator,shift,access_key} = req.body
        if(access_key != process.env.ACCESS_KEY){
            return res.status(401).json({msg:'access denied'})
        }
        let record = await Record.create({NUT,production,defect,operator,shift})
        res.status(201).json({record})
    } catch (e) {
        console.log(e)
        res.status(500).json({msg:'internal server error'})
    }
}

const filterRecord = async(req,res)=>{
    try {
        const {start,end} = req.params
        let sd = new Date(start)
        sd.setHours(0,0,0,0)
        let ed = new Date(end)
        ed.setHours(24,60,60,100)
        const records = await Record.find({createdAt:{$gte:sd,$lte:ed}})
        res.status(200).json({records})
    } catch (e) {
        console.log(e)
        res.status(500).json({msg:'internal server error'})
    }
}


module.exports = {
     createRecord,
     filterRecord
}