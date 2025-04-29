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


function gameFlow(board){
    //prompt user for player name and assign marker
    let user1 = prompt("Please enter player one's name:", "User1");
    let user2 = prompt("Please enter player two's name:", "User2");

    const player1 = createPlayer(user1, "X");
    const player2 = createPlayer(user2, "O");

    console.log(player1)
    console.log(player2)
    
}

gameFlow(gameBoard.board);