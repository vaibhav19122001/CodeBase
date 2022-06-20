const userModel = require("../db/schema");
var bcrypt = require('bcryptjs');

module.exports =async function( Checkuser, callback ){
    try
	{
		const user = await userModel.findOne({email:Checkuser.email});
        if(user===null)
        {
            callback("wrong credentials!!",null);
           return 
        }
        let pass=user.password;
        const passComp=await bcrypt.compare(Checkuser.password,pass);
        if(passComp)
        {
            callback(null,user);
            return
        }
        else
        callback("wrong credentials!!",null);
        return
	}
	catch(err)
	{
		console.log(err)
	}
}