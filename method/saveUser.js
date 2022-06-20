const userModel = require("../db/schema");
var bcrypt = require('bcryptjs');

module.exports =async function( newUser, callback )
{
    try{

        const salt=await bcrypt.genSalt(10);
        const secPassword=await bcrypt.hash(newUser.password,salt);
        const user = new userModel();
      
          user.handle_codeforces = newUser.handle_codeforces;
          user.profile_picture=newUser.profile_picture;
          user.email=newUser.email;
          user.password=secPassword;
          user.badge=[0,0,0,0,0];
          user.max_badge=0;
          user.total_question=300;
          user.save(function(err){
              if(err)
              {
                  if(err.code===11000)
                  {
                      callback("username has been tacken!!");
                  }
                  else
                  {
                      callback("Its seems something is missing!!");
                  }
              }
              else
              {
                  callback(null);         
              }
        });
    }catch(err){
        console.log("err saveUser!!");
    }
}
