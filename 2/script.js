
window.onload = function() {

    const questions = [
        new question("What do you want to learn?", ["HTML", "JS", "CSS", "C#"], 0),
        new question("Which words are used in HTML?", ["back", "head", "body", "eyes"], 0),
        new question("What statments are true for 'String'?",
                     ["a data type used in programming", "used to represent text", "a data type with 2 possible values", 
                     "it shows that data value does not exist in the database"], 0)

    ];

    Init(questions);

    let questionNumber = 0;

    let nextBtn = document.getElementById("control-next")
    nextBtn.addEventListener("click", function(){
        if (questionNumber + 1 < questions.length) {
            questionNumber+=1;
            loadQuestion(questionNumber, questions);
        }; 
        
    });

    let previousBtn = document.getElementById("control-previous")
    previousBtn.addEventListener("click", function(){
        questionNumber-=1;
        loadQuestion(questionNumber, questions);
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
    answersBlock.innerHTML = "";
    // Записываем ответы
    const answers = questions[number].answers;
    answers.forEach(function callback(currentValue, index, array) {
        answersBlock.innerHTML += `
        <input type="checkbox" id="answer-choice-${index}" name="contact" value="${index}">
        <label for="answer-choice-${index}">${currentValue}</label>`
    });

    // Если это последний вопрос скрываем Next
    if (number + 1 == questions.length)
    {
        let nextBtn = document.getElementById("control-next");
        nextBtn.style.display = "none";
        let finishBtn = document.getElementById("control-finish");
        finishBtn.style.display = "inline";
        let previousBtn = document.getElementById("control-previous");
        previousBtn.style.display = "none"

    } 
}

// Вопрос
function question(text, answers, correctAnswer){
    this.text = text,
    this.answers = answers,
    this.correctAnswer = correctAnswer;
}

function Init(questions){
    loadQuestion(0, questions);
    let finishBtn = document.getElementById("control-finish");
    finishBtn.style.display = "none";
}

