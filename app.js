const express = require("express");
const routes = require("./routes/authRoutes");
// const pg = require('pg');

const app = express();
const PORT = 8080;


// const psql = new pg.Client({
//     host: 'localhost',
//     user: 'postgres',
//     post: 5432,
//     password: '1997',
//     database: 'testdb'
// })

// psql.connect();

// psql.query(`select * from user_info`,(err,res)=>{
//     if(res){
//         console.log('dbres',res);
//     } else {
//         console.log('dberr',err);
//     }
// })
app.use(express.urlencoded({extended: true}))
app.use('/api/v1',routes);
app.listen(PORT,(req,res)=>{
    console.log('Server running....');
})