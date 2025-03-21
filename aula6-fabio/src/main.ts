import express from 'express'

const app = express()

app.get('/', function (req,res) {
  res.send('Front end vai acabar... so vai exister postman e curl ;)')
})

app.listen(3001)