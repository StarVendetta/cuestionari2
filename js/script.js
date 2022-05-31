//Start Section
let start = document.querySelector("#start");

//guide Section
let guide = document.querySelector("#guide");
let exit = document.querySelector("#exit");
let continueBtn = document.querySelector("#continue");

//Quiz Section
let quiz = document.querySelector("#quiz");
let time = document.querySelector("#time");

//question Section
let questionNo = document.querySelector("#questionNo");
let questionText = document.querySelector("#questionText");

//Multiple Choices Of Questions
let option1 = document.querySelector("#option1");
let option2 = document.querySelector("#option2");
let option3 = document.querySelector("#option3");
let option4 = document.querySelector("#option4");

//correct and next Button
let total_correct = document.querySelector("#total_correct");
let next_question = document.querySelector("#next_question");

//Result Section
let result = document.querySelector("#result");
let points = document.querySelector("#points");
let levels = document.querySelector("#levels");
let quit = document.querySelector("#quit");
let startAgain = document.querySelector("#startAgain");

//Get All 'H4' From Quiz Section (MCQS)
let choice_que = document.querySelectorAll(".choice_que");


let index = 0;
let timer = 0;
let interval = 0;

//total points
let correct = 0;

//store Answer Value
let UserAns = undefined;

//what happen when 'Start' Button Will Click
start.addEventListener("click", () => {
    start.style.display = "none";
    guide.style.display = "block";
});

//what happen when 'Exit' Button Will Click
exit.addEventListener("click", () => {
    start.style.display = "block";
    guide.style.display = "none";
});


//Creating Timer For Quiz Timer Section

let countDown = () => {
    if (timer === 20) {
        clearInterval(interval);
        next_question.click();
    } else {
        timer++;
        time.innerText = timer;
    }
}

//setInterval(countDown,1000);

let loadData = () => {
    questionNo.innerText = index + 1 + ". ";
    questionText.innerText = MCQS[index].question;
    option1.innerText = MCQS[index].choice1;
    option2.innerText = MCQS[index].choice2;
    option3.innerText = MCQS[index].choice3;
    option4.innerText = MCQS[index].choice4;

    //    timer start
    timer = 0;
}

loadData();

//what happen when 'Continue' Button Will Click
continueBtn.addEventListener("click", () => {
    quiz.style.display = "block";
    guide.style.display = "none";

    interval = setInterval(countDown, 1000);
    loadData();

    //    remove All Active Classes When Continue Button Will Click

    choice_que.forEach(removeActive => {
        removeActive.classList.remove("active");
    })

    total_correct.innerHTML = `${correct = 0} Out Of ${MCQS.length} Questions`;
});


function getLevel(){


    let level;
    if (correct > 1 && correct <= 6) {
        level = "A1-1";
      }
      if (correct >= 4 && correct <= 6) {
        level = "A1-2"
      }
      if (correct >= 7 && correct <= 9) {
        level = "A2-1"
      }
      if (correct >= 10 && correct <= 12) {
        level = "A2-2"
      }
      if (correct >= 13 && correct <= 15) {
        level = "B1-1"
      }
      if (correct >= 16 && correct <= 18) {
        level = "B1-2"
      }
      if (correct >= 19 && correct <= 21) {
        level = "B1-3"
      }
      if (correct >= 22 && correct <= 24) {
        level = "B1-4"
      }
      if (correct >= 25 && correct <= 27) {
        level = "B2-1"
      }
      if (correct >= 28 && correct <= 30) {
        level = "B2-2"
      }
      if (correct >= 31 && correct <= 33) {
        level = "B2-3"
      }
      if (correct >= 34 && correct <= 36) {
        level = "B2-4"
      }
      if (correct >= 37 && correct <= 42) {
        level = "C1-1"
      }
    
      console.log(level);





      levels.innerHTML =  `Your Level:  ${level}`;


}

let strike = 0;
choice_que.forEach((choices, choiceNo,level) => {
    choices.addEventListener("click", () => {
        choices.classList.add("active");
        //check answer
        if (choiceNo === MCQS[index].answer) {
            correct++;
            
        } else if(choiceNo != MCQS[index].answer){
            correct += 0;
            strike ++;
            console.log(strike);
        }

        if(strike ==  3){
            alert("Game Over");
            
            




            clearInterval(interval);
            quiz.style.display = "none";
            points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
            getLevel();
            result.style.display = "block";   
            
        }
        //stop Counter
        //clearInterval(interval);

        //disable All Options When User Select An Option
        for (i = 0; i <= 3; i++) {
            choice_que[i].classList.add("disabled");
        }
    })
});

////what happen when 'Next' Button Will Click
next_question.addEventListener("click", () => {
    //    if index is less then MCQS.length
   /* This is a conditional statement that checks if the index is not equal to the length of the MCQS
   array minus 1. If it is not, then the index is incremented by 1 and the active class is removed
   from the choice_que array. */
    if (index !== MCQS.length - 1) {
        index++;
        choice_que.forEach(removeActive => {
            removeActive.classList.remove("active");
        })

        //question
        loadData();

        //result
        total_correct.style.display = "block";
        total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        clearInterval(interval);
        interval = setInterval(countDown, 1000);
    } else {
        index = 0;


        //when Quiz Question Complete Display Result Section
        clearInterval(interval);
        quiz.style.display = "none";
        points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
        getLevel();
        result.style.display = "block";
    }
    for (i = 0; i <= 3; i++) {
        choice_que[i].classList.remove("disabled");
    }
})


//what happen when 'Quit' Button Will Click
quit.addEventListener("click", () => {
    start.style.display = "block";
    result.style.display = "none";
    //alert("enviado");
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'your level has been recorded!',
        showConfirmButton: false,
        confirmButtonColor: '#000'
      })
});

//Start Again When 'Start Again' Button Will Clicked
startAgain.addEventListener("click", (e) => {
   
});