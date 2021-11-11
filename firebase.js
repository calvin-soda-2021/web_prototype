import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-analytics.js";
import { getFirestore, collection, getDocs, query, where, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

import { firebaseConfig } from "./firebase_creds.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
console.log("Connected to Firebase");

const q = query(collection(db, "temperatures"), orderBy("timestamp", "desc"))


const temp_listener = onSnapshot(q, (querySnapshot) => {
    const temperatures = [];
    querySnapshot.forEach((doc) => {
        temperatures.push(doc.data().temperature);
    });
    const current_temp = temperatures[0];
    console.log("Realtime temperature: ", current_temp);
    document.getElementById("TemperatureOutput").innerHTML = current_temp
    console.log("Current logged temperatures: ", temperatures.join(", "));
    });



