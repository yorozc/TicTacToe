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
    let playerTurn = true;

    //allow user to input marker into gameboard via prompt
    if (playerTurn){ //if true, player 1 goes
        let index = prompt("Input spot on board that you want to fill (0-8)");
        if (!(board.canMove(index, player1.marker))){
            console.log("Spot is not empty try again!");
            
        }else{
            playerTurn = false;
        }

    }else{ //if false, player 2 goes
        let index = prompt("Input spot on board that you want to fill (0-8)");
        if (!(board.canMove(index, player2.marker))){
            console.log("Spot is not empty try again!");

        }else{
            playerTurn = true;
        }
    }

    console.log(board.getBoard())
    console.log(playerTurn)

    
}

gameFlow(gameBoard);

