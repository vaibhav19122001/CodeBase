const userModel = require("../db/schema");
var bcrypt = require('bcryptjs');

module.exports =async function( user, callback )
{
    try{
        console.log("passChange method");
        console.log(user);
        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(user.password,salt);
        const result=await userModel.updateOne({email:user.email},{
            $set:{
                password:secPassword
            }
        });
        callback("Password changed!!");        
    }catch(err){
        callback("please try again!!");
    }
   
}