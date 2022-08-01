const start_button = document.querySelector(".start_button button")
const info_box = document.querySelector(".info_box")
const btn_sair = info_box.querySelector(".buttons .sair")
const btn_continuar = info_box.querySelector(".buttons .restart")
const quiz_box = document.querySelector(".quiz_box")
const option_lst = document.querySelector(".option_lst")
const timeCount = quiz_box.querySelector(".timer .timer_sec")
const timeLine = quiz_box.querySelector("header .time_line")



start_button.onclick = ()=>{
    info_box.classList.add("activeInfo")
}

btn_sair.onclick = ()=>{
    info_box.classList.remove("activeInfo")
}

btn_continuar.onclick = ()=>{
    info_box.classList.remove("activeInfo")
    quiz_box.classList.add("activeQuiz")
    showQuestions(0)
    startTimer(20)
    startTimerLine(0)
}

let que_cont = 0
let cont
let timeValue = 20
let widthValue = 0
let contLine
let score = 0

const next_button = quiz_box.querySelector("footer .next_button")
const result_box = document.querySelector(".result_box")
const restart_quiz = result_box.querySelector(".buttons .restart")
const quit_quiz = result_box.querySelector(".buttons .sair")

restart_quiz.onclick = () =>{
    quiz_box.classList.add("activeQuiz")
    result_box.classList.remove("activeResult")
    let que_cont = 0
    let timeValue = 20
    let widthValue = 0
    let score = 0
    showQuestions(que_cont)
    clearInterval(cont)
    startTimer(timeValue)
    clearInterval(contLine)
    startTimerLine(widthValue)
    next_button.classList.remove("show")
}

quit_quiz.onclick= () =>{
    window.location.reload()
}

next_button.onclick= () =>{

    if (que_cont < questions.length -1){
        que_cont += 1
        showQuestions(que_cont)
        clearInterval(cont)
        clearInterval(contLine)
        startTimer(timeValue)
        startTimerLine(widthValue)
        next_button.style.display = "none"
    } else {
        clearInterval(cont)
        clearInterval(contLine)
        console.log("Questões terminadas!")
        showResultBox()
    }
}



function showQuestions(index){

    const que_text = document.querySelector(".que_text")

    let que_tag = '<span>'+questions[index].question +'</span>';
    let option_tag = '<div class="option">'+ questions[index].options[0] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] +'<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] +'<span></span></div>'
    que_text.innerHTML = que_tag
    option_lst.innerHTML = option_tag

    const option = option_lst.querySelectorAll(".option")

    for (let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){
    clearInterval(cont)
    clearInterval(contLine)
    let userAns = answer.textContent
    let correctAns = questions[que_cont].answer
    const allOptions = option_lst.children.length

    if (userAns === correctAns){
        score += 1
        console.log(score)
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIcon)
        console.log("Resposta Correcta!")

    } else {
        answer.classList.add("incorrect")
        answer.insertAdjacentHTML("beforeend", crossIcon)
        console.log("Resposta Errada!")


        for (let i = 0; i < allOptions; i++){
            if (option_lst.children[i].textContent === correctAns){
                option_lst.children[i].setAttribute("class", "option correct")
                option_lst.children[i].insertAdjacentHTML("beforeend", tickIcon)
            }
        }
    }

    for (let i = 0; i < allOptions; i++){
        option_lst.children[i].classList.add("disabled")
    }
    next_button.style.display = "block"
}

function showResultBox(){
    info_box.classList.remove("activeInfo")
    quiz_box.classList.remove("activeQuiz")
    result_box.classList.add("activeResult")
    const scoreText = result_box.querySelector(".score_text")
    scoreText.innerHTML = '<span>parabens!, vc teve <p>' + score + '</p> / <p>' + questions.length + '</p>'
}


function startTimer(time){
    cont = setInterval(timer, 1000)
    function timer(){
        timeCount.textContent = time
        time -= 1
        if (time <= 0){
            clearInterval(cont)
            timeCount.textContent = '00'

            let correctAns = questions[que_cont].answer
            let allOptions = option_lst.children.length

            for (let i = 0; i < allOptions; i++) {
                if (option_lst.children[i].textContent === correctAns) {
                    option_lst.children[i].setAttribute("class", "option correct")
                    option_lst.children[i].insertAdjacentHTML("beforeend", tickIcon)
                }
            }
            for (let i = 0; i < allOptions; i++){
                option_lst.children[i].classList.add("disabled")
            }
            next_button.style.display = "block"

        } else {
            let addZero = timeCount.textContent
            timeCount.textContent = '0' + addZero
        }
    }
}

function startTimerLine(time){
    contLine = setInterval(timer, 37)
    function timer(){
        time += 1
        timeLine.style.width = time + "px"
        if (time > 549){
            clearInterval(contLine)

        }
    }
}