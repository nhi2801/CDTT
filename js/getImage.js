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

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import { getFirestore, collection, doc, getDoc, setDoc, addDoc, updateDoc }
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const clouddb = getFirestore();

var files = [];
var reader = new FileReader();

var imagenamebox = document.getElementById("imagenamebox");
var extlab = document.getElementById("extlab");
var myimg = document.getElementById("myimg");
var upprogress = document.getElementById("upprogress");
var selbtn = document.getElementById("add-image");
var upbtn = document.getElementById("upbtn");
// var downbtn = document.getElementById("downbtn");

var input = document.createElement('input');
input.type = 'file';

input.onchange = e =>{
    files = e.target.files;

    var extention = GetFileExt(files[0]); // chi upload 1 file
    var name = GetFileName(files[0]);

    imagenamebox.value = name;
    extlab.innerHTML = extention;

    reader.readAsDataURL(files[0]);

}

reader.onload = function(){
    myimg.src = reader.result;
}

//chon anh

selbtn.onclick = function(){
    input.click();
}

function GetFileExt(file){
    var temp = file.name.split('.');
    var ext = temp.slice((temp.length-1),(temp.length));
    return '.' +ext[0];
}

function GetFileName(file){
    var temp = file.name.split('.');
    var fname = temp.slice(0,-1).join('.');
    return fname;
}

//tai anh 

async function UploadProcess(){
    var ImgToUpload = files[0];

    var ImgName = imagenamebox.value + extlab.innerHTML;

    const metaData = {
        contentType: ImgToUpload.type
    }

    const storage = getStorage();

    const stroageRef = sRef(storage, "image/"+ImgName);

    const UploadTask = uploadBytesResumable(stroageRef, ImgToUpload, metaData);

    UploadTask.on('state-changed', (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        upprogress.innerHTML = "Upload " + progress + "%";
    },

    (error) =>{
        alert("error: Ảnh chưa được tải lên");
    },

    ()=> {
        getDownloadURL(UploadTask.snapshot.ref).then(downloadURL => {
            SaveURLtoFirestore(downloadURL);
        });
    }
    );
}

// luu anh vao firestore
let idbox = document.getElementById("Idboxcreate");

async function SaveURLtoFirestore(url){
    var name = imagenamebox.value;
    var ext = extlab.innerHTML;

    var ref = doc(clouddb, "quizList", idbox.value);

    await updateDoc(
        ref,{
        imageName: (name+ext),
        imageURL: url
    })
}

// async function GetImagefromFirestore(){
//     var name = imagenamebox.value;

//     var ref = doc(clouddb, "quizList/"+name);

//     const docSnap = await getDoc(ref);

//     if(docSnap.exists()){
//         myimg.src = docSnap.data().imageURL;
//     }
// }

upbtn.onclick = UploadProcess;
// downbtn.onclick = GetImagefromFirestore;