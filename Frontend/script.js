/****************************************************
                WEBHOOK URLS
****************************************************/

const UPLOAD_WEBHOOK = "https://pranetsolkar.app.n8n.cloud/webhook/upload";
const CHAT_WEBHOOK = "https://pranetsolkar.app.n8n.cloud/webhook/chat";

let sessionId = localStorage.getItem("sessionId");

if (!sessionId) {

    sessionId = crypto.randomUUID();

    localStorage.setItem(
        "sessionId",
        sessionId
    );

}


/****************************************************
                ELEMENTS
****************************************************/

const uploadBtn = document.getElementById("upload-btn");
const pdfFile = document.getElementById("pdf-file");

const questionInput = document.getElementById("question-input");
const sendBtn = document.getElementById("send-btn");

const chatBox = document.getElementById("chat-box");

const themeBtn = document.getElementById("theme-btn");

const toast = document.getElementById("toast");


/****************************************************
                THEME
****************************************************/

if(localStorage.getItem("theme")==="light"){

    document.body.classList.add("light-mode");

}


themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light-mode");

    if(document.body.classList.contains("light-mode")){

        localStorage.setItem(
            "theme",
            "light"
        );

    }

    else{

        localStorage.setItem(
            "theme",
            "dark"
        );

    }

});


/****************************************************
                UPLOAD PDF
****************************************************/

uploadBtn.addEventListener("click",()=>{

    pdfFile.click();

});


pdfFile.addEventListener(
    "change",
    uploadPDF
);


async function uploadPDF(){

    const file = pdfFile.files[0];

    if(!file){

        return;

    }

    showToast(
        "Uploading PDF..."
    );

    addAIMessage(
        `Uploading "${file.name}"...`
    );


    try{

        const formData =
        new FormData();

        formData.append(
            "document",
            file
        );


        const response =
        await fetch(

            UPLOAD_WEBHOOK,

            {

                method:"POST",

                body:formData

            }

        );


        if(!response.ok){

            throw new Error();

        }


        addAIMessage(

            "✅ PDF uploaded successfully. Ask anything about it."

        );


        showToast(

            "PDF uploaded successfully"

        );


    }

    catch(error){

        addAIMessage(

            "❌ Upload failed."

        );

    }

}


/****************************************************
                SEND MESSAGE
****************************************************/

sendBtn.addEventListener(

    "click",

    sendMessage

);


questionInput.addEventListener(

    "keydown",

    function(e){

        if(

            e.key==="Enter"

            &&

            !e.shiftKey

        ){

            e.preventDefault();

            sendMessage();

        }

    }

);



async function sendMessage(){


    const question =

    questionInput.value.trim();


    if(question===""){

        return;

    }


    removeHero();


    addUserMessage(

        question

    );


    questionInput.value="";


    showTypingIndicator();


    try{


        const response =

        await fetch(

            CHAT_WEBHOOK,

            {

                method:"POST",

                headers:{

                    "Content-Type":

                    "application/json"

                },

                body:

                JSON.stringify({

                    question: question,
                    sessionId: sessionId

                })

            }

        );


        const data =

        await response.json();


        removeTypingIndicator();


        addAIMessage(

            data.answer ||

            data.response ||

            "No response received."

        );


    }

    catch(error){


        removeTypingIndicator();


        addAIMessage(

            "Something went wrong."

        );

    }

}


/****************************************************
                USER MESSAGE
****************************************************/

function addUserMessage(message){


    const div =

    document.createElement("div");


    div.classList.add(

        "user-message"

    );


    div.innerHTML =

    `
    ${message}

    <div class="timestamp">

        ${getCurrentTime()}

    </div>

    `;


    chatBox.appendChild(div);


    scrollBottom();

}


/****************************************************
                AI MESSAGE
****************************************************/

function addAIMessage(message){


    const div =

    document.createElement("div");


    div.classList.add(

        "ai-message"

    );


    div.innerHTML =

    `
    ${message}

    <div class="timestamp">

        ${getCurrentTime()}

    </div>

    `;


    chatBox.appendChild(div);


    scrollBottom();

}


/****************************************************
                TYPING DOTS
****************************************************/

function showTypingIndicator(){


    const div =

    document.createElement("div");


    div.classList.add(

        "ai-message"

    );


    div.id="typing";


    div.innerHTML =

    `
    <div class="typing">

        <div class="dot"></div>

        <div class="dot"></div>

        <div class="dot"></div>

    </div>
    `;


    chatBox.appendChild(div);


    scrollBottom();

}



function removeTypingIndicator(){

    document

    .getElementById(

        "typing"

    )

    ?.remove();

}


/****************************************************
                HERO
****************************************************/

function removeHero(){

    const hero =

    document.querySelector(

        ".hero"

    );


    if(hero){

        hero.remove();

    }

}


/****************************************************
                TOAST
****************************************************/

let toastTimeout;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 5000);

}

/****************************************************
                TIME
****************************************************/

function getCurrentTime(){


    return new Date()

    .toLocaleTimeString(

        [],

        {

            hour:"2-digit",

            minute:"2-digit"

        }

    );

}


/****************************************************
                SCROLL
****************************************************/

function scrollBottom(){

    chatBox.scrollTop =

    chatBox.scrollHeight;

}


/****************************************************
            SUGGESTION BUTTONS
****************************************************/

const suggestionButtons =

document.querySelectorAll(

    ".suggestions button"

);


suggestionButtons.forEach(

    button=>{

        button.addEventListener(

            "click",

            ()=>{

                questionInput.value =

                button.innerText;

            }

        );

    }

);