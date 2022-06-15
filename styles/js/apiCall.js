const Codeforces = require('codeforces-api');
const Set = (key,sec) =>{
    Codeforces.setApis(key,sec);
}
const GetSolvedQuestions = (Name) =>{
    return new Promise((resolve,reject)=>{
        Codeforces.user.status({ handle: Name } , function (err, data) {
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}
const GetInformation = (Name) =>{
    return new Promise((resolve,reject)=>{
        Codeforces.user.info({ handles: Name },(err, data)=>{
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}
const getInfo = async(key,sec,Name) =>{
    Set(key,sec);
    const data = await GetInformation(Name);
    return data;
}
const getQuestions = async(key,sec,Name) =>{
    Set(key,sec);
    const data = await GetSolvedQuestions(Name);
    const obj = {};
    for(let iter of data){
        if(iter.verdict === 'OK'){
            const key = iter.problem.index+iter.problem.name;
            obj[key] = iter.programmingLanguage;
        }
    }return obj;
}
module.exports = {getInfo,getQuestions};