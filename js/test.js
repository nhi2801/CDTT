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

import { getFirestore,setDoc, getDocs, collection, doc, getDoc, updateDoc, deleteDoc, arrayUnion }
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getFirestore();


const Ref = doc(db, "quizList", "quiz_19");
let Insbtn = document.getElementById("testbtn");

var questions = [{ answers: ["A.1", "B.2", "C.3", "D.4"], quiz: "Đây là câu hỏi test 2", quizNumber: "Câu 2", rightAnswer: "A" }, 
{answers: ["A.1", "B.2", "C.3", "D.4"], quiz: "Đây là câu hỏi test 2", quizNumber: "Câu 2", rightAnswer: "A" }]

Insbtn.onclick = async function(){
    await setDoc(Ref, {
        questionTitle: "Frank",
        questions: [{ answers: ["A.1", "B.2", "C.3", "D.4"], quiz: "Đây là câu hỏi test 2", quizNumber: "Câu 2", rightAnswer: "A" }, 
        {answers: ["A.1", "B.2", "C.3", "D.4"], quiz: "Đây là câu hỏi test 2", quizNumber: "Câu 2", rightAnswer: "A" }]
    });
    await updateDoc(Ref, {
        questions: arrayUnion(questions)
    });
    
}






