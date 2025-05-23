const gameBoard = (function (){
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];

    function win(name){
        name = name.toUpperCase();
        const winner = document.querySelector(".winner");
        const message = document.getElementById("winnerMsg");
        message.textContent = `${name} IS THE WINNER!`;
        winner.style.display = "flex";
        console.log(`${name} has won!`);
        return true;
    }

    return {
        getBoard: () => console.log([...board]), //clones current state of board

        resetBoard: () => board.fill(""), //empties each string element in board
        
        canMove: (index, marker) =>{
            if(board[index] == ""){
                board[index] = marker;
                return true;
            } else{
                return false;
            }
        },

        checkWins: function(name){
            if ((board[0] && board[0] == board[1] && board[1] == board[2]) || //horizontal
                (board[3] && board[3] == board[4] && board[4] == board[5]) ||
                (board[6] && board[6] == board[7] && board[7] == board[8])){
                return win(name);
            }else if ((board[0] && board[0] == board[4] && board[4] == board[8]) || //diagonal
                      (board[2] && board[2] == board[4] && board[4] == board[6])){
                return win(name);
                
            }else if ((board[0] && board[0] == board[3] && board[3] == board[6]) || //vertical
                      (board[1] && board[1] == board[4] && board[4] == board[7]) ||
                      (board[2] && board[2] == board[5] && board[5] == board[8])){
                return win(name);

            }else{
                if (!board.includes("")){
                    const draw = document.querySelector(".draw");
                    const message = document.getElementById("drawMsg");
                    message.textContent = `IT'S A DRAW!`;
                    draw.style.display = "flex";
                    console.log("IT'S A DRAW!");
                    return true;
                }
            }
        }
    }
})();

function createPlayer(playerName, playerMarker){
    return {
        name: playerName,
        marker: playerMarker
    }
}

const userPlay = (function() {
    const container = document.querySelector(".tic-tac-toeContainer");
    return {
        clickCell: () =>{
            return new Promise((resolve) => {
                const handler = (event) => {
                    if (event.target.classList.contains("cell") && event.target.textContent === ""){
                        const element = event.target;
                        const symbol = document.createElement("p");
                        element.appendChild(symbol);
                        const selected = event.target.getAttribute("data-number");
                        container.removeEventListener("click", handler);
                        resolve({selected, symbol});
                    }
                };
                container.addEventListener("click", handler);
            });
           
        },
    }

})();

function gameFlow(){

    let player1, player2;
    let activePlayer;
    let gameOver = false;

    const init = () => {
        resetGrid();
        let user1 = prompt("Please enter player one's name:", "User1");
        let user2 = prompt("Please enter player two's name:", "User2");

        player1 = createPlayer(user1, "X");
        player2 = createPlayer(user2, "O");
        activePlayer = player1;
        gameOver = false;
        printNewRound()    
    }

    const resetGrid = () => {
        const winner = document.querySelector(".winner");
        winner.style.display = "none";
        const draw = document.querySelector(".draw");
        draw.style.display = "none";
        const grid = document.querySelectorAll(".cell");
        for(let i=0; i < grid.length; i++){
            grid[i].textContent = "";
        }
        gameBoard.resetBoard();
    }    

    const switchPlayers = () => {
        activePlayer = activePlayer === player1 ? player2 : player1
    }

    const printNewRound = () => {
        gameBoard.getBoard();
        console.log(`${activePlayer.name}'s turn.`);
    }

    const reset = () => {
        let reset = prompt("Do you want to restart? yes or no");
        if (reset.toLowerCase() == "y" || reset.toLowerCase() == "yes"){
            gameOver = false;
            init();
            playRound();
            console.log("Game restarted");
        }else{
            console.log("Game will not be restarted");
            gameOver = true;
        }
    }

    const playRound = async () => {
        const {selected, symbol} = await userPlay.clickCell();
        symbol.textContent = activePlayer.marker;
        const index = parseInt(selected);
        
       
        if (!gameBoard.canMove(index-1, activePlayer.marker)){
            console.log("Invalid move. Click another square.");
            //make glow red and shake really hard
            return playRound();
        }

        gameOver = gameBoard.checkWins(activePlayer.name);
        if (gameOver === true){
            gameBoard.getBoard();
            
        }else{
            switchPlayers();
            printNewRound();
            playRound();
        }
    }
    return{
        playRound,
        init,
        reset,
    }
}

let game = gameFlow();

function startGame(){
    game.init();
    game.playRound();
}

function resetGame(){
    game.reset();
}

// switch mode button
const toggleButton = document.querySelector(".switch-mode");
const githubLogo = document.getElementById("github-logo");
const img1 = "resources/github-mark-white.png";
const img2 = "resources/github-mark.png";
toggleButton.addEventListener('click', () =>{
    document.body.classList.toggle('dark-mode');
    githubLogo.src = (githubLogo.src.includes(img1)) ? img2 : img1;
});