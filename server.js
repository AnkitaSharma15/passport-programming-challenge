const express = require('express');

const app = express();
const cors = require('cors');

const port = process.env.PORT || 8000;
var path = require("path");

// our server instance

const { Pool } = require('pg');
const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
  connectionString:"postgres://awgymjzjhiyjlf:e76b8860bbc062a6dbe5ef3d4a71c6a1f05ec9a8fcb7a255396d7b1c907a3c21@ec2-107-21-255-2.compute-1.amazonaws.com:5432/d72popi4vn28mq",
  ssl: true
});

db.connect();

// var pg = require('pg');

// var pool = new pg.Pool()

app.use(express.static(path.join(__dirname, "client/build"))); 
var http = require('http').Server(app);
var io = require('socket.io')(http);



// const mysql = require('mysql');
const bodyParser = require('body-parser');
app.use(cors());

io.on('connection', function(socket){
    console.log('a user connected');
    //socket.emit('message','test');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });

// //create connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'tree'
// });
app.get('/db', async (req, res) => {
    try {
      const db = await pool.connect()
      const result = await db.query('SELECT * FROM test_table');
      res.render('pages/db', result);
      db.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

// //Connect
// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
  

//Configuration

// app.get('/createdb', (req,res) => {
//     let sql = 'CREATE DATABASE Tree';
//     db.query(sql,(err,result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('Database tree created');
//     });
// });
// app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())




// app.get('/api/createfactorytable', (req,res) => {
//     let sql = 'CREATE TABLE factory (id int AUTO_INCREMENT PRIMARY KEY, factoryName varchar(255) NOT NULL,lowerBound int NOT NULL, upperBound int NOT NULL, rangeUpdate bit NOT NULL)';
//     db.query(sql,(err,result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('Factory table created');
//     });
// });

// app.get('/api/createchildtable', (req,res) => {
//     let sql = 'CREATE TABLE child (child_id int AUTO_INCREMENT PRIMARY KEY, parentId int NOT NULL, nodeValue int NOT NULL, CONSTRAINT FK_Parentid FOREIGN KEY (parentId) REFERENCES factory(id) ON DELETE CASCADE )';
//     db.query(sql,(err,result)=>{
//         if (err) throw err;
//         console.log(result);
//         res.send('Child table created');
//     });
// });


app.post('/api/addFactory', function (req, res) {
    console.log(req.body);
    let fname = req.body.factoryName;
    let lbound = req.body.lowerRange;
    let ubound = req.body.upperRange;
    console.log(fname);
    
    var sql = "INSERT INTO `factory` (`factoryName`, `lowerBound`, `upperBound`, `rangeUpdate`) VALUES ('"+fname+"','"+lbound+"','"+ubound+"',0)";
    
    db.query(sql,(err,result)=>{
        if (err) throw err;
        
    });
    getUpdatedData(res);
  });
//   app.get('/api/addFactory', function(request, response) {

// 	pool.connect(connString, function(err, client, done) {
// 		if(err) response.send("Could not connect to DB: " + err);
// 		client.query('SELECT * FROM factory', function(err, result) {
// 			done();
// 			if(err) return response.send(err);
// 			response.send(result.rows);
// 		});
// 	});
// });

var getUpdatedData = res =>{
    
   
    // var selectSql = 'SELECT * from factory';
    // const result = db.query(selectSql);
    // res.send(result.rows);
    db.query('SELECT * FROM factory', function(err, result) {
        
        if(err) return console.error(err);
        res.send(result.rows);
     });
    // db.end();
    // const result = db.query(selectSql,(err,result)=>{
    //     if (err) throw err;
    //     let newData = [];
    //     var count = 0
    //     result.rows.forEach((data,i) =>{
    //         var fetchFactoryQuery = "SELECT * from child where parentId = 1 ; ";
    //         db.query(fetchFactoryQuery,(err,res1)=>{
    //             if (err) throw err;
    //             var entry = {
    //                 ...data,
    //                 child: res1
    //             };
    //             newData.push(entry);
    //             if(result.length == newData.length){
    //                 io.emit('message',newData)
    //                 console.log(newData);
    //                 res.send(newData);
    //             }
    //         });
           
    //     });
    // }); 
}

app.get('/api/addFactory', function(req,res){
    
    getUpdatedData(res);
    
})
app.post('/api/addChild', function (req, res) {
    console.log(req.body);
    
    let numNodes = parseInt(req.body.count);
    let pID = req.body.pId;
    let a = req.body.min;
    let b = req.body.max;

    console.log(a,b,numNodes);
    
            if(numNodes<=15){
                let del = "DELETE from `child` where `parentId`= '"+pID+"' ";
                db.query(del,(err,result)=>{
                    if(err) throw err
                    else{
                        let nodeValue = 0
                        for (var i = 0; i<numNodes; i++){
                            nodeValue = Math.floor(Math.random() * ((b - a) + 1)) + a;
                            console.log(nodeValue);
                                let q = "INSERT INTO `child` (`parentId`, `nodeValue`) VALUES ('"+pID+"','"+nodeValue+"')";
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

  

  app.get('/api/addChild/:parentId', function(req,res){

    let id = req.params.parentId;
    console.log(id);
    var sql = "SELECT * from `child` where `parentId` = '"+id+"' ";
    db.query(sql,(err,result)=>{
        if (err) throw err;
        res.send(result);
    });
    
});

app.post('/api/updateFactory', function(req,res){
    let fName = req.body.factoryName;
    let lower = req.body.lowerRange;
    let upper = req.body.upperRange;
    let pid = req.body.pId;
    console.log(req.body);
    var selectSql = "SELECT * from `factory` where `id`='"+pid+"'";
    db.query(selectSql,(err,result)=>{
        if (err) throw err;
        let lowerB =  result[0].lowerBound
        let upperB = result[0].upperBound

        console.log(lowerB);
        console.log(lower)

        if(lowerB != lower || upperB != upper){
            var sql = "DELETE FROM `child` where `parentId` = '"+pid+"' ";
            db.query(sql,(err,result)=>{
                if (err) throw err;
                
            });
        }
        
        var update = "UPDATE factory SET `factoryName` = '"+fName+"' where `id` = '"+pid+"'  ";
        db.query(update,(err,result)=>{
            if (err) throw err;
            console.log("updated");
        });
    
       getUpdatedData(res);
        
    });
});

app.post('/api/deleteFactory', function (req, res) {
    let pid = req.body.id;
    console.log(pid);
    var sql = "DELETE FROM `factory` where `id` = '"+pid+"' ";
    db.query(sql,(err,result)=>{
        if (err) throw err
        else{
            getUpdatedData(res);
        }
    });
 });



app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

http.listen(port, () => console.log(`Listening on port ${port}`));