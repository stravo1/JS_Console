var scpt = "<script type='text/plain' style ='display: block'>" //stackoverflow
const objLogger = (arg) => {
  if (String(arg).indexOf('[object HTML') != -1) {
    var out = scpt+arg.outerHTML+"</script>";
    return out;
  }
  var keys = Object.getOwnPropertyNames(arg);
  var out = 'Object {'
  for (var i = 0; i < keys.length; i++) {
    out += keys[i]+":";
    (typeof(arg[keys[i]]) != 'object')&&(typeof(arg[keys[i]]) != 'function') ? out+=JSON.stringify(arg[keys[i]]) : typeof(arg[keys[i]]) == 'function' ? out += '<i>f</i>' : out += '{...}';
      i != keys.length-1 ? out+= ", " : out+=''
  }
  out += "}"
  return out;
} //for console.logs of objects




const automate = (...args) => {
    let outp = ""
    
    for (var j = 0; j < args.length; j++) { //stackovrflw
      if (typeof args[j] == 'object') {
        outp += objLogger(args[j]);
    } else {
      outp += " " + args[j]
    }
    document.getElementById('console').innerHTML+="<- "+outp+"<br>"
    }
}
// define a new console
var consolen=(function(oldCons){ //*n
    return {
        log: function(...text){
            oldCons.log(...text);
            automate(...text)
        },
        info: function(...text){
            oldCons.info(...text);
            automate(...text)
        },
        warn: function(...text){
            oldCons.warn(...text);
            automate(...text)
        },
        error: function(...text){
            oldCons.error(...text);
            automate(...text)
        },
       old: {
         log: (...text) => {
           undefined
         },
         info: (...text) => {
           oldCons.log(...text);
         }
       }
    };
}(window.console));

//Then redefine the old console
window.console = consolen;


drk = 1; // by default dark mode

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
    var id = ['h1','dark','readonly','txtinp','bttn','info','abt','txt','warn','header'];
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
    var newScript = document.createElement('script');
    newScript.setAttribute("class","nwscrpt");
    var inlineScript = document.createTextNode(txt());
    var div = document.getElementById('scrptHere');
    newScript.appendChild(inlineScript);
    div.appendChild(newScript); //adds script
}



const cnsole_final = () => { //exec bttn click action
    automate0(drk); //prints the input to console
    try {
        //window.console = consolen.old;
        consolen.old.info('try')
        let tmp = eval('console.log('+txt()+')') ; //for args ;ike just  the name of a var or '2+3' etc
    } catch(err) {
        if (err.name == 'SyntaxError') {
          consolen.old.info('if')
          scrpt_exec();
        } else {
          consolen.old.info('else')
          console.log(err)
        }
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
var infs = 0; //initial info state
const infoBttn = (inf) => { //some cleanup required
  state= ['35%','0%'];
  if (inf !== 'click') {
      document.getElementById('abt').style.setProperty('opacity','0.8')
      document.getElementsByClassName('abt')[0].style.setProperty('height',state[inf]);
      document.getElementsByClassName('abt')[0].style.setProperty('width',state[inf]);
      document.getElementsByClassName('abt')[0].style.setProperty('padding',inf === 0 ? '2px 10px' : '0px 0px');
      inf === 0 ? infs = 1 : infs = 0;
      document.querySelector('#abt').scrollLeft = 0;
      document.querySelector('#abt').scrollTop = 0;
  } else {
    infs = 0;
    document.getElementById('abt').style.setProperty('opacity','1')
  }
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