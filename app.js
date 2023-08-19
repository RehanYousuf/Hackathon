 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
 import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
 import { getFirestore,collection, addDoc, getDoc,doc,onSnapshot,deleteDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";



 const firebaseConfig = {
   apiKey: "AIzaSyACAK5kvGy8kpSKLM2KoaaCbKYrmRqpkSI",
   authDomain: "hackathone-d0102.firebaseapp.com",
   projectId: "hackathone-d0102",
   storageBucket: "hackathone-d0102.appspot.com",
   messagingSenderId: "616473690421",
   appId: "1:616473690421:web:0906ce7630238844bf0c7c"
 };

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const db = getFirestore(app);



 let btn = document.getElementById("login-btn");

 btn && btn.addEventListener("click", (e)=>{
   e.preventDefault()
 location.pathname = "login.html"
 });


 let signupBtn = document.getElementById("signup");

 signupBtn && signupBtn.addEventListener("click", async(e)=>{
    e.preventDefault()

       let email = document.getElementById("email");
       let password = document.getElementById("password");
       let fName = document.getElementById("firstname");
       let Lname = document.getElementById("lastname");

       try {
        const docRef = await addDoc(collection(db, "users"), {
          Fname:fName.value,
          Lname:Lname.value,
          Email:email.value
    
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    createUserWithEmailAndPassword(auth, email.value, password.value)
     .then((userCredential) => {
       const user = userCredential.user;
       console.log("USER", user)
     })
     .catch((error) => {
       const errorMessage = error.message;
       console.log("ERROR", errorMessage)
     });

     location.pathname = "login.html"

 });

 let login = document.getElementById("login");

 login && login.addEventListener("click",(e)=>{
    e.preventDefault()
    let email= document.getElementById("email")
    let password= document.getElementById("password")

    signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log("Succes")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
  });
  location.pathname = 'dashboard.html'
 });

 const ids=[]
 const getData = ()=>{
    onSnapshot(collection(db,"blogs"),(data) =>{
        data.docChanges().forEach((blogs) =>{
            ids.push(blogs.doc.id)
            let dlt = document.getElementById(blogs.doc.id);
            if(dlt){
                dlt.remove()
            }else{
            let list = document.getElementById("list")
            list.innerHTML +=
        `<div id='${blogs.doc.id}'class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <h5 id="container"class="card-title">${blogs.doc.data().title}</h5>
              <p class="card-text">${blogs.doc.data().desc}</p>
              <p class="card-text"><small class="text-body-secondary">${new Date()}</small></p>
              <button onclick="del('${blogs.doc.id}')">Delete</button>
              <button>Edit</button>
            </div>
          </div>
        </div>
      </div>
    `
            }
        })
    })
}
getData()
    

 let publish = document.getElementById("publish");
 publish.addEventListener("click", async(e)=>{
    e.preventDefault()
    let title = document.getElementById("title");
    let desc = document.getElementById("desc");
    let name = document.getElementById("name");
    // let list = document.getElementById("list")

    let date = new Date()

    try {
        const docRef = await addDoc(collection(db, "blogs"), {
          title:title.value,
          desc:desc.value,
          date:date
        });
      
        // console.log(title.value,desc.value,name.value,date);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

 })

 async function del(id){
    await deleteDoc(doc(db, "blogs", id));
    console.log("Todo deleted")

}
window.del=del
