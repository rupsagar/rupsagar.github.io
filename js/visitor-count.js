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
const APIURL = 'https://api.ipify.org?format=json';

function callAPI() {
    // Make a GET request
    fetch(APIURL)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
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
        localStorage.setItem("LatLong", "Geolocation is not supported by this browser");
    }
}

function showPosition(position) {
    localStorage.setItem("LatLong", position.coords.latitude + "; " + position.coords.longitude);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            localStorage.setItem("LatLong", "User denied the request for Geolocation");
            break;
        case error.POSITION_UNAVAILABLE:
            localStorage.setItem("LatLong", "Location information is unavailable");
            break;
        case error.TIMEOUT:
            localStorage.setItem("LatLong", "The request to get user location timed out");
            break;
        case error.UNKNOWN_ERROR:
            localStorage.setItem("LatLong", "An unknown error occurred");
            break;
    }
}

function getViewerIP(json){
    var ViewerIP = json.ip;
    var ViewerIPStr = convViewerIPStr(ViewerIP);
    writeViewerIP(ViewerIP, ViewerIPStr)
    countVisits();
}

function convViewerIPStr(ViewerIP){
    var ViewerIPStr = ViewerIP.toString();
    for (var i, i=0; i < ViewerIPStr.length; i++) {
        ViewerIPStr = ViewerIPStr.replace(".", "-")
    }
    return ViewerIPStr;
}

function writeViewerIP(ViewerIP, ViewerIPStr) {
    set(ref(db, dbName+"/"+ViewerIPStr), {
        IP_Address : ViewerIP,
        LatLong : localStorage.getItem("LatLong")
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
