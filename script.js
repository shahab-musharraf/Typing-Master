// Selecting DOMs
const typingText = document.querySelector(".typingText p");
const input = document.querySelector(".textInput")
const time = document.querySelector(".timeLeft span b");
const mistakes = document.querySelector(".mistakes span")
const wpm = document.querySelector(".wpm span")
const cpm = document.querySelector(".cpm span")
const btn = document.querySelector(".tryAgainBtn")


// Declaring and Initialising some needed variables
let timer,
    maxTime = 60,
    timeLeft = maxTime,
    mistake = 0,
    isTyping = false,
    charIndex = 0;



function generatePara() {
    const str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const str2 = "abcdefghijklmnopqrstuvwxyz";

    const minWords = 15;
    const maxWords = 60;

    const minChars = 2;
    const maxChars = 8;

    const noOfWords = Math.trunc(Math.random()*(maxWords-minWords+1)+minWords);
    console.log(noOfWords);

    let para = "";

    for(let i=1; i<=noOfWords; i++) {
        const noOfChars = Math.trunc(Math.random()*(maxChars-minChars+1)+minChars);
        let randomIndex = Math.floor(Math.random()*26);
        para += str1[randomIndex];
        for(let j=0; j<noOfChars-1; j++) {
            randomIndex = Math.floor(Math.random()*26);
            para += str2[randomIndex];
        }
        if(i%7 == 0){
            para += ",";
        }
        if(i < noOfWords){
            para += " ";
        }
    }

    para += ".";
    // typingText.innerText = para;
    typingText.innerHTML = "";
    for(const char of para) {
        typingText.innerHTML += `<span>${char}</span>`
    }

    typingText.querySelectorAll("span")[0].classList.add("active");

    // on start typing it will detect
    // keydown -> when a key is pressed
    document.addEventListener("keydown", ()=>{
        input.focus();
    })

    // click on the paragraph to start
    typingText.addEventListener('click', ()=> {
        input.focus();
    })

    
}

function initTyping () {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if(char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add("correct")
        }
        else {
            char[charIndex].classList.add("incorrect");
            mistake++;

        }
        
        charIndex++;
        char[charIndex].classList.add("active")
        mistakes.innerText = mistake;
        cpm.innerText = charIndex-mistake;
    }
    else {
        
        clearInterval(timer);
        input.value ="";
    }

}


function initTime() {
    if(timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        const wpmVal = Math.round(((charIndex-mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText = wpmVal;


    }
    else {
        clearInterval(timer);
    }
}

function reset() {
    generatePara();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText  = timeLeft;
    input.value = "";
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    mistakes.innerText = 0;
    wpm.innerText = 0;
    cpm.innerText = 0;
}


input.addEventListener("input", initTyping);
btn.addEventListener('click',reset);
generatePara();