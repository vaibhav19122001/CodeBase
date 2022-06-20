require('dotenv').config();
const {getInfo} = require('../styles/js/apiCall');
const checkUser=require('../method/checkUser');
const genOtp=require('../method/otpGeneration');
const email=require('../method/email');
const saveUser=require('../method/saveUser');
const passLoginCheck=require('../method/passwordLoginCheck');
const changePass=require('../method/changePasswordDb');
const getUserDb = require('../method/getUserDb');
const loginGet = (req,res)=>{
    console.log((req.session.user===undefined));
    return res.status(200).render('enter',{
        page : 'login'
    });
}
const loginPost = (req,res)=>{
    let user={email:req.body.email,password:req.body.password};
    //callback will return msg if worng credentails are entered
    //else null with user data
    passLoginCheck(user,(msg,user)=>{
        if(!msg){
            req.session.is_logged_in = true;
            let userSession={
                handle_codeforces:user.handle_codeforces,
                profile_picture:user.profile_picture,
                email:user.email
            }
            req.session.user=userSession;
            console.log("successful log in");
            console.log(req.session);
            res.redirect('/home');
        }else{
            //render login page with msg that user has entered wornd credentails
            return res.status(200).render('enter',{
                page : 'login'
            });
        }

    })
}
const signupGet = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'signup'
    });
}
const signupPost = (req,res)=>{
    let user={email:req.body.email,password:req.body.password};
    checkUser(user,(uniqueUser)=>{
        //unique user 1:unique user, 0:user already exist
        // 2:mongodb fetching error
        if(uniqueUser==1){
            req.session.is_logged_in = false;
            req.session.signUp=true;
            req.session.user = user;
            return res.status(200).redirect("/handle");
        }else if(uniqueUser==0){
            //send warning to frontend about user already exist
            return res.status(200).render('enter',{
                page : 'signup'
            });
        }else{
            //send warning to frontend about please try again
            return res.status(200).render('enter',{
                page : 'signup'
            });
        }
    });
    
}
const forgotGet = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'forgot'
    });
}
const forgotPost = (req,res)=>{
    let user={email:req.body.email};
    checkUser(user,(isExist,name)=>{
        console.log("forgotpassPost");
        console.log(isExist,name);
        if(isExist==0){
            let otp=genOtp();
            user.name=name;
            user.text=`otp for password reset is ${otp}`;
            email(user,(stats)=>{
                console.log(stats);
                if(stats){
                    req.session.otp=otp;
                    req.session.signUp=false;
                    req.session.user={
                        email:user.email,
                        name:user.name
                    };
                    req.session.cookie.maxAge=5*60*1000;
                    req.session.limit=0;
                    console.log("statsForgotPass");
                    console.log(req.session);
                    return res.status(200).redirect("/otp");     
                }else{
                    //warning msg to user for try again
                    return res.status(200).render('enter',{
                        page : 'forgot'
                    });
                }
            });            
        }else{
            //send warning no user exist with this username
            return res.status(200).render('enter',{
                page : 'forgot'
            });
        }
    });
}
const handleGet = (req,res)=>{
    console.log("handleGet");
    return res.status(200).render('enter',{
        page : 'handle'
    });
}

