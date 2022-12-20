const {validationResult} = require("express-validator");
const bcrypt = require("bcrypt");
const pg = require('pg');

let signUpData = {
    email: null,
    userName: null,
    password: null,
};
const psql = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    post: 5432,
    password: '1997',
    database: 'testdb'
})

psql.connect();

exports.signup = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log('error',errors);
        return res.status(422);
    }
    const data = req.body;
    console.log('req body',data)
    if(data && data?.email && data?.userName && data?.password) {
        signUpData.email = data.email;
        signUpData.userName = data.userName;
        signUpData.password = data.password;
        let isUserAlreadyExist = false;
        psql.query(`select count(*) from user_info where userName = ${signUpData.email}`,(err,res)=>{
            if(err){
                console.log('err',err);
            } else{
                isUserAlreadyExist = true;
            }
        })
        if(!isUserAlreadyExist){
            // signUpData.password = await bcrypt.hash(data.password,10);
            res.status(200).send({
                msg:"OK"
            })
            psql.query(`insert into user_info(email,userName,password) values 
                ('${signUpData.email}','${signUpData.userName}','${signUpData.password}')`,(err,res)=>{
                    if(!err){
                        console.log('succesfully info added');
                        signUpData = {}
                    } else {
                        console.log('database error',err);
                    }
                });
        } else {
            res.status(400).send({
                'err':'User alreay exist'
            });
        }
    } else {
        res.status(400).send({
            error:"Insufficient Information"
        })
    }
}