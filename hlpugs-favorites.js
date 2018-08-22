// ==UserScript==
// @name         HLPugs Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  helps with hl pugs
// @author       shotaway
// @match        https://*.hlpugs.tf/
// @grant        none
// ==/UserScript==

/*
* Turns the ready-up-for-all-classes button into another add-to-favorites button. Previously, there was no favorites button on hlpugs,
* but now this adds a second favorites setting. Goes through two lists, adds you to your favorites, and removes you from
* the classes not listed as favorite. If the button was clicked once then the next time you click you will be removed from all classes.
* There is a small clash with the normal favorites button ie. add up on first-favorites then add on second-favorites then remove on
* first-favorites then attempt to readd on second-favorites (but actually being removed from all classes which is already the case).
* This is a minor issue because the fix is just clicking the button twice.
*/



//replaces the "join all classes" button with a "join favorite classes" button
(function() {
    'use strict';

    var isAddedFav = false;                                                                                           //boolean if added to favorites
    var uniqClasses = ['scout', 'soldier', 'pyro', 'demoman', 'heavy', 'engineer', 'medic', 'sniper', 'spy'];         //total classes, static


    //EDIT THIS TO SELECT YOUR FAVORITE CLASSES
    var uniqFavorites = ['scout', 'soldier', 'pyro', 'demoman', 'heavy', 'engineer', 'sniper', 'spy'];
    //Must be in order scout/soldier/pyro/demoman/heavy/engineer/medic/sniper/spy



    let x = $('#joinAllClasses');                                                                                     //join all classes button
                                                                                                                      //
    $(x).off('click');                                                                                                //disable button's previous click event
    $(x).on('click.favorites', function() {                                                                           //add new event to button click
                                                                                                                      //
        var favoriteIterator = 0;                                                                                     //favorites array indexer
        var favStr = "";                                                                                              //for printing to console
        var i = 0;                                                                                                    //IDE angry about scopes unless index declared here?
                                                                                                                      //
        switch(isAddedFav) {                                                                                          //check if added to favs
                                                                                                                      //
            case false:                                                                                               //if not added to favs
                for (i = 0; i < classes.length; i++) {                                                                //loop through classes, checking each for if favorite
                    if (uniqClasses[i] == uniqFavorites[favoriteIterator]) {                                          //this class is a favorite
                        if (!document.getElementById(uniqClasses[i] + 'Val').checked) {                               //if not already added up
                            console.log(uniqClasses[i] + " not found. Adding...");                                    //log in console
                            socket.emit('addClass', uniqClasses[i]);                                                  //add up on this class
                            favStr += uniqClasses[i] + ", ";                                                          //concat favorite class to string
                        }                                                                                             //
                    } else {                                                                                          //this class is not a favorite
                        if (document.getElementById(uniqClasses[i] + 'Val').checked) {                                //if added on class
                            console.log(uniqClasses[i] + " removed...");                                              //log in console
                            socket.emit('removeClass', uniqClasses[i]);                                               //remove from this class
                        }                                                                                             //
                    }                                                                                                 //
                    if (uniqClasses[i] == uniqFavorites[favoriteIterator]) favoriteIterator++;                        //increment favorite iterator
                }                                                                                                     //
                favoriteIterator = 0;                                                                                 //unnecessary but maybe prevents bug
                if (favStr.length == 0) favStr = "none, ";                                                            //sets to "none"
                favStr = favStr.substr(0, favStr.length - 2);                                                         //remove last comma
                console.log("Added up to " + favStr);                                                                 //log in console
                isAddedFav = true;                                                                                    //set isAddedFav to true
                break;                                                                                                //
                                                                                                                      //
          case true:                                                                                                  //if added to favorites already
                for (i = 0; i < 9; i++) {                                                                             //loop 9 classes
                    socket.emit('removeClass', uniqClasses[i]);                                                       //remove from all classes
                }                                                                                                     //
                isAddedFav = false;                                                                                   //set isAddedFav to false                                                                                           //
        }
    });
})();
