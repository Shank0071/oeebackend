const mongoose = require('mongoose')


const Record = new mongoose.Schema({
    NUT:Number,
    production: Number,
    defect: Number,
    operator:String,
    shift: Number,
},{
    timestamps:true
})


module.exports = mongoose.model('Record',Record)