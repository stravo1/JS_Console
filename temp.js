
// define a new console
var consolen=(function(oldCons){ //*n
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
           undefined
         },
         info: (text) => {
           oldCons.info(text);
         }
       }
    };
}(window.console));

//Then redefine the old console
window.console = consolen;


drk = 0; // initially in day mode

//ObtainTxtOnInputField
function txt() {
    return document.getElementsByClassName("txtinp")[0].value;
}
// Get the header
var header = document.getElementById("header");

// Get the offset position of the navbar
var sticky = header.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function headerFixed() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}



const automate0 = (arg) => { //add spans with color depending upon drk state (was a bug)
    var color = ['#2a62c9','#aec6f5']
    document.getElementById('console').innerHTML+="<span style='color : "+color[arg]+"'>> "+txt()+"</span><br>";
}


//automate changing the classes to 'l' or 'd'
const automate1 = (arg) => {
    var id = ['h1','dark','readonly','txtinp','bttn','info'];
    var state = ['l','d'];
    for (let i = 0; i < id.length; i++) {
            document.getElementById(id[i]).setAttribute('class',id[i]+" "+state[arg===0 ? 1 : 0]);
        }
}
const automate2 = (arg) => {
    var state = [['whitesmoke','#aec6f5'],['black','#2a62c9']];

    document.getElementById('console').style.setProperty('color',state[arg][0]);
    document.body.setAttribute('id','body'+ (arg===0 ? 'd':'l'));

    var id = document.getElementsByTagName('span')
    for (var i = 0; i < id.length; i++){
        id[i].style.setProperty('color',state[arg][1])
    }
}

//adds script, prints to 'console'
const scrpt_exec = () => {
    //window.consolen = console;
   automate0(drk); //prints the input to console
   //dynamically adding span doesnt effect if attributes rare changed later COS YOU WERE FXCKING USIND 1ID FORALL SPANS
    var newScript = document.createElement('script');
    newScript.setAttribute("class","nwscrpt");
    var inlineScript = document.createTextNode(txt());
    var div = document.getElementById('scrptHere');
    newScript.appendChild(inlineScript);
    div.appendChild(newScript); //adds script
}



const cnsole_final = () => { //exec bttn click action
    try {
        window.console = consolen.old;
        let tmp = eval(txt()) ; //for args ;ike just  the name of a var or '2+3' etc
        //eval has to be used bwith old console.log()
        window.console = consolen;
        if (tmp == undefined) {
            scrpt_exec();
        } else {
            automate0(drk)
            console.log(tmp)
        }
    } catch(err) {
        window.console = consolen;
        automate0(drk)
        console.log(err);
    }
        document.getElementById('txtinp').value= ""; //clear the cmnd line after each exec
}
//dark mode switch click func.
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
const info = () => {
  document.getElementById('about').style.setProperty("height",'25%')
  document.getElementById('about').style.setProperty('width','25%')
}


//ALL ACTIONS:

document.getElementsByClassName('dark')[0].addEventListener("click", function(){
    swtch(drk)
});
document.getElementsByClassName("bttn")[0].addEventListener("click", function(){
    cnsole_final()
})
document.getElementsByClassName("txtinp")[0].addEventListener("keyup", function(event) { //foe Enter Button
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementsByClassName("bttn")[0].click();
    }
})
// When the user scrolls the page, execute headerFixed
window.onscroll = () => {headerFixed()};

document.getElementById('info').onclick = info()