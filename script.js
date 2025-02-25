let userScore = 0;
let compScore = 0;
let roundPlayed = 0;
const maxRounds = 10;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.createElement("button");

resetBtn.innerText = "Restart Game";
resetBtn.id = "reset-btn";
document.body.appendChild(resetBtn);
resetBtn.style.display = "none";

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was Draw.Play Again.";
    msg.classList.add("win-msg");
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.classList.add("win-msg");
        userScorePara.classList.add("win");
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lost.${compChoice} beats your ${userChoice}`;
        msg.classList.add("lose-msg");
        compScorePara.classList.add("lose");
    }

    setTimeout(() => {
        msg.classList.remove("win-msg", "lose-msg");
        userScorePara.classList.remove("win");
        compScorePara.classList.remove("lose");
    }, 1000);
};

const checkGameOver = () => {
    if (roundPlayed >= maxRounds) {
        let finalMsg;

        if (userScore > compScore) {
            finalMsg = "Game Over. You won the series!"
        } else if (userScore < compScore) {
            finalMsg = "Game Over. Computer won the series!"
        } else {
            finalMsg = "Game Over. It's a Tie!"
        }

        msg.innerText = finalMsg;

        choices.forEach(choice => choice.style.pointerEvents = "none");

        resetBtn.style.display = "block";
    }
};

const playGame = (userChoice) => {

    if (roundPlayed >= maxRounds)
        return;

    const compChoice = genCompChoice();
    roundPlayed++;

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }

        showWinner(userWin, userChoice, compChoice);
    }

    checkGameOver();
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    roundPlayed = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Make Your Move";
    msg.style.backgroundColor = "#222";

    choices.forEach(choice => choice.style.pointerEvents = "auto");

    resetBtn.style.display = "none";

});