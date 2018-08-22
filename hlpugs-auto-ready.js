// ==UserScript==
// @name        HLPugs auto-ready
// @description auto-ready for hlpugs
// @include     https://*.hlpugs.tf/
// @grant       GM_addStyle
// @author      shotaway
// ==/UserScript==

const INTERVAL_SECONDS = 15;  //time between checking the auto-ready button. as long as this is less than the time given to ready-up, you will always hit it (checks again right before it times out)
const TIMEOUT_SECONDS = 1200; //seconds before auto-ready times out


/*
* Create a button that toggles on and off for each click. The button starts in the off setting. When we click it, count down the amount of seconds set by TIMEOUT_SECONDS.
* The button displays the time left. Every INTERVAL_SECONDS the button will attempt to click the ready up button. If there is no ready up button then nothing happens, so no
* check is necessary. After the time is up or the button is clicked again, there will be one last ready up click then the countdown will kill and the button will turn off.
*/

/*--- Create a button in a container div.  It will be styled and
    positioned with CSS. (credit to some guy on stackexchange for this)
*/
console.log("button loaded");
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="readyButtonOff" type="button">'
    + 'Auto-ready off</button>';
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

var readyBtn = document.getElementById("readyButtonOff");                         //getting a variable for the button. I think this is redundant but I'm just keeping it.

//--- Activate the newly added button.
readyBtn.addEventListener (                                                       //the first button action is to turn on
    "click", readyBtnClickOn, false
);

var timeout;                                                                      //setting up vars
var interval;                                                                     //I have to initialize interval up here
var seconds = 0;                                                                  //temp storage for time left

function readyBtnClickOn(zEvent) {                                                //when we want to turn the button on
    readyBtn.setAttribute('id', 'readyButtonOn');                                 //set id to on
    seconds = TIMEOUT_SECONDS;                                                    //reset seconds
    readyBtn.innerHTML = "Auto-ready ACTIVE [" + seconds + "s]";                  //styling
    interval = setInterval(function() {                                           //count down every second
        if (seconds != 0) {                                                       //if time has not run out
            if (seconds % INTERVAL_SECONDS == 0)                                  //after every INTERVAL_SECONDS we hit the ready up button
            {
                $('#readyButton').click();                                        //hit the ready up button
                console.log("ready-up checked");                                  //log it in console
            }
            seconds--;                                                            //count down a second
            readyBtn.innerHTML = "Auto-ready ACTIVE [" + seconds + "s]";          //styling
        }
        else                                                                      //if time has run out
        {
            $('#readyButton').click();                                            //last ready-up check
            clearInterval(interval);                                              //kill the countdown
            readyBtnClickOff();                                                   //turn the button off
        }
    } , 1000);                                                                    //interval every 1 second

    console.log("button active");                                                 //log that the button is on
    readyBtn.removeEventListener("click", readyBtnClickOn);                       //stop the button from turning on next time
    readyBtn.addEventListener("click", readyBtnClickOff, false);                  //make the button turn off next time
}

function readyBtnClickOff(zEvent) {                                               //when we want to turn the button off
    readyBtn.setAttribute('id', 'readyButtonOff');                                //set id to off
    readyBtn.innerHTML = "Auto-ready off";                                        //styling

    window.clearInterval(interval);                                               //kill the countdown

    console.log("button inactive");                                               //log in console that the button is off
    readyBtn.removeEventListener("click", readyBtnClickOff);                      //stop the button from turning off next time
    readyBtn.addEventListener("click", readyBtnClickOn, false);                   //make the button turn on next time
}

//--credit to some guy on stackexchange from here down--
//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              50px;
        border:                 0px;
        margin:                 5px;
        opacity:                1;
        z-index:                1100;
        background:             #03a9f4;
        color:                  #03a9f4;
    }
    #readyButtonOff {
        cursor:                 pointer;
        color:                  white;
        background:             red;
        font-size:              25px
    }
    #readyButtonOn{
        cursor:                 pointer;
        color:                  white;
        background:             green;
        font-size:              25px
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
        .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
        .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
    ;
    return str;
}
