const gameBoard = (function (){
    const board = ["x", "o", "x",
                   "x", "o", "x",
                   "x", "o", "x"];

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

gameBoard.resetBoard();
console.log(gameBoard.getBoard())

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


function gameFlow(board){
    
}

gameFlow(gameBoard.board);