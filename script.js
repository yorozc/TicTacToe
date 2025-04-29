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


function gameFlow (){

    let player1, player2;
    let activePlayer;
    let gameOver = false;

    function init(){
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
    

    function switchPlayers(){
        activePlayer = activePlayer === player1 ? player2 : player1
    }

    const printNewRound = () => {
        console.log(gameBoard.getBoard());
        console.log(`${activePlayer.name}'s turn.`);
    }

    function playRound(){
        let index = prompt(`${activePlayer.name}, Please enter where you want to place marker (1-9)`);
        while(!gameBoard.canMove(index-1, activePlayer.marker)){
            console.log("That place is taken or is off the grid, please try again");
            index = prompt(`${activePlayer.name}, Please enter marker at valid location (1-9)`);
        }
        //logic to check for wins
        switchPlayers();
        printNewRound();
    }
    init()

    return{
        playRound,
        getGameOver,
    }
    
};

let game = gameFlow();

while (game.getGameOver){
    game.playRound()
}
