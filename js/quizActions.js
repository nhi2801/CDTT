var quizNo = 0;
var tbody1 = document.getElementById('quiz-list');

function AddItemsToTable(quizId, questionTitle, category, search, imageURL) {
    let trow = document.createElement("tr");
    let td1 = document.createElement(`td`);
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');

    // td2.setAttribute("class", quizId)
    // td3.setAttribute("class", "questionTitle")
    // td4.setAttribute("id", "category")
    // td5.setAttribute("id", "search")
    // td6.setAttribute("id", "imageURL")
    td2.setAttribute("id", quizId)
    td1.innerHTML = ++quizNo;
    td2.innerHTML = quizId;
    td3.innerHTML = questionTitle;
    td4.innerHTML = category;
    td5.innerHTML = search;
    td6.innerHTML = `<button href="#" class="btn btn-primary getimg GetImgbtn" id=${quizId}>Hiển thị</i></button>`

    td2.classList +="quizIdField";
    td3.classList +="questionTitleField";
    td4.classList +="categoryField";
    td5.classList +="searchField";
    td6.classList +="imageURLField";

    var ControlDiv = document.createElement("td");
    ControlDiv.innerHTML = `<button type="button" class="btn btn-primary edit" data-toggle="modal" data-target="#exampleModalCenter" id="${quizId}"><i class="fas fa-pencil-alt"></i></button>`
    ControlDiv.innerHTML += `<button href="#" class="btn btn-primary delete DelModbtn" id=${quizId}><i class="fas fa-trash"></i></button>`


    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(ControlDiv);

    tbody1.appendChild(trow);
}

function AddAllItemsToTable(quiz) {
    quizNo = 0;
    tbody1.innerHTML = "";
    quiz.forEach(element => {
        AddItemsToTable(element.quizId, element.questionTitle, element.category, element.search, element.imageURL);
    });
}
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


async function GetAllDataOnce() {
    const querrySnapshot = await getDocs(collection(db, "quizList"));

    var quiz = [];

    querrySnapshot.forEach(doc => {
        quiz.push(doc.data());

    });

    AddAllItemsToTable(quiz);
}

window.onload = await GetAllDataOnce();

let idbox = document.getElementById("Idbox");
let namebox = document.getElementById("Namebox");
let imageURLbox = document.getElementById("imageURLbox");
let searchbox = document.getElementById("Searchbox");
let categorybox = document.getElementById("Categorybox");

let updBtn = document.getElementById("UpdModbtn");
let delBtn = document.getElementsByClassName("DelModbtn");
let editBtn = document.getElementsByClassName("edit");

// sửa dữ liệu

async function UpdQuiz() {
    var ref = doc(db, "quizList", idbox.value);
    await updateDoc(
        ref, {
        questionTitle: namebox.value,
        imageURL: imageURLbox.value,
        search: searchbox.value,
        category: categorybox.value
    }
    )
        .then(() => {
            alert("Sửa dữ liệu thành công");
        })
        .catch((error) => {
            alert("Không thành công, lỗi" + error);
        });
}

//xóa dữ liệu

async function DelQuiz(quizId) {
    console.log(quizId);
    var ref = doc(db, "quizList", quizId);
    const docSnap = await getDoc(ref);

    if (!docSnap.exists()) {
        alert("Không tồn tại dữ liệu");
        return;
    }
    await deleteDoc(ref)
        .then(() => {
            alert("Xoá dữ liệu thành công");
        })
        .catch((error) => {
            alert("Xóa dữ liệu thất bại, error:" + error);
        });
    GetAllDataOnce();
}


updBtn.addEventListener('click', UpdQuiz);

//delete button
for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener('click', async event => {
        await DelQuiz(delBtn[i].id)
    });
}

//edit button
for (let i = 0; i < editBtn.length; i++) {
    editBtn[i].addEventListener('click', async event => {
        var ref = doc(db, "quizList", editBtn[i].id);
        const docSnap = await getDoc(ref);
        const currentDocument = await docSnap.data()
        console.log(currentDocument);
        idbox.value = editBtn[i].id;
        namebox.value = currentDocument.questionTitle;
        searchbox.value = currentDocument.search;
        imageURLbox.value = currentDocument.imageURL;
        categorybox.value = currentDocument.category;
    });
}

// tìm kiếm

let searchbar = document.getElementById("SearchBar");
let searchBtn = document.getElementById("SearchBtn");
let category = document.getElementById("CategorySelected");
var tbody1 = document.getElementById("quiz-list");

function SearchTable(Category){

    let filter = searchbar.value.toUpperCase();
    let tr = tbody1.getElementsByTagName("tr");
    var found;

    for (var i = 0; i <tr.length; i++){

        let td = tr[i].getElementsByClassName(Category);

        for (var j=0; j<td.length; j++){

            if(td[j].innerHTML.toUpperCase().indexOf(filter) > -1) { //tim duoc ban ghi phu hop tren thanh search
                found=true;
            }
        }

        if(found){
            tr[i].style.display="";
            found=false;
        }
        else{
            tr[i].style.display="none";
        }
    }
}

searchBtn.onclick = function(){
    if(searchbar.value=="");

    else if(category.value==1)
    SearchTable("quizIdField");

    else if(category.value==2)
    SearchTable("questionTitleField");

    else if(category.value==3)
    SearchTable("categoryField");
    
    else if(category.value==4)
    SearchTable("searchField");
    
    else if(category.value==5)
    SearchTable("imageURLField");
}
// tim chinh xac 
function SearchTableByExactValues(Category){

    let filter = searchbar.value.toUpperCase();
    let tr = tbody1.getElementsByTagName("tr");
    var found;

    for (var i = 0; i <tr.length;i++){

        var td = tr[i].getElementsByClassName(Category);

        for (var j=0; j<td.length; j++){

            if(td[j].innerHTML.toUpperCase() == filter) { //tim duoc ban ghi phu hop tren thanh search
                found=true;
            }
        }

        if(found){
            tr[i].style.display="";
            found=false;
        }
        else{
            tr[i].style.display="none";
        }
    }
}

searchBtn.onclick = function(){
    if(searchbar.value=="");

    else if(category.value==1)
    SearchTableByExactValues("quizIdField");

    else if(category.value==2)
    SearchTable("questionTitleField");

    else if(category.value==3)
    SearchTableByExactValues("categoryField");

    else if(category.value==4)
    SearchTableByExactValues("searchField");

    else if(category.value==5)
    SearchTable("imageURLField");
}

searchbar.onkeypress = function(event){
    if(event.keyCode==13){
        searchBtn.click();
    }
}
