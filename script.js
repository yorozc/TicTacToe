const gameBoard = (function (){
    const board = ["", "", "",
                   "", "", "",
                   "", "", ""];
    return {
        getBoard: () => [...board], //clones current state of board

        resetBoard: () => board.fill(""), //empties each string element in board
        
        canMove: (index, marker) =>{
            if(board[index] == ""){
                board[index] = marker;
                return true;
            } else{
                return false;
            }
        },

        win: (name) =>{
            console.log(`${name} has won!`);
            return true;
        },

        checkWins: function(name){
            if ((board[0] && board[0] == board[1] && board[1] == board[2]) || //horizontal
                (board[3] && board[3] == board[4] && board[4] == board[5]) ||
                (board[6] && board[6] == board[7] && board[7] == board[8])){
                return this.win(name);
            }else if ((board[0] && board[0] == board[4] && board[4] == board[8]) || //diagonal
                      (board[2] && board[2] == board[4] && board[4] == board[6])){
                return this.win(name);
                
            }else if ((board[0] && board[0] == board[3] && board[3] == board[6]) || //vertical
                      (board[1] && board[1] == board[4] && board[4] == board[7]) ||
                      (board[2] && board[2] == board[5] && board[5] == board[8])){
                return this.win(name);

            }else{
                if (!board.includes("")){
                    console.log("IT'S A DRAW!");
                    gameOver = true;
                    return gameOver;
                }
            }
        }
    }
})();

function createPlayer(playerName, playerMarker){
    return {
        name: playerName,
        marker: playerMarker,
        score: 0,
        incrementScore() {
            this.score++;
        }
    }
}

const userPlay = (function() {
    
    return {
        clickCell: () =>{
            const cells = document.querySelectorAll(".cell");

            for (let i=0; i < cells.length; i++){
                cells[i].addEventListener('click', () => {
                    cells[i].textContent = 'X';
                })
            }
        }
    }

})();

function gameFlow(){

    let player1, player2;
    let activePlayer;
    let gameOver = false;

    const init = () => {
        let user1 = prompt("Please enter player one's name:", "User1");
        let user2 = prompt("Please enter player two's name:", "User2");

        player1 = createPlayer(user1, "X");
        player2 = createPlayer(user2, "O");
        activePlayer = player1;
        gameOver = false;
        gameBoard.resetBoard();
        printNewRound()    
    }

    const getGameOver = () => {return gameOver}
    

    const switchPlayers = () => {
        activePlayer = activePlayer === player1 ? player2 : player1
    }

    const printNewRound = () => {
        console.log(gameBoard.getBoard());
        console.log(`${activePlayer.name}'s turn.`);
    }

    const reset = () => {
        let reset = prompt("Do you want to restart? yes or no");
        if (reset.toLowerCase() == "y" || reset.toLowerCase() == "yes"){
            gameOver = false;
            init();
            console.log("Game restarted");
        }else{
            console.log("Game will not be restarted");
            gameOver = true;
        }
    }

    const playRound = () => {
        let index = prompt(`${activePlayer.name}, Please enter where you want to place marker (1-9)`);
        while(!gameBoard.canMove(index-1, activePlayer.marker)){
            console.log("That place is taken or is off the grid, please try again");
            index = prompt(`${activePlayer.name}, Please enter marker at valid location (1-9)`);
        }

        gameOver = gameBoard.checkWins(activePlayer.name);
        if (gameOver === true){
            console.log(gameBoard.getBoard());
            reset();
        } else{
            switchPlayers();
            printNewRound();
        }
    }

    init();

    return{
        playRound,
        getGameOver,
    }

}



userPlay.clickCell()
//let game = gameFlow();

while (!game.getGameOver()){
   game.playRound()
}

//game.playRound()
