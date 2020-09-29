
window.onload = function() {

    const questions = [
        new question("single", "What do you want to learn?", ["HTML", "JS", "CSS", "C#"], "0"),
        new question("multiple", "Which words are used in HTML?", ["back", "head", "body", "eyes"], ["1", "2"]),
        new question("single", "What do you want to learn?", ["HTML", "JS", "CSS", "C#"], "0"),        
        new question("multiple", "What statments are true for 'String'?",
                     ["a data type used in programming", "used to represent text", "a data type with 2 possible values", 
                     "it shows that data value does not exist in the database"], ["0", "1"]),
        new question("dragAndDrop", "Fill in the gaps", ["ans1", "ans2", "ans3", "ans4", "ans5"], []),

    ];

    init(questions);

    let questionNumber = 0;

    let answers = new Array(questions.length);

    let nextBtn = document.getElementById("control-next")
    nextBtn.addEventListener("click", function(){
        if (questionNumber + 1 < questions.length) {

            const isArray = Array.isArray(questions[questionNumber].correctAnswer);
            rememberAnswer(answers, questionNumber, isArray);

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

        const isArray = Array.isArray(questions[questionNumber].correctAnswer);
        rememberAnswer(answers, questionNumber, isArray);
        printResults(answers, questions);
   
    });

}

// Загружает вопрос с номером number
function loadQuestion(number, questions){
    // Обновляем информацию
    let information = document.getElementById("information");
    information.innerHTML = `${number + 1} from ${questions.length}`;

    // Обновляем тело вопроса
    let content = document.getElementById("content-question");
    content.innerHTML = questions[number].text;

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
function rememberAnswer(answers, questionNumber, isArray){
    var formData = new FormData(document.querySelector('form'))

    if (isArray){
        let answer = [];
        for (const [key, value] of formData.entries()) {
            answer.push(value);
        }
        answers[questionNumber] = answer.sort();
    } else {
        let answer = "";
        for (const [key, value] of formData.entries()) {
            answer += value;
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

// Вопрос
function question(type, text, answers, correctAnswer){
    this.type = type,
    this.text = text,
    this.answers = answers,
    this.correctAnswer = correctAnswer;
}