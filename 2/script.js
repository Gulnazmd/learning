
window.onload = function() {

    const questions = [
        new question("What do you want to learn?", ["HTML", "JS", "CSS", "C#"], 0),
        new question("Which words are used in HTML?", ["back", "head", "body", "eyes"], 0)

    ];
    let questionNumber = 0;

    loadQuestion(questionNumber, questions);

    var nextBtn = document.getElementById("control-next")
    nextBtn.addEventListener("click", function(){
        questionNumber+=1;
        loadQuestion(questionNumber, questions);
    });

    var previousBtn = document.getElementById("control-previous")
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
}



// Вопрос
function question(text, answers, correctAnswer){
    this.text = text,
    this.answers = answers,
    this.correctAnswer = correctAnswer;
}

