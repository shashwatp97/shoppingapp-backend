const express = require("express");
const bcrypt = require("bcrypt");
// const psql = require('pg');
const pg = require('pg');
const router = express.Router();

let signUpData = {
    email: null,
    userName: null,
    password: null,
};
const connect = "postgres://postgres:1997@localhost/testdb";

const psql = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    post: 5432,
    password: '1997',
    database: 'testdb'
})

psql.connect();

router.post('/signup',async(req,res) => {
    const data = req.body;
    if(data && data?.email && data?.userName && data?.password) {
        signUpData.email = data.email;
        signUpData.userName = data.userName;
        psql.query(`select *`)
        signUpData.password = await bcrypt.hash(data.password,10);
        console.log('data',signUpData)
        res.status(200).send({
            msg:"OK"
        })
        psql.query(`select * from user_info`,(err,res)=>{
            if(res){
                console.log('dbres',res.rows);
            } else {
                console.log('dberr',err);
            }
        })
    } else {
        res.status(400).send({
            error:"Insufficient Information"
        })
    }
})


module.exports = router;