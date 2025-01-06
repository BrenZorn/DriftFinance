const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { run } = require('./Lib/mongo')
const authentication = require('./Routes/Authentication')
const homepage = require('./Routes/Homepage')

const app = express()
const port = 3001


app.use(cors())
app.use(bodyParser())
 
app.use('/Authentication', authentication)
app.use('/Main', homepage)

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})