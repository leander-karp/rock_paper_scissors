function computerPlay(){
    /* Calculates the computer's move. */
    switch (Math.floor(Math.random()*3)) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}


function getRoundResult(playerSelection, computerSelection){
    /* 
    Determines the winner of a round. 
    The 0 represents a draw. 
    -1 indicates a victory of the computer.
    Finally, 1 indicates that the human won. */

    if (playerSelection == computerSelection)
        {return 0;}
    else if ((playerSelection == "rock" && computerSelection == "scissors") ||
                (playerSelection == "paper" && computerSelection == "rock") ||
                    (playerSelection=="scissors" && computerSelection=="paper"))
        {return 1;}
    else 
        {return -1;}
}   


function playRound(playerSelection, computerSelection){
    /* Plays a round rock-paper-scissors and returns a appropiate message. */
    switch (getRoundResult(playerSelection, computerSelection)) {
        case 0:
            return "Draw! Nobody wins";
        case 1:
            return `You win! ${playerSelection} beats ${computerSelection}`;
        case -1:
            return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
}


function updateCounter(selector, text, numberToAdd){
    const container = document.querySelector(selector);
    container.setAttribute("value", Number(container.getAttribute("value"))+numberToAdd);
    container.textContent = text + " " + container.getAttribute("value");
}


function displayMessage(msg){
    const container = document.querySelector("#output");
    container.textContent = msg;
}


function whoWon(maxRounds){
    const computer = document.querySelector("#computer");
    const player = document.querySelector("#player");
    if (Number(computer.getAttribute("value")) == maxRounds){
        return -1;
    }
    else if (Number(player.getAttribute("value")) == maxRounds){
        return 1;
    }
    return  0;
}  


function finalMessage(maxRounds){
    let winner = whoWon(maxRounds);
    if (winner == 1){
        displayMessage("You won!");
    }
    else if (winner==-1){
        displayMessage("You lost!");
    }
}


const roundButtons = document.querySelectorAll(".roundButton");

roundButtons.forEach( (roundButton) => {
    roundButton.addEventListener("click", function() {
        const MAX_ROUNDS = 5;
        if (whoWon(MAX_ROUNDS)==0){
            const playerSelection = roundButton.getAttribute("value");
            const computerSelection = computerPlay();
            const roundResult = getRoundResult(playerSelection, computerSelection);
            const roundResultMessage = playRound(playerSelection, computerSelection);
            
            displayMessage(roundResultMessage);

            if (roundResult==1){
                updateCounter("#player", "Player: ", 1);
                updateCounter("#computer", "Computer: ", 0);
            }
            else if (roundResult==-1){
                updateCounter("#player", "Player: ", 0);
                updateCounter("#computer", "Computer: ", 1);
            }
            finalMessage(MAX_ROUNDS);
        } 
    });
});

const resetButton = document.querySelector("#reset-button");
resetButton.addEventListener("click", function() {
    let container = document.querySelector("#player");
    container.setAttribute("value", 0);
    container.textContent = "Player: 0";

    container = document.querySelector("#computer");
    container.setAttribute("value", 0);
    container.textContent = "Computer: 0";
});
