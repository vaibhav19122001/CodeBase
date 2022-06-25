require('dotenv').config();
const redis = require('redis');
const REDIS_PORT = process.env.PORT || 6379;
const {QuestionSet} = require('../styles/js/questions');
const {Button} = require('../styles/js/buttons');
const {Types} = require('../styles/js/types');
const {getInfo,getQuestions} = require('../styles/js/apiCall');
const {Colors} = require('../styles/js/colors');
const client = redis.createClient(REDIS_PORT);
client.connect();
const getUserGet = async(req,res)=>{
    try{
        const data = await getInfo(process.env.CFKEY,process.env.CFSEC,req.query.name);
        return res.status(200).send(`<img src=${data[0].titlePhoto}>`);
    }catch(err){
        return res.status(200).send('<img src="/images/notfound.png"/>');
    }
}
const getQuestionsFunc = async(Name,type) =>{
    try{
        let Done;
        if(await client.get("data")){
            const storedCache = await client.get("data");
            Done = JSON.parse(storedCache);
        }else{
            Done = await getQuestions(process.env.CFKEY,process.env.CFSEC,'Errichto')
            client.set("data",JSON.stringify(Done));
        }const questionSet = QuestionSet[Name][type];
        const question = [];
        for(let keys of Object.keys(questionSet)){
            const questionName = questionSet[keys].name;
            const questionLink = questionSet[keys].link;
            if(Done[keys]){
                question.push({name:questionName,link:questionLink,colorProperty:Colors[type]});
            }else{
                question.push({name:questionName,link:questionLink,colorProperty:Colors['unsolved']});
            }
        }return question;
    }catch(err){
        console.log(err);
    }
};

const topicGet = async(req,res)=>{
    const button = Button[req.query.name] === undefined ? ['Fundamentals']:Button[req.query.name];
    let firstType = button[0];
    firstType = firstType.toLowerCase();
    const question = await getQuestionsFunc(req.query.name,firstType);
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
const homeGet = (req,res)=>{
    //console.log(req.session);
    const topics = [];
    for(let keys of Object.keys(QuestionSet)){
        topics.push({topic : QuestionSet[keys].topic,request : keys});
    }return res.status(200).render('index',{
        questions : topics
    });
}
const leaderboardGet = (req,res)=>{
    return res.status(200).render('leaderboard');
}
const profileGet = (req,res)=>{
    return res.status(200).render('profile');
}

const changeContentGet = async(req,res)=>{
    const name = req.query.name;
    const topic = req.query.topic;
    const question = await getQuestionsFunc(topic,name);
    return res.status(200).render('renderQuestions',{
        questions : question,
        symbol : Types[name]
    });
}

module.exports = {
    topicGet,
    homeGet,
    changeContentGet,
    leaderboardGet,
    profileGet,
    getUserGet
};