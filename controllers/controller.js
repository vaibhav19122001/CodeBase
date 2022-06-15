require('dotenv').config();
const {QuestionSet} = require('../styles/js/questions');
const {Button} = require('../styles/js/buttons');
const {Types} = require('../styles/js/types');
const {getInfo} = require('../styles/js/apiCall');
const getUser = async(req,res)=>{
    try{
        const data = await getInfo(process.env.CFKEY,process.env.CFSEC,req.query.name);
        return res.status(200).send(`<img src=${data[0].titlePhoto}>`);
    }catch(err){
        return res.status(200).send('<img src="/images/notfound.png"/>');
    }
}
const getQuestions = (Name,type) =>{
    const questionSet = QuestionSet[Name][type];
    const question = [];
    for(let keys of Object.keys(questionSet)){
        question.push({name:questionSet[keys].name,link:questionSet[keys].link});
    }return question;
};
const login = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'login'
    });
}
const signup = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'signup'
    });
}
const forgot = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'forgot'
    });
}
const topic = (req,res)=>{
    const button = Button[req.query.name] === undefined ? ['Fundamentals']:Button[req.query.name];
    let firstType = button[0];
    firstType = firstType.toLowerCase();
    const question = getQuestions(req.query.name,firstType);
    const smallbutton = [];
    for(let keys of button){
        smallbutton.push(Types[keys.toLowerCase()]);
    }return res.status(200).render('for',{
        topic : QuestionSet[req.query.name].topic,
        buttons : button,
        questions : question,
        request : req.query.name,
        page : 'renderQuestions',
        symbol : Types[firstType],
        smallbuttons : smallbutton
    });
}
const home = (req,res)=>{
    const topics = [];
    for(let keys of Object.keys(QuestionSet)){
        topics.push({topic : QuestionSet[keys].topic,request : keys});
    }return res.status(200).render('index',{
        questions : topics
    });
}
const leaderboard = (req,res)=>{
    return res.status(200).render('leaderboard');
}
const profile = (req,res)=>{
    return res.status(200).render('profile');
}
const handle = (req,res)=>{
    return res.status(200).render('enter',{
        page : 'handle'
    });
}
const changeContent = (req,res)=>{
    const name = req.query.name;
    const topic = req.query.topic;
    const question = getQuestions(topic,name);
    return res.status(200).render('renderQuestions',{
        questions : question,
        symbol : Types[name]
    });
}
module.exports = {login,signup,forgot,topic,home,changeContent,leaderboard,profile,handle,getUser};