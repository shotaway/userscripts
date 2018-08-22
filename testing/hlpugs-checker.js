// ==UserScript==
// @name        HLPugs checker
// @description auto-ready for hlpugs
// @include     https://*.hlpugs.tf/
// @grant       GM_addStyle
// @author      shotaway
// ==/UserScript==

//lists not static -- updates in real time as players add/remove
var scouts = document.getElementById(“scoutList”).getElementsByClassName(“player”);
var soldiers = document.getElementById(“soldierList”).getElementsByClassName(“player”);
var pyros = document.getElementById(“pyroList”).getElementsByClassName(“player”);
var demos = document.getElementById(“demomanList”).getElementsByClassName(“player”);
var heavies = document.getElementById(“heavyList”).getElementsByClassName(“player”);
var engies = document.getElementById(“engineerList”).getElementsByClassName(“player”);
var medics = document.getElementById(“medicList”).getElementsByClassName(“player”);
var snipers = document.getElementById(“sniperList”).getElementsByClassName(“player”);
var spies = document.getElementById(“spyList”).getElementsByClassName(“player”);

//steam IDs of players added to each class
var scoutID = [];
var soldierID = [];
var pyroID = [];
var demoID = [];
var heavyID = [];
var engieID = [];
var medicID = [];
var sniperID = [];
var spyID = [];

var intervalLog = setInterval(function() {
    updatePlayers();
    } , 10000);


//update steamID lists
function updatePlayers() {
    console.log(“updating players!”);
    var i = 0;
    var breakCond = 0;
    //probably the most time-efficient way to grab all steam IDs; probably inaccurate if ppl add/leave while in this block
    while(breakCond != -9) {
        breakCond = 0;
        if (i < scouts.length) { scoutID[i] = scouts[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < soldiers.length) { soldierID[i] = soldiers[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < pyros.length) { pyroID[i] = pyros[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < demos.length) { demoID[i] = demos[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < heavies.length) { heavyID[i] = heavies[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < engies.length) { engieID[i] = engies[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < medics.length) { medicID[i] = medics[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < snipers.length) { sniperID[i] = snipers[i].getAttribute(“data-steamid”); } else { breakCond--; }
        if (i < spies.length) { spyID[i] = spies[i].getAttribute(“data-steamid”); } else { breakCond--; }
        i++;
    }
}
