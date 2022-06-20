require('dotenv').config();
const mailjet = require ('node-mailjet').apiConnect(`${process.env.emailKey}`, `${process.env.emailSecKey}`)
module.exports=async (userInfo,callback) => {
    console.log("mail");
    //console.log(userInfo);
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
    "Messages":[
        {
        "From": {
            "Email": "code4cosmoscb@gmail.com",
            "Name": "Code4"
        },
        "To": [
            {
            "Email": `${userInfo.email}`,
            "Name":   `${userInfo.name}`
            }
        ],
        "Subject": "Greetings from codebase.",
        "TextPart": `${userInfo.text}`,
        "HTMLPart": `<h3>Dear coder ${userInfo.name}, welcome to codebase by code4cosmos!</h3><br />
                    <h4>${userInfo.text}</h4>
                    May the force be with you!`
        }
    ]
    })
    request
    .then((result) => {
        //console.log(result.body)    
    })
    .catch((err) => {
        console.log(err.statusCode)
    })
    callback("mailSent!!");
}