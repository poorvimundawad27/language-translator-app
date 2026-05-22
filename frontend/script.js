const inputText = document.getElementById("inputText");
const translateBtn = document.getElementById("translateBtn");
const outputText = document.getElementById("outputText");
const charCount = document.getElementById("charCount");
const swapBtn = document.getElementById("swapBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const spinner = document.getElementById("spinner");
const speakBtn = document.getElementById("speakBtn");
const voiceBtn = document.getElementById("voiceBtn");
const historyList = document.getElementById("historyList");
const darkModeToggle =
    document.getElementById("darkModeToggle");

loadHistory();

if(localStorage.getItem("darkMode") === "enabled"){

    document.body.classList.add("dark-mode");

}

inputText.addEventListener("input", () => {

    charCount.innerText =
        inputText.value.length;

    inputText.style.height = "auto";

    inputText.style.height =
        inputText.scrollHeight + "px";

});

inputText.addEventListener("keypress", (e) => {

    if(e.key === "Enter" && !e.shiftKey){

        e.preventDefault();

        translateBtn.click();

    }

});

swapBtn.addEventListener("click", () => {

    const sourceLang =
        document.getElementById("sourceLang");

    const targetLang =
        document.getElementById("targetLang");

    let temp = sourceLang.value;

    sourceLang.value =
        targetLang.value;

    targetLang.value = temp;

});

translateBtn.addEventListener("click", async () => {

    if(inputText.value.trim() === ""){

        showToast("Please enter some text");

        return;
    }

    spinner.style.display = "block";

    translateBtn.disabled = true;

    outputText.innerHTML = "";

    setTimeout(() => {

        spinner.style.display = "none";

        typeText(
            "Translated text will appear here"
        );

        addToHistory(
            inputText.value,
            "Translated text will appear here"
        );

        showToast("Translation Complete");

        translateBtn.disabled = false;

    }, 2000);

});

function typeText(text){

    outputText.innerHTML = "";

    let index = 0;

    const interval = setInterval(() => {

        outputText.innerHTML += text[index];

        index++;

        if(index >= text.length){

            clearInterval(interval);

        }

    }, 40);

}

copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        outputText.innerText
    );

    showToast("Copied Successfully");

});

clearBtn.addEventListener("click", () => {

    inputText.value = "";

    outputText.innerHTML =
        "Translation will appear here";

    charCount.innerText = 0;

    inputText.style.height = "140px";

});

function addToHistory(input, output){

    const history =
        JSON.parse(
            localStorage.getItem("history")
        ) || [];

    history.unshift({input, output});

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    renderHistory();

}

function loadHistory(){

    renderHistory();

}

function renderHistory(){

    historyList.innerHTML = "";

    const history =
        JSON.parse(
            localStorage.getItem("history")
        ) || [];

    history.forEach(item => {

        const li =
            document.createElement("li");

        li.innerHTML =
            `<strong>${item.input}</strong>
            <br>${item.output}`;

        historyList.appendChild(li);

    });

}

speakBtn.addEventListener("click", () => {

    const speech =
        new SpeechSynthesisUtterance(
            outputText.innerText
        );

    speechSynthesis.speak(speech);

});

voiceBtn.addEventListener("click", () => {

    const recognition =
        new webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.start();

    recognition.onresult = (event) => {

        inputText.value =
            event.results[0][0].transcript;

        charCount.innerText =
            inputText.value.length;

    };

});

darkModeToggle.addEventListener("click", () => {

    document.body.classList.toggle(
        "dark-mode"
    );

    if(
        document.body.classList.contains(
            "dark-mode"
        )
    ){

        localStorage.setItem(
            "darkMode",
            "enabled"
        );

    }

    else{

        localStorage.setItem(
            "darkMode",
            "disabled"
        );

    }

});

function showToast(message){

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 2500);

}
console.log("Script connected successfully");
