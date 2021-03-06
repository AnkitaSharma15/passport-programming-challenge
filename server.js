const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
var path = require("path");

// db configuration

const { Pool } = require('pg');
const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
  connectionString:"postgres://awgymjzjhiyjlf:e76b8860bbc062a6dbe5ef3d4a71c6a1f05ec9a8fcb7a255396d7b1c907a3c21@ec2-107-21-255-2.compute-1.amazonaws.com:5432/d72popi4vn28mq",
  ssl: true
});

db.connect();



app.use(express.static(path.join(__dirname, "client/build"))); 

//socket.io server instance
var http = require('http').Server(app);
var io = require('socket.io')(http);


const bodyParser = require('body-parser');
app.use(cors());

io.on('connection', function(socket){
    console.log('a user connected');
    //socket.emit('message','test');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


//Post addFactory endpoint

app.post('/api/addFactory', function (req, res) {
    console.log(req.body);
    let fname = req.body.factoryName;
    let lbound = req.body.lowerRange;
    let ubound = req.body.upperRange;
    console.log(fname);
    
    var sql = "INSERT INTO factory (factoryname, lowerbound, upperbound) VALUES ('"+fname+"','"+lbound+"','"+ubound+"')";
    
    db.query(sql,(err,result)=>{
        if (err) throw err;
    });
    getUpdatedData(res);
  });



var getUpdatedData = res =>{
    db.query('SELECT * FROM factory', function(err, result) {
        
        if(err) return console.error(err);
        let newData = [];
        var count = 0
        result.rows.forEach((data,i) =>{
            var fetchFactoryQuery = "SELECT * from child where parentId = '"+data.id+"' ";
            db.query(fetchFactoryQuery,(err,res1)=>{
                if (err) throw err;
                var entry = {
                    ...data,
                    child: res1.rows
                };
                newData.push(entry);
                if(result.rows.length == newData.length){
                    io.emit('message',newData)
                    console.log(newData);
                    res.send(newData);
                }
            });
        })
        
     });
}

// GET addFactory 

app.get('/api/addFactory', function(req,res){
    
    getUpdatedData(res);
    
})

// Post addChild
app.post('/api/addChild', function (req, res) {
    console.log(req.body);
    
    let numNodes = parseInt(req.body.count);
    let pID = req.body.pId;
    let a = req.body.min;
    let b = req.body.max;

    console.log(a,b,numNodes);
    
            if(numNodes<=15){
                let del = "DELETE from child where parentid = '"+pID+"' ";
                db.query(del,(err,result)=>{
                    if(err) throw err
                    else{
                        let nodeValue = 0
                        for (var i = 0; i<numNodes; i++){
                            nodeValue = Math.floor(Math.random() * ((b - a) + 1)) + a;
                            console.log(nodeValue);
                                let q = "INSERT INTO child (parentid, nodevalue) VALUES ('"+pID+"','"+nodeValue+"')";
                                data=[]
                                db.query(q,(err,result)=>{
                                    if(err) throw err
                                    
                            });
                            

                        }
                        getUpdatedData(res);

                    }
                });
        }
        else{
            res.send("exceeded 15 nodes");
        }
  });

  
// Get child data of particular parent with parent id
  app.get('/api/addChild/:parentid', function(req,res){

    let id = req.params.parentid;
    console.log(id);
    var sql = "SELECT * from child where parentid = '"+id+"' ";
    db.query(sql,(err,result)=>{
        if (err) throw err;
        res.send(result.rows);
    });
    
});

//updateFactory
app.post('/api/updateFactory', function(req,res){
    let fName = req.body.factoryName;
    let lower = req.body.lowerRange;
    let upper = req.body.upperRange;
    let pid = req.body.pId;
    console.log(req.body);
    var selectSql = "SELECT * from factory where id ='"+pid+"'";
    db.query(selectSql,(err,result)=>{
        if (err) throw err;
        let lowerB =  result.rows[0].lowerbound
        let upperB = result.rows[0].upperbound

        console.log(lowerB);
        console.log(lower)

        if(lowerB != lower || upperB != upper){
            var sql = "DELETE FROM child where parentid = '"+pid+"' ";
            db.query(sql,(err,result)=>{
                if (err) throw err;
                
            });
        }
        
        var update = "UPDATE factory SET factoryName = '"+fName+"' where id = '"+pid+"'  ";
        db.query(update,(err,result)=>{
            if (err) throw err;
            console.log("updated");
        });
    
       getUpdatedData(res);
        
    });
});

//deleteFactory
app.post('/api/deleteFactory', function (req, res) {
    let pid = req.body.id;
    console.log(pid);
    var sql = "DELETE FROM factory where id = '"+pid+"' ";
    db.query(sql,(err,result)=>{
        if (err) throw err
        else{
            getUpdatedData(res);
        }
    });
 });

//test api

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

http.listen(port, () => console.log(`Listening on port ${port}`));