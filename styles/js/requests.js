window.addEventListener('load',()=>{
    const data = document.getElementById('loadingImage');
    data.style.display = 'none';
});
const Hover1 = (target) =>{
    const data = document.getElementsByClassName(target);
    for(let i = 0; i < data.length; i++){
        data[i].style.boxShadow = '3px 3px 3px gray';
    }
}
const Hover2 = (target) =>{
    const data = document.getElementsByClassName(target);
    for(let i = 0; i < data.length; i++){
        data[i].style.boxShadow = '0px 0px 0px white';
    }
}
const getContent = (Name,Topic) =>{
    Name = Name.toLowerCase();
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("Content").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", `/changeContent/?name=${Name}&topic=${Topic}`, true);
    xhttp.send();
}
const getUser = () =>{
    Name = document.getElementById('handle').value;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("UserProfilePhoto").innerHTML = xhttp.responseText;
        }
    };
    xhttp.open("GET", `/getUser/?name=${Name}`, true);
    xhttp.send();
}