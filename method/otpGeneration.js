const { v4: uuidv4 } = require('uuid');
module.exports=otpGen=()=>{
    let otp=uuidv4().split('-');
   return otp[0];
}
