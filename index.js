const express = require('express')
const cors = require('cors')
const {mysqlCon} = require ('./mysql')
const {mysqlConn} = require ('./postgre')
const {checkAndCreateUser} = require('./modules')
const {checkUser} = require('./mysql')
const {ai} = require('./ai')


const app = express();
app.use(express.json());
app.use(cors())



app.post('/', (req,res)=>{
    console.log(req.body)
    checkUser(req.body.email, req.body.password,(ress)=>{
 
        console.log(ress)
        if(ress.length>0){
            res.send({res:'no'})
           
            
        }
        else{
           
            mysqlCon(`INSERT INTO abc (email, password) VALUES ('${req.body.email}', '${req.body.password}');`,()=>{
                res.send({res:'yes'})
            })
        }
      })
    
})

app.post('/sql',(req,res)=>{
    mysqlCon(req.body.querry,(ress)=>{
        const dataToAI = {sqlQuerry:req.body.querry , responseFromDatabase:ress }
        aiAns = ai(dataToAI,(aiRes)=>{
            res.send({ai:aiRes , db:ress})
        })
    })
})
app.post('/postgre',(req,res)=>{
    mysqlConn(req.body.querry,(ress)=>{
        const dataToAI = {sqlQuerry:req.body.querry , responseFromDatabase:ress }
        aiAns = ai(dataToAI,(aiRes)=>{
            res.send({ai:aiRes , db:ress})
        })
    })
})
app.post('/login', (req,res)=>{
    console.log(req.body)
    checkUser(req.body.email, req.body.password,(ress)=>{
 
        console.log(ress)
        if(ress.length>0){
            res.send({res:'yes'})
        
        }
        else{
            res.send({res:'no'})
        }
      })
    
})

app.listen(4000,()=>{
    console.log('server is running')
})
