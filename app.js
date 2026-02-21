let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Boolean use for changing players turn.
let turnO = true; 

// These are all the winner conditions.
const winConditions = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

];

// Function to reset the game.
const resetGame = () => {
    turnO = true;
    enableBoxes ();
    msgContainer.classList.add("hide");
};

// Function that track the players turns and run checkWinner function.
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO){
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

// Function that disable all the boxes after a one player win the game.
const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

// Function that enable the boxes when game is restart.
const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

// Function to display winner.
const showWinner = (winner) => {
    msg.innerText = `Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

// fucntion to check draw condition.
const checkDraw = () =>
    { let isDraw = true; 
    for(let box of boxes){ 
        if (box.innerText === ""){ 
            isDraw = false; 
            break; 
        } 
    } 
    if(isDraw){ 
        msg.innerText = "It's a draw!"; 
        msgContainer.classList.remove("hide"); 
        disableBoxes(); 
    } 
};

// Function to check the winner.
const checkWinner = () => {
    let winnerFound = false;

    for(let condition of winConditions) {
        let pos1Val = boxes[condition[0]].innerText;
        let pos2Val = boxes[condition[1]].innerText;
        let pos3Val = boxes[condition[2]].innerText;
        
        // Condition to check all the entries are equal.
        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                winnerFound = true;
                break;
            }
        }
    }
    //if no winner, check for draw.
    if(!winnerFound){
        checkDraw();
    }
};

// Reset and newGame.
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);