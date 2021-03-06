const express = require('express')
const bodyParser = require('body-parser');
const search = require('./search')
const path = require('path')

const MongoClient = require('mongodb').MongoClient;

let mdb;
let historyCollection;
// Connect to the db
const mongoURL = 'mongodb://brown:123456@ds111496.mlab.com:11496/js-class-20171116'
MongoClient.connect(mongoURL, async function(err, db) {
    console.log('mongodb connect');
  
    if (err) {
      return console.dir(err); 
    } 

    

    //--建立DB資料--//
    //let collection = db.collection('test');
    // let doc1 = { 'hello': 'doc1' };
    // let doc2 = { 'hello': 'doc2' };
    // let lotsOfDocs = [{ 'hello': 'doc3' }, { 'hello': 'doc4' }];
    // collection.insert(doc1);
    // collection.insert(doc2, { w: 1 }, function (err, result) { });
    // collection.insert(lotsOfDocs, { w: 1 }, function (err, result) { });
  
    //--單筆讀取DB資料--//
    //let collection = db.collection('test');
    // let cursor = collection.find({hello: 'doc1'});
    // let item = await cursor.nextObject();
    // console.log(item); 
    // item =  await cursor.nextObject();
    // console.log(item); 

    //--讀取所有DB資料--//
    // let collection = db.collection('test');
    // collection.find({}).toArray((err, results) => {
    //   console.log(results)
    // });

    mdb = db;    
    historyCollection = db.collection('history');  
    runApp();  
});

async function runApp(){

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
    //queryHistory.push(result);
    historyCollection.insert(result);
    res.json(result);
  }else{
    res.json({error: 'Address is empty'});
  }
})


app.get('/api/history', async function(req, res){

  try {
    let query = req.query || {};
    let results = await historyCollection.find(query).toArray()
    res.json(results)
  } catch (error) {
    console.trace(error)
    res.json(error)
  }

  // historyCollection.find({}).toArray((error, results) =>{
  //   res.json(results);
  // });

  //res.json(queryHistory);
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})

};