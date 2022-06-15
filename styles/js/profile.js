let total = {
    easy : 150,
    medium : 150,
    hard : 100
}
let easyTotal=document.getElementById('easyTotal');
let mediumTotal=document.getElementById('mediumTotal');
let hardTotal=document.getElementById('hardTotal');

easyTotal.innerHTML=total.easy;
mediumTotal.innerHTML=total.medium;
hardTotal.innerHTML=total.hard;


const solved={
    easy:5,
    medium:60,
    hard:0
    
}
let totalQUESsolved=solved.easy+solved.medium+solved.hard;
let totalpercent=((totalQUESsolved/(total.easy+total.medium+total.hard))*100).toFixed(1);

document.getElementById("circleBar").style.background =` conic-gradient(#1890FF ${totalpercent}%, rgb(223,223,223) ${totalpercent}%)`;

let totalQUESHTML=document.getElementById('circle');
totalQUESHTML.innerHTML=`<span>${totalQUESsolved}</span><p>solved</p>`;
;


totalQUESHTML.addEventListener("mouseover", mouseOver);
totalQUESHTML.addEventListener("mouseout", mouseOut);

function mouseOver() {
    totalQUESHTML.innerHTML=`<span>${totalpercent}%</span><p>solved</p>`;

}

function mouseOut() {
    totalQUESHTML.innerHTML=`<span>${totalQUESsolved}</span><p>solved</p>`;

}



let easysolved=document.getElementById('easysolved');
let mediumsolved=document.getElementById('mediumsolved');
let hardsolved=document.getElementById('hardsolved');

easysolved.innerHTML=solved.easy;
mediumsolved.innerHTML=solved.medium;
hardsolved.innerHTML=solved.hard;


//easydone and easypercent are same. easydone in html and css. And easypercent in js

function percent(rem,sum){
    return rem*100/sum;
}

var easypercent=percent(solved.easy, total.easy);
var mediumpercent=percent(solved.medium, total.medium);
var hardpercent=percent(solved.hard, total.hard);

let easydone=document.getElementById('easydone');
let mediumdone=document.getElementById('mediumdone');
let harddone=document.getElementById('harddone');

easydone.style.width=`${easypercent}%`;
mediumdone.style.width=`${mediumpercent}%`
harddone.style.width=`${hardpercent}%`





let questionArea=document.querySelector('#questionArea');
let page=0;
 let prevques=document.getElementById('prevques');
 let nextques=document.getElementById('nextques');
let arrayList=
    [
        "Item1",
        "Item2",
        "Item3",
        "Item4",
        "Item5",
        "Item6",
        "Item7",
        "Item8",
        "Item9",
        "Item10",
        "Item11",
        "Item12",
        "Item13",
        "Item14",
        "Item15",
        "Item16",
        "Item17",
        "Item18",
        "Item19",
        "Item20",
        "Item21",
        "Item22"
      
       
    ];
    
 
  
    let q=0;
    appendQuestions(q);

    nextques.addEventListener('click', f);

function f(){

    prevques.addEventListener('click',p);
    prevques.style.backgroundColor = "white";
    appendQuestions(q);
}

function p(){

    nextques.addEventListener('click', f);
    nextques.style.backgroundColor = "white";
    let a = q%10;
    if(a==0) a=10;
    q -= (10+a);

    appendQuestions(q);
}


function appendQuestions(page){

    questionArea.innerHTML = "";
    let n = page+10;
    for(let i=page;(i<n) && (i<arrayList.length);i++){

        let quest = document.createElement('div'); 
        quest.setAttribute('class','ques');
        quest.innerHTML = `<h3>${arrayList[i]}</h3>`
        questionArea.appendChild(quest);
        q++;

        if(q==arrayList.length-1){
            nextques.removeEventListener('click',f);
            // nextques.style.backgroundColor='#777777';
            nextques.style.backgroundColor='#777777';
            prevques.style.backgroundColor='#1890FF';
        }
        if(q<10){
            prevques.removeEventListener('click', p);
            prevques.style.backgroundColor="#777777";
            nextques.style.backgroundColor="#1890FF";

        }
        if( q<arrayList.length-1 && q>10){
          
            prevques.style.backgroundColor="#1890FF";
            nextques.style.backgroundColor="#1890FF";

        }
    }
}


if(totalQUESsolved>=65 && totalQUESsolved<130){
document.getElementById('Badge1').style.opacity="1";
}

 else if(totalQUESsolved>=130 && totalQUESsolved<195){
  document.getElementById('Badge1').style.opacity="1";
document.getElementById('Badge2').style.opacity="1";
}
else if(totalQUESsolved>=195 && totalQUESsolved<260){
  document.getElementById('Badge1').style.opacity="1";
document.getElementById('Badge2').style.opacity="1";
document.getElementById('Badge3').style.opacity="1";
}
else if(totalQUESsolved>=260 && totalQUESsolved<325){
  document.getElementById('Badge1').style.opacity="1";
document.getElementById('Badge2').style.opacity="1";
document.getElementById('Badge3').style.opacity="1";
document.getElementById('Badge4').style.opacity="1";
}
else if(totalQUESsolved>=325){
  document.getElementById('Badge1').style.opacity="1";
document.getElementById('Badge2').style.opacity="1";
document.getElementById('Badge3').style.opacity="1";
document.getElementById('Badge4').style.opacity="1";
document.getElementById('Badge5').style.opacity="1";
}

var xValues = [0,10,20,30,40,50];
var yValues = [2,3,1,2,5,4];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: true,
      lineTension: 0,
      backgroundColor: "rgb(85, 187, 241)",
      borderColor: "rgb(85, 187, 241)",
      data: yValues
    
    }]
  },
  options: {
    legend: {display: false},
    
    scales: {

      yAxes: [{ticks: {min: 0, max:6, fontSize: 16, fontStyle: '700',fontColor: '#000',
     
    }}],
      xAxes: [{ticks: {fontSize: 16, fontStyle: '700',fontColor: '#000'}}]
    }
  }
});

const myChart=document.getElementById('myChart');
console.log(myChart);

// scales: {
//     yAxes: [{ticks: {fontSize: 12, fontFamily: "'Roboto', sans-serif", fontColor: '#000', fontStyle: '500'}}],
//     xAxes: [{ticks: {fontSize: 12, fontFamily: "'Roboto', sans-serif", fontColor: '#000', fontStyle: '500'}}]
//     }








   

