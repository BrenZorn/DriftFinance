const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { run } = require('./Lib/mongo')
const authentication = require('./Routes/Authentication')

const app = express()
const port = 3002


app.use(cors())
app.use(bodyParser())

app.use('/Authentication', authentication)

app.get('/', (req, res) => {

  run()
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})