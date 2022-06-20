const userModel = require("../db/schema");

module.exports =async function( email, callback){
    try
	{
		const user = await userModel.findOne({email});
        if(user===null)
        {
           callback(1,null);
        }
        else{
            callback(0,user);
        }
        return;
	}
	catch(err)
	{
        callback(2,null);
		console.log(err)
	}
}