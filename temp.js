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
    return document.getElementById("txtinp").value;
}

//adds script, prints to 'console'
const exec = () => {
    document.getElementById('console').innerHTML+="<font color= rgb(118, 120, 252)>> "+txt()+"</font><br>"; //prints the input to console

    var newScript = document.createElement('script');
    newScript.setAttribute("class","nwscrpt")
    var inlineScript = document.createTextNode(txt());
    var div = document.getElementById('scrptHere')
    newScript.appendChild(inlineScript);
    div.appendChild(newScript); //adds script
}


document.getElementById("bttn").addEventListener("click", function(){
   exec(); //click action

})

const swtch = (arg) => {
    if (arg === 0) {
        document.body.style.backgroundColor="#202020"
        document.getElementById('h1').style.color="#e3e2fff7"
        document.getElementById('dark').style.backgroundImage="url('https://www.flaticon.com/svg/static/icons/svg/880/880991.svg')"
    } else {
        console.log(100)
    }
    
}
document.getElementById('dark').addEventListener("click", function(){
    swtch()
});