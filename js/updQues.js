// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCp2hPBaQq5Z7aDmZSrB1TwY7pxQNiZSsk",
    authDomain: "web-thi-thu.firebaseapp.com",
    databaseURL: "https://web-thi-thu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "web-thi-thu",
    storageBucket: "web-thi-thu.appspot.com",
    messagingSenderId: "1073206614083",
    appId: "1:1073206614083:web:20cdc5d35e7d38fbf75cf6",
    measurementId: "G-W2J21MKQ5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getFirestore, getDocs, collection, doc, getDoc, updateDoc, deleteDoc }
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getFirestore();

let SearchBtn = document.getElementById("SearchBtn")

SearchBtn.onclick =  async function getQuizzes() {
    await db.collection("quizList").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (doc.data().questions) {
          test[doc.id] = doc.data();
        };
      });
    });
    console.log(test);
  }