const handlePost =async (req,res)=>{
    let handle=req.body.handle;
    let profile_link="";
    try{
        const data = await getInfo(process.env.CFKEY,process.env.CFSEC,handle);
        //if user not exist send warning to frontend
        if(!data)
            return res.status(200).render('enter',{
                page : 'handle'
            });
        profile_link=data[0].titlePhoto;
    }catch(err){
        console.log(err);
    }
    req.session.user.handle_codeforces=handle;
    req.session.user.profile_picture=profile_link;
    //verify that handle exists!!
    if(profile_link==""){
        //if not then send warning and redirect to signup page
        return res.status(200).render('enter',{
            page : 'handle'
        });
    }else{
            let otp=genOtp();
            //send otp mail email(name,reciver_mail,text,callback)
            let userInfo={
                name:req.session.user.handle_codeforces,
                email:req.session.user.email,
                text:`welcome user your otp for verification is ${otp}`
            };
            email(userInfo,(stats)=>{
                if(stats){
                    req.session.otp=otp;
                    console.log("stats");
                    console.log(req.session);
                    req.session.limit=0;
                    req.session.handle=true;
                    return res.status(200).redirect("/otp");     
                }else{
                    //warning msg to user for try again
                    return res.status(200).render('enter',{
                        page : 'handle'
                    });   
                }
            });            
        }
    
}
const otpGet = (req,res)=>{
    if(req.session.signUp===undefined){
        return res.status(200).redirect('/forgot');
    }
    return res.status(200).render('enter',{
        page : 'otp'
    });
}
const otpPost = (req,res)=>{
if(req.session.signUp!==undefined){
    let otp=req.session.otp;
    if(otp==req.session.otp){ 
        if(req.session.signUp){  
           let user=req.session.user;
           //msg is null then user is created else somthing is wrong
           saveUser(user,(msg)=>{
               if(!msg){
                   //popup the msg that user has been created
                
                   let loguser={
                    email:req.session.user.email,
                    handle_codeforces:req.session.user.handle_codeforces,
                    profile_picture:req.session.user.profile_picture
                };
                req.session.user=loguser;
                req.session.otp=null;
                req.session.is_logged_in = true;
                req.session.signUp=false;
                req.session.cookie.maxAge=24*60*60*1000;
                req.session.handle=undefined;
                req.session.limit=null;
                   return res.status(200).redirect('/home');
               }else{
                   //warn user somthing went wrong please try again!!
                   console.log("otpSaveUser");
                   console.log(msg);
                   return res.status(200).render('enter',{
                       page : 'signup'
                   });
               }
           });
       }else{

            res.redirect('/changePass');
       }
    }
    else{
        //otp does not match warn user
        return res.status(200).render('enter',{
            page : 'otp'
        });
    }
 }else{
    res.redirect('/forgot');
 }
}
const otpRePost = (req,res)=>{
  if(req.session.limit!==undefined){
    req.session.limit++;
    if(req.session.limit<=3){
        let otp=genOtp();
        //send otp mail email(name,reciver_mail,text,callback)
        let user={
            name:req.session.user.handle_codeforces,
            email:req.session.user.email,
            text:`otp for password reset is ${otp}`
        };
        email(user,(stats)=>{
            if(stats){
                req.session.otp=otp;
                return res.status(200).render('enter',{
                    page : 'otp'
                });
            }

        });
    }else{
        //warming with limit exceded
        return res.status(200).render('enter',{
            page : 'otp'
        });    
    }
  }
  else{
    if(req.session.handle!==undefined){
        req.session.destroy();
        res.redirect('/signup');
    }else
    return res.redirect('/forgot');
  }
}
const changePassGet = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'NewSetup'
    });
}
const changePassPost = (req,res)=>{
    let pass={password:req.body.password1,cpassword:req.body.password2};  
    if(pass.password===pass.cpassword){
        let user={email:req.session.user.email,password:pass.password};
        changePass(user,(msg)=>{
            console.log(msg);
            //getUser db return 0 as sucess and 1,2 as error
            getUserDb(user.email,(isExist,userDb)=>{
                if(isExist==0){
                    let userInfo={
                        handle_codeforces:userDb.handle_codeforces,
                        email:userDb.email,
                        profile_picture:userDb.profile_picture
                    }
                    req.session.user=userInfo;
                    req.session.otp=null;
                    req.session.is_logged_in = true;
                    req.session.signUp=false;
                    req.session.limit=null;
                    return res.status(200).redirect('/home');
                }else{
                    req.session=null;
                    return res.status(200).redirect('/login');        
                }
            });
        });      
    }else{
        //password does'nt match please try again
        return res.status(200).render('enter',{
            page : 'NewSetup'
        });
    }
}
module.exports = {
    loginGet,
    signupGet,
    forgotGet,
    handleGet,
    otpGet,
    changePassGet,
    loginPost,
    signupPost,
    forgotPost,
    handlePost,
    otpPost,
    changePassPost,
    otpRePost
};