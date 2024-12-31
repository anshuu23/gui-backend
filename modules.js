const {mysqlCon, checkUser} = require('./mysql')


mysqlCon('select * from abc',(res)=>{
    console.log(res)
})
