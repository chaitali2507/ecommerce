var admin_login= require('../adminmodel/login_model');
var jwt = require('jsonwebtoken');



exports.insert = async (req,res) =>{
     var data= await admin_login.create(req.body);
     res.status(200).json({
        status:"data insert",
        data
     })
}
exports.get_data = async (req,res) =>{
    var data= await admin_login.find();
    res.status(200).json({
       status:"data select",
       data
    })
}


exports.login=async (req,res)=>{
    var data= await admin_login.find({"email":req.body.email});

    if(data.length==1)
    {
        if(data[0].password==req.body.password)
        {
            var token = jwt.sign({id:data[0].id},"cdmi");
            res.status(200).json({
                status:"login success",
                token
            })
        }
        else{
            res.status(200).json({
                status:"check your email and password",
            })
        }
    }
    else{
        res.status(200).json({
            status:"check your email and password",
        })
    }
   
}

