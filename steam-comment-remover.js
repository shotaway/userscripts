// ==UserScript==
// @name         steam comment removal service
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  checks for comments on page 1, if none -> page++, if comments found, deletes most recent one and refreshes every 50ms. keep page open in background. finishes at last page and alerts user.
// @author       You
// @match        https://steamcommunity.com/id/*/*
// @grant        none
// ==/UserScript==

/*
* We load the expanded allcomments page and turn on the script. On every page except the first, the url contains "/allcomments?ctp=" + pagenumber.
* So, if that string doesnt exist then we are on the first page, and we can grab the page number very easily after that. I can't get the script to
* delete multiple comments without refreshing the page, so we recursively delete the first deletable comment and refresh the page. As a result, it's
* very slow, but it is automated and will alert you when finished. I think this will delete every comment if you use it on your own page.
*/

(function() {
    'use strict';
    console.log("test loaded.");

    let test = document.getElementsByClassName("actionlink");                     //get deletable comments
    var profileID = "trapster_";                                                  //change to their steamID (url)
    var page = 1;                                                                 //set page to 1 (no touchy touchy)
    var finished = false;                                                         //dont touch this unless u want to break it lol
                                                                                  //if page is not 1 (page 1 doesnt show in url) then grab page number from url
    if (window.location.toString().indexOf("=") != -1) page = window.location.toString().substr(window.location.toString().indexOf("=") + 1, window.location.toString().length);
    var url = "http://steamcommunity.com/id/" + profileID + "/allcomments?ctp=";  //set url string without page number
    if (test.length != 0){                                                        //if there are comments
        var temp = "";                                                            //setting up the command to delete the comment
        temp = test[0].href.substr(test[0].href.indexOf(":") + 1, test[0].href.length - 1); //this is the command to delete the comment
        console.log(temp);                                                        //log whats going into the eval
        eval(temp);                                                               //delete the comment
    }
    else                                                                          //if no comments left on this page
    {                                                                             //if there are more pages left
        if (document.getElementsByClassName("commentthread_pagelink")[document.getElementsByClassName("commentthread_pagelink").length-1].innerHTML != page)
        {
            page++;                                                               //increment page tracker
        }
        else                                                                      //if no pages left
        {
            console.log("finished!");
            alert("comments removed!");
            finished = true;                                                      //we are done
        }
    }                                                                             //reload the page
    if (!finished) var delay = setTimeout(function() { window.location = url + page; }, 50);
})();
