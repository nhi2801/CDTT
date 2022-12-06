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

import { getFirestore, doc, setDoc }
from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const db = getFirestore();

// Publish 
const questions = document.querySelector('.questions');
const quizName = document.querySelector('.quiz-name');
const publishBtn = document.querySelector('.header-tray-btn');
publishBtn.addEventListener('click', () => {
    // Ten cau hoi
    console.log(quizName.innerText);
    if (quizName.innerText == 'Question' || questions.innerHTML.replace(/\s/g, '') == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Thông báo',
            text: 'Bạn chưa tạo câu hỏi hoặc chưa đặt tên cho đề thi',
            footer: '<p>Tên bài thi không được để là Câu hỏi, phải có ảnh minh họa</p>'
        })
    } else {

        let questionTitle = document.querySelector('.name').innerText;
        // let image = document.getElementById('exampleFormControlFile1').dataset.image;
        let quizNumber = document.querySelectorAll('.question-header');
        const questionInput = document.querySelectorAll('.question-input');
        let category = document.getElementById("Categorybox");
        let publishQuiz = document.getElementById("publishQuiz");
        let search = document.getElementById("Searchbox");

        let questionsArray = [];
        questionInput.forEach((element, index) => {
            questionsArray.push({
                "quizNumber": quizNumber[index].firstElementChild.innerText,
                "answers": questionInput[index].dataset.answers.split(','),
                "rightAnswer": questionInput[index].dataset.rightAnswer,
                "quiz": questionInput[index].dataset.quiz
            })
        })

        let id = "quiz" + Math.random().toString(16).slice(10);

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        publishQuiz.onclick = async function(){
            await setDoc(doc(db, "quizList", id),{
                quizId: id,
                questionTitle: search.value,
                search: questionTitle,
                // imageURL: ImgToUpload, 
                category: category.value,
                questions: questionsArray
            })
            .then(() => {
                swalWithBootstrapButtons.fire({
                    title: 'Đã tạo bài thi thành công!',
                    text: `Code của bài thi là: ${id}`,
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Quay về trang chủ',
                    reverseButtons: true,
                    allowOutsideClick: false,
                    allowEnterKey: false
            }).then(() => {
                    location.href = './main.html';
                    
            }).catch((error)=>{
                alert("Không thành công, lỗi"+error);
            });
            })
            }
        }
    })
