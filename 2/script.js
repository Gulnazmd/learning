var id;
var ttop;
var tleft;

window.onload = function() {

    const questions = [
        new question("single", "What do you want to learn?", ["HTML", "JS", "CSS", "C#"], "0"),
        new question("multiple", "Which words are used in HTML?", ["back", "head", "body", "eyes"], ["1", "2"]),
        new question("single", "What do you want to learn?", ["HTML", "JS", "CSS", "C#"], "0"),        
        new question("multiple", "What statments are true for 'String'?",
                     ["a data type used in programming", "used to represent text", "a data type with 2 possible values", 
                     "it shows that data value does not exist in the database"], ["0", "1"]),
        new question("draggable", "Fill {0} the gaps {1} the blanks", ["in", "after", "to"], ["0", "2"]),
    ];

    init(questions);

    let questionNumber = 0;

    let answers = new Array(questions.length);

    let nextBtn = document.getElementById("control-next")
    nextBtn.addEventListener("click", function(){
        if (questionNumber + 1 < questions.length) {
            rememberAnswer(answers, questionNumber, questions[questionNumber].type);

            questionNumber+=1;
            loadQuestion(questionNumber, questions);
        }; 
        
    });
    //var elements = document.getElementsByName("answer-choice");
    //var isAnySelected = [...elements].some(item => item.checked === true);

    let previousBtn = document.getElementById("control-previous")
    previousBtn.addEventListener("click", function(){
        questionNumber-=1;
        loadQuestion(questionNumber, questions);
    });

    let finishBtn = document.getElementById("control-finish")
    finishBtn.addEventListener("click", function(){
        rememberAnswer(answers, questionNumber, questions[questionNumber].type);
        printResults(answers, questions);
   
    });

}

// Загружает вопрос с номером number
function loadQuestion(number, questions){
    // Обновляем информацию
    let information = document.getElementById("information");
    information.innerHTML = `${number + 1} from ${questions.length}`;

    // Обновляем тело вопроса
    loadQuestionBody(questions[number]);
    // Обновляем варианты ответов
    loadQuestionBodyVariants(questions[number]);

    // Обновляем ответы
    // Очищаем блок с ответами
    let answersBlock = document.getElementById("content-answers");
    let questionString = "<fieldset>";
    // Записываем ответы
    const answers = questions[number].answers;

    if (questions[number].type == "multiple"){
        answers.forEach(function callback(currentValue, index, array) {
            questionString += `
            <div>
            <input type="checkbox" id="answer-choice-${index}" name="answer-choice" value="${index}">
            <label for="answer-choice-${index}">${currentValue}</label>
            </div>`
        });
    }

    if (questions[number].type == "single"){
        answers.forEach(function callback(currentValue, index, array) {
            questionString += `
            <div>
            <input type="radio" id="answer-choice-${index}" name="answer-choice" value="${index}">
            <label for="answer-choice-${index}">${currentValue}</label>
            </div>`
        });
    }

    questionString += "</fieldset>";
    answersBlock.innerHTML =  questionString;

    // Если это последний вопрос скрываем Next
    let finishBtn = document.getElementById("control-finish");
    let nextBtn = document.getElementById("control-next");
    let previousBtn = document.getElementById("control-previous");
    if (number + 1 == questions.length)
    {
        nextBtn.style.display = "none";
        finishBtn.style.display = "inline";
    } else if (number == 0) 
    {
        previousBtn.style.display = "none";
    } else {
        previousBtn.style.display = "inline";
        nextBtn.style.display = "inline";
        finishBtn.style.display = "none";
    }  
}

// Запомнить ответ
function rememberAnswer(answers, questionNumber, type){
    var formData = new FormData(document.querySelector('form'))

    if (type == "multiple"){
        let answer = [];
        for (const [key, value] of formData.entries()) {
            answer.push(value);
        }
        answers[questionNumber] = answer.sort();
    } else if (type == "single") {
        let answer = "";
        for (const [key, value] of formData.entries()) {
            answer += value;
        }
        answers[questionNumber] = answer;
    } else {
        let answer = [];
        let ans = document.getElementsByClassName("answer");
        for(let i = 0; i < ans.length; i ++)
        {
            let variant = ans[i].querySelector(".variant");
            if (variant){
                answer.push(variant.id.substring(8)); 
            } else {
                answer.push();
            }
        }
        answers[questionNumber] = answer;
    }

}

// Вывод результатов
function printResults(userAnswers, questions){

    var correctAnswersCount = questions.reduce(function(accumulator, element, index){
        // Если ответ массив
        if (Array.isArray(userAnswers[index])){
            if (element.correctAnswer.length != userAnswers[index].length)
            {
                return accumulator; 
            }
            else
            {
                for(let i = 0; i < element.correctAnswer.length; i++){
                    if (element.correctAnswer[i] != userAnswers[index][i])
                        return accumulator;
                };
                return accumulator+=1; 
            }
        } else {
            // Если ответ строка
            if (element.correctAnswer == userAnswers[index]){
                return accumulator+=1; 
            }
        }
        return accumulator;       
    }, 0);

    let testBox = document.getElementById("test-box");
    testBox.innerHTML = "";
    var results = document.createElement("div");
    results.setAttribute("id", "results")
    var resultsText = document.createTextNode(`Your results: Correct answers: ${correctAnswersCount}`); 
    results.appendChild(resultsText); 
    testBox.appendChild(results);
    
    localStorage.setItem("testCompleted", true)
    localStorage.setItem("testResults", correctAnswersCount)
}

