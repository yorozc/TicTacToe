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


const gameFlow = (function () { //change this to object

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
    }

    function switchPlayers(){
        activePlayer = activePlayer === player1 ? player2 : player1
    }


    
})();

const game = gameFlow();
