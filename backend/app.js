require('dotenv').config()
const express = require('express')
const app = express()
// security packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimit = require('express-rate-limit')
// connect db
const connectDb = require('./db/connect')
// routers
const RecordRoute = require('./routes/record.route')

app.use(express.static('./public'))
app.set('trust proxy', 1)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
  }),
)
app.use(cors())
app.use(express.json())
// extra packages
app.use(helmet())

app.use(xss())


app.use(RecordRoute)

app.get('/',(req,res)=>{
  res.status(200).send('this is backend of OEE')
})
app.get('/health',async(req,res)=>{
  const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    }
  res.status(200).json(healthcheck)
})

const port = process.env.PORT || 8080

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    )
  } catch (error) {
    console.log(error)
  }
}

start()