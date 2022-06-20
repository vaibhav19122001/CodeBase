const userModel = require("../db/schema");

module.exports =async function( Checkuser, callback){
    try
	{
		const user = await userModel.findOne({email:Checkuser.email});
        if(user===null)
        {
           callback(1);
        }
        else{
            callback(0,user.handle_codeforces);
        }
        return;
	}
	catch(err)
	{
        callback(2);
		console.log(err)
	}
}