function init(questions){


    let finishBtn = document.getElementById("control-finish");
    finishBtn.style.display = "none";

    const testCompleted = sessionStorage.getItem("testCompleted");
    if (testCompleted != null && testCompleted){
        const correctAnswersCount = sessionStorage.getItem("testResults");
        let testBox = document.getElementById("test-box");
        testBox.innerHTML = "";
        var results = document.createElement("div");
        results.setAttribute("id", "results")
        var resultsText = document.createTextNode(`Test already completed. Your results: Correct answers: ${correctAnswersCount}`); 
        results.appendChild(resultsText); 
        testBox.appendChild(results);
        return;
    }

    loadQuestion(0, questions);
}

function loadQuestionBody(question){
    let text = question.text;
    if (question.type == 'draggable'){
        for(let i = 0; i < question.correctAnswer.length; i++){
            text = text.replace(`\{${i}\}`, `<span class="answer" id="answer-${i}"></span>`);
        }
    }
    let content = document.getElementById("content-question");
    content.innerHTML = text;
}


function loadQuestionBodyVariants(question){

    // Обновляем ответы
    // Очищаем блок с ответами
    let answersBlock = document.getElementById("content-answers");

    // Записываем ответы
    const answers = question.answers;

    if (question.type == "multiple"){
        let questionString = "<fieldset id='variants'>";
        answers.forEach(function callback(currentValue, index, array) {
            questionString += `
            <div>
            <input type="checkbox" id="answer-choice-${index}" name="answer-choice" value="${index}">
            <label for="answer-choice-${index}">${currentValue}</label>
            </div>`
        });
        questionString += "</fieldset>";
        answersBlock.innerHTML =  questionString;
    }

    if (question.type == "single"){
        let questionString = "<fieldset id='variants'>";
        answers.forEach(function callback(currentValue, index, array) {
            questionString += `
            <div>
            <input type="radio" id="answer-choice-${index}" name="answer-choice" value="${index}">
            <label for="answer-choice-${index}">${currentValue}</label>
            </div>`
        });
        questionString += "</fieldset>";
        answersBlock.innerHTML =  questionString;
    }

    if (question.type == "draggable"){
        let questionString = "<fieldset id='variants'>";
        answers.forEach(function callback(currentValue, index, array) {
            questionString += `<span class="variant" id="variant-${index}">${currentValue}</span>`
        });
        questionString += "</fieldset>";
        answersBlock.innerHTML =  questionString;


        let variants = document.getElementsByClassName("variant");
        let parentTop = document.getElementById("variants").getBoundingClientRect().top + 10 + "px";
        let position = 0;
        const step = 20;
        for (let i = 0; i < variants.length; i++){
            variants[i].style.left = position + step + "px";
            variants[i].style.top = parentTop;
            variants[i].style.position = "absolute";
            variants[i].addEventListener("mousedown", onStart, false);
            variants[i].addEventListener("touchstart", onStart, false);
            position += variants[i].getBoundingClientRect().right - variants[i].getBoundingClientRect().left + step;
        }    

    }
}

function onEnd(event){
    document.removeEventListener('touchmove', onTouchMove, false);
    document.removeEventListener('mousemove', onMouseMove, false);
    document.ontouchend = null;
    document.onmouseup = null;
    let el = document.getElementById(id);
    el.style.top = ttop;
    el.style.left = tleft;
}

function onStart(event) {
    id = event.target.id;
    tleft = event.target.style.left;
    ttop = event.target.style.top;
    document.addEventListener('touchmove', onTouchMove, false);
    document.addEventListener('touchend', onEnd, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onEnd, false);
}

function onMouseMove(event){
    onMove(event.clientX, 
        event.clientY, 
        event.pageX, 
        event.pageY);    
}

function onTouchMove(event){
    onMove(event.targetTouches[0].clientX, 
        event.targetTouches[0].clientY, 
        event.targetTouches[0].pageX, 
        event.targetTouches[0].pageY);    
}

function onMove(clientX, clientY, pageX, pageY){
    let el = document.getElementById(id);
    let elemBelow = document.elementFromPoint(clientX, clientY);
    if (elemBelow){
        let answer = elemBelow.closest(".answer");
        if (answer !== null && answer.querySelector(".variant") === null){
                
            el.style.position = "static";
            answer.appendChild(el);       
            
            document.removeEventListener('touchmove', onTouchMove, false);
            document.removeEventListener('mousemove', onMouseMove, false);
            document.ontouchend = null;
            document.onmouseup = null;
            return;

        }
    }
   
    el.style.left = pageX +'px';
    el.style.top = pageY + 'px';    
}

// Вопрос
function question(type, text, answers, correctAnswer){
    this.type = type,
    this.text = text,
    this.answers = answers,
    this.correctAnswer = correctAnswer;
}