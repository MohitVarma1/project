const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const jwt_decode = require ("jwt-decode");
const exjwt = require('express-jwt');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require("mongoose")
const namesModel = require("./models/schema");
const configureModel = require("./models/configureSchema");
const expenseModel = require("./models/expenseSchema");
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { Server } = require('http');

app.use(bearerToken());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('public'));
app.use(compression());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://165.227.82.127/');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

let url = 'mongodb://localhost:27017/mongodb_project';

const PORT = 3001;

const secretKey = 'My super secret key';
const jwtMW = exjwt({
    secret: secretKey,
    algorithms: ['HS256']
});


app.post('/api/login', (req, res) => {

    //const { username, password } = req.body;
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
       console.log("Connected to db");
        namesModel.find()
               .then((data)=>{
                   console.log(data)
                   //namesModel.find({username});
                //    res.json(data);
                //    res.send(data);
                   const { username, password } = req.body;
                   //users=data;
                   for (let user of data) {
                    if (username == user.username && password == user.password) {
                        if(username == user.username && password == user.password) {
                            let token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1m'});
                        // id: user.id, 
                        res.json({
                            success: true,
                            err: null,
                            token
                        });
                        break;
                        }
                        else {
                            res.status(401).json({
                                success: false,
                                token: null,
                                err: 'Username or password is incorrect'
                            });
                        }
                    }
                    
                }
                console.log(req.headers.authorization);
                   mongoose.connection.close();

               })
               .catch((connectionError)=>{
                   console.log(connectionError)
               })
    })
    // get-budget 
    // post-budget
    
    .catch((connectionError)=>{
       console.log(connectionError)
    })

});

app.post('/api/twenty', (req, res) => {
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, data)=>{
            if (err){res.send(err)}
            const decoded = jwt.verify(token, secretKey);
            console.log(decoded.username);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    
    let token = jwt.sign({ username: decoded.username }, secretKey, { expiresIn: '1m'});
                        // id: user.id, 
                        res.json({
                            success: true,
                            err: null,
                            token
                        });

                
        }); 
    } else {
        res.sendStatus(403).send("Error 403")
    }

});

function server()
{
    return secretKey;
}
module.exports = server;

app.get('/api/signedup', (req, res) => {

    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
   console.log("Connected to db");
    namesModel.find()
           .then((data)=>{
               console.log(data)
               //namesModel.find({username});
               res.json(data);
               res.send(data)
               mongoose.connection.close();
           })
           .catch((connectionError)=>{
               console.log(connectionError)
           })
})

.catch((connectionError)=>{
   console.log(connectionError)
})
});

app.get('/api/configureData', (req, res) => {
    //const token = req.cookies.jwt;
    //console.log(token);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
   console.log("Connected to db");
   configureModel.find()
           .then((data)=>{
               console.log(data)
               //namesModel.find({username});
               res.json(data);
               res.send(data)
               mongoose.connection.close();
           })
           .catch((connectionError)=>{
               console.log(connectionError)
           })
})

.catch((connectionError)=>{
   console.log(connectionError)
})
});

app.get('/api/expenseData', (req, res) => {
    //const token = req.cookies.jwt;
    //console.log(token);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
   console.log("Connected to db");
   expenseModel.find()
           .then((data)=>{
               console.log(data)
               //namesModel.find({username});
               res.json(data);
               res.send(data)
               mongoose.connection.close();
           })
           .catch((connectionError)=>{
               console.log(connectionError)
           })
})

.catch((connectionError)=>{
   console.log(connectionError)
})
});

app.post('/api/signup', (req, res) => {
    // TODO: Insert data 
    // id, title, color {id: req.body.id, budget: req.body.title }
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    console.log(req.body.username);
    const newData = new namesModel({
        username: req.body.username,
        password: req.body.password,
    });
    namesModel.insertMany(newData)
    .then((data)=>{
        console.log(data)
        res.send(data)
        mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
    
});

app.post('/api/configure', (req, res) => {
    // extract the token from the header 
    // token verification jwt.verify() (Decode)
    // extract the username from the verified token 
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, data)=>{
            if (err){res.send(err)}
            const decoded = jwt.verify(token, secretKey);
            console.log(decoded.username);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    
    const newData = new configureModel({
        username: decoded.username,
        budgetName: req.body.budgetName,
        budget: req.body.budget,
    });
    configureModel.insertMany(newData)
    .then((data)=>{
        console.log(data)
        res.send(data)
        //window.location.href = 'http://localhost:3000/';
        mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
                
        }); 
    } else {
        res.sendStatus(403).send("Error 403")
    }

});

app.post('/api/expense', (req, res) => {
    // extract the token from the header 
    // token verification jwt.verify() (Decode)
    // extract the username from the verified token 
    console.log(req.headers.authorization);
    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (err, data)=>{
            if (err){res.send(err)}
            //connect to the database 
            // perform 
            const decoded = jwt.verify(token, secretKey);
            console.log(decoded.username);
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    
    const newData = new expenseModel({
        username: decoded.username,
        budgetName: req.body.budgetName,
        budgetSpent: req.body.budgetSpent,
        month: req.body.month
    });
    expenseModel.insertMany(newData)
    .then((data)=>{
        console.log(data)
        res.send(data)
        //window.location.href = 'http://localhost:3000/';
        mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
                
        }); 
    } else {
        res.sendStatus(403).send("Error 403")
    }

});

app.get('/api/settings', jwtMW, (req, res) => {
    res.json({
        success: true,
        myContent: 'Secret content that only logged in people can see.'
    });
});

app.get('/api/dashboard', jwtMW, (req, res) => {
    res.json({
        success: true,
        myContent: 'Secret content that only logged in people can see.'
    });
    console.log(jwtMW);
});

app.get('/api/prices', jwtMW, (req, res) => {
    res.json({
        success: true,
        myContent: 'This is the price $3.99.'
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.use(function (err, req, res, next)   {
      if (err.name === 'UnauthorizedError') {
          res.status(401).json({
              success: false,
              officialError: err,
              err: 'Username or password is incorrect 2'
          });
      }
      else {
          next(err);
      }
  });

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
  });
