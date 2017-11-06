const express = require('express')
const bodyParser = require('body-parser');
const search = require('./search')
const path = require('path')

const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000
let queryHistory = []

app.use('/static', express.static(path.resolve(__dirname, 'static')))

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views/index.html'));
})

app.get('/api/search', async function (req, res) {
  const address = req.query.address
  if(address){
    let result = await search(address);
    queryHistory.push(result);
    res.json(result);
  }else{
    res.json({error: 'Address is empty'});
  }
})

app.get('/api/history', function(req, res){
  res.json(queryHistory);
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})