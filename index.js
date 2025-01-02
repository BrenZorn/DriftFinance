const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Authentication = require('../DriftFinanceTEST-BE/routes/Authentication')
const { run } = require('./Lib/mongo')


const app = express()
const port = 3001


app.use(cors())
app.use(bodyParser())

app.use('/Authentication', Authentication)

app.get('/', (req, res) => {
  run()
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})