// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA7k8e5fi58TVfAfXK4Xg5mdB8o3k8l6Cw",
    authDomain: "personal-website-view-counter.firebaseapp.com",
    databaseURL: "https://personal-website-view-counter-default-rtdb.firebaseio.com",
    projectId: "personal-website-view-counter",
    storageBucket: "personal-website-view-counter.appspot.com",
    messagingSenderId: "1013946837948",
    appId: "1:1013946837948:web:1c5b360b79b13a08e3d9b9",
    measurementId: "G-CM6S38F6KB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// customize for visitor count
import {getDatabase, set, get, update, remove, ref, child, onValue} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js"

const db = getDatabase();
const dbName = "Page_Views";
const APIURL = "https://api.ipify.org?format=json";
const timeNow = new Date();
const options = {day:"2-digit",
                 month:"short",
                 year:"numeric",
                 hour:"2-digit",
                 minute:"2-digit",
                 second:"2-digit",
                 timeZoneName:"short"}
const timeNowStr = timeNow.toLocaleString('en-GB', options);
// console.log(timeNowStr);

function callAPI() {
    // Make a GET request
    fetch(APIURL)
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(jsonData => {
        getLocation();
        getViewerIP(jsonData);
    })
    .catch(error => {
        console.error(error);
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        localStorage.setItem("Loc_Stat", "Geolocation is not supported by this browser");
    }
}

function showPosition(position) {
    localStorage.setItem("Lat_Long", "[" + position.coords.latitude + "; " + position.coords.longitude + "]");
    localStorage.setItem("Loc_Stat", "Location captured successfully");
}

function showError(error) {
    localStorage.setItem("Lat_Long", "[" + -1 + "; " + -1 + "]");
    switch(error.code) {
        case error.PERMISSION_DENIED:
            localStorage.setItem("Loc_Stat", "User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            localStorage.setItem("Loc_Stat", "Location information is unavailable");
            break;
        case error.TIMEOUT:
            localStorage.setItem("Loc_Stat", "The request to get user location timed out");
            break;
        case error.UNKNOWN_ERROR:
            localStorage.setItem("Loc_Stat", "An unknown error occurred");
            break;
    }
}

function getViewerIP(json){
    var viewerIP = json.ip;
    var viewerIPStr = convViewerIPStr(viewerIP);
    writeViewerIP(viewerIP, viewerIPStr);
    countVisits();
}

function convViewerIPStr(viewerIP){
    var viewerIPPath = viewerIP.toString();
    var timeNowStrPath = timeNowStr;
    for (var i, i = 0; i < viewerIPPath.length; i++) {
        viewerIPPath = viewerIPPath.replace(".", "-");
    }
    timeNowStrPath = timeNowStrPath.substr(21, timeNowStrPath.length);
    timeNowStrPath = timeNowStrPath.replace(" ", "");
    timeNowStrPath = timeNowStrPath.replace(":", "_");
    return viewerIPPath + "_" + timeNowStrPath;
}

function writeViewerIP(viewerIP, viewerIPStr) {
    set(ref(db, dbName+"/"+viewerIPStr), {
        IP_Addr : viewerIP,
        Lat_Long : localStorage.getItem("Lat_Long"),
        Loc_Stat : localStorage.getItem("Loc_Stat"),
        Time_Stamp : timeNowStr
    });
}

function countVisits(){
    var numNewVisits;
    onValue(ref(db, dbName), (snapData) => {
        numNewVisits = Object.keys(snapData.val()).length;
        document.getElementById("visitor-count").innerHTML = numNewVisits;
    })
}

callAPI();
