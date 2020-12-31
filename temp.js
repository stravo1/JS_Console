// define a new console
var console=(function(oldCons){
    return {
        log: function(text){
            oldCons.log(text);
            document.getElementById('console').innerHTML+="<- "+text+"<br>"
        },
        info: function (text) {
            oldCons.info(text);
            document.getElementById('console').innerHTML+=text+"<br>"
        },
        warn: function (text) {
            oldCons.warn(text);
            document.getElementById('console').innerHTML+=text+"<br>"
        },
        error: function (text) {
            oldCons.error(text);
            document.getElementById('console').innerHTML+=text+"<br>"
        }
    };
}(window.console));

//Then redefine the old console
window.console = console;


//ObtainTxtOnInputField
function txt() {
    return document.getElementsByClassName("txtinp")[0].value;
}

//adds script, prints to 'console'
const exec = () => {
    document.getElementById('console').innerHTML+="<span id='span'>> "+txt()+"</span><br>"; //prints the input to console

    var newScript = document.createElement('script');
    newScript.setAttribute("class","nwscrpt")
    var inlineScript = document.createTextNode(txt());
    var div = document.getElementById('scrptHere')
    newScript.appendChild(inlineScript);
    div.appendChild(newScript); //adds script
}


document.getElementsByClassName("bttn")[0].addEventListener("click", function(){
   exec(); //click action

})
drk = 0;
const swtch = (arg) => {
    if (arg === 0) {
        document.body.setAttribute('id','bodyd');
        document.getElementById('h1').setAttribute('class','h1 h1d');
        document.getElementById('dark').setAttribute('class','dark darkd');
        document.getElementById('readonly').setAttribute('class','readonly d');
        document.getElementById('txtinp').setAttribute('class','txtinp d');
        document.getElementById('bttn').setAttribute('class','bttn bttnd');
        document.getElementById('console').style.setProperty('color', 'whitesmoke');
        document.getElementById('span').style.setProperty('color','#aec6f5')
        drk = 1;
    } else {
        document.body.setAttribute('id','bodyl');
        document.getElementById('h1').setAttribute('class','h1 h1l');
        document.getElementById('dark').setAttribute('class','dark darkl');
        document.getElementById('readonly').setAttribute('class','readonly l');
        document.getElementById('txtinp').setAttribute('class','txtinp l');
        document.getElementById('bttn').setAttribute('class','bttn bttnl');
        document.getElementById('console').style.setProperty('color', 'black');
        document.getElementById('span').style.setProperty('color','#2a62c9')
        drk = 0;
    }
    
}
document.getElementsByClassName('dark')[0].addEventListener("click", function(){
    swtch(drk)
});