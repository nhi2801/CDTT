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

import {getFirestore, doc, setDoc}
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";


const db = getFirestore();

let idbox = document.getElementById("Idboxcreate");
let namebox = document.getElementById("Namebox");
let searchbox = document.getElementById("Searchbox");

let insBtn = document.getElementById("Insbtn");

async function AddTheory(){
    var ref = doc(db, "theoryList", idbox.value);

    await setDoc(
        ref,{
        theoryId: idbox.value,
        theoryTitle:  namebox.value,
        search: searchbox.value
        }
    )
    .then(()=>{
        alert("Lưu dữ liệu thành công");
    })
    .catch((error)=>{
        alert("Không thành công, lỗi"+error);
    });
}

// thêm nút Thêm dữ liệu
insBtn.addEventListener('click', AddTheory);

