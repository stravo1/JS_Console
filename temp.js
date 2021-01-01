
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
        },
       old: {
         log: (text) => {
           oldCons.log(text);
         },
         info: (text) => {
           oldCons.info(text);
         }
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
const scrpt_exec = () => {
   document.getElementById('console').innerHTML+="<span class='span'>> "+txt()+"</span><br>"; //prints the input to console
   //dynamically adding span doesnt effect if attributes rare changed later COS YOU WERE FXCKING USIND 1ID FORALL SPANS
    var newScript = document.createElement('script');
    newScript.setAttribute("class","nwscrpt");
    var inlineScript = document.createTextNode(txt());
    var div = document.getElementById('scrptHere');
    newScript.appendChild(inlineScript);
    div.appendChild(newScript); //adds script
}
const cnsole_final = () => { //click action
    try {
        //window.console = console.old;
        let tmp = eval(txt()) ; //for args ;ike just  the name of a var or '2+3' etc
        //eval has to be used bwith old console.log()
        window.console = console;
        if (tmp == undefined) {
            scrpt_exec();
        } else {
            document.getElementById('console').innerHTML+="<span class='span'>> "+txt()+"</span><br>";
            console.log(tmp)
        }
    } catch(err) {
        document.getElementById('console').innerHTML+="<span class='span'>> "+txt()+"</span><br>";
        console.log(err);
    }
        document.getElementById('txtinp').value= ""; //clear the cmnd line
}

document.getElementsByClassName("bttn")[0].addEventListener("click", function(){
    cnsole_final()
})
document.getElementsByClassName("txtinp")[0].addEventListener("keyup", function(event) { //foe Enter Button
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementsByClassName("bttn")[0].click();
    }
})
drk = 0; // initially in day mode
const automate1 = (arg) => {
    var id = ['h1','dark','readonly','txtinp','bttn'];
    var state = ['l','d'];
    for (let i = 0; i < id.length; i++) {
            document.getElementById(id[i]).setAttribute('class',id[i]+" "+state[arg===0 ? 1 : 0]);
        }
}
const automate2 = (arg) => {
    var id = ['console',]
    var state = [['whitesmoke','#aec6f5'],['black','#2a62c9']];
    for (let i = 0; i < id.length; i++){
        document.getElementById(id[i]).style.setProperty('color',state[arg][i]);
        document.body.setAttribute('id','body'+ (arg===0 ? 'd':'l'));
    }
    var id = document.getElementsByTagName('span')
    for (var i = 0; i < id.length; i++){
        id[i].style.setProperty('color',state[arg][1])
    }
}
const swtch = (arg) => {
    if (arg === 0) {
        automate1(arg);
        automate2(arg);
        drk = 1;
    } else {
        automate1(arg);
        automate2(arg);
        drk = 0;
    }
    
}
document.getElementsByClassName('dark')[0].addEventListener("click", function(){
    swtch(drk)
});