
let board = (function(){ //board.getBoard()

    let rows = 3;
    let columns = 3;

    let gameBoard = [];

    for(let i=0; i<rows; i++){
        gameBoard[i] = [];

        for(let j=0; j<columns; j++){
            gameBoard[i].push(addObjects());
        }
    }

    function getBoard() {return gameBoard}

    return {getBoard}

})();

let players =(function(){ //players.getPlayers()[0].name = 'Player1'

    let playersArray = [
        {
            name: 'Player 1',
            marker: 'O'
        },
        {
            name:'Player 2',
            marker: 'X'
        }
    ]

    function getPlayers(){
        return playersArray
    }

    return {getPlayers}
})();

function addObjects(){
    
    //value = 0 is empty cell
    //value = 'O' is player1 marker
    //value = 'X' is player2 marker 
    let value = 0;

    getValue = () => {return value}

    updateValue = (player) => {
        value = player.marker;
    }

    resetValue = () =>{
        value = 0;
    }

    return {
        getValue,
        updateValue,
        resetValue
    }
}


function gameController(){

    

    let isGameOver = false;
    let resetPlayer = false;  //after game over we have to set activeplayer to players[0]
    let turns = 0;
    let gameArray = [];

    let disableClick = false;

    // activePlayer is the player object playing current round
    let activePlayer = players.getPlayers()[0]; 
    let nextPlayer = players.getPlayers()[1];

    switchPlayer = () =>{

        if(resetPlayer){
            activePlayer = players.getPlayers()[0];
            resetPlayer = false;
        }
        else{
            activePlayer = activePlayer == players.getPlayers()[0] ? players.getPlayers()[1] : players.getPlayers()[0];

            nextPlayer = nextPlayer == players.getPlayers()[1] ? players.getPlayers()[0] : players.getPlayers()[1];
        }

    }

    displayBoardValues = () =>{

        let boardValues = board.getBoard().map((outer)=> outer.map((inner)=>inner.getValue()));
        console.log(boardValues);
    }

    displayPlayerTurn = () =>{

        if(disableClick == false){
        let markerDisplay = document.querySelector('.turn--display')
        markerDisplay.textContent = nextPlayer.marker + 's Turn';
        }
        else{ return }

    }

    checkWinner = () =>{

        let comb = [0,1,2];

        // first 2 for loops check if 3 in a row in any column or row
        // 3rd loop and 4th checks diagonaly
        // for reference the co-ordinates of board.getBoard() are
        // [ [(0,0), (0,1), (0,2)],
        // [(1,0), (1,1), (1,2)],
        // [(2,0), (2,1), (2,2)] ]

        for (let i=0; i<3; i++){
            if(board.getBoard()[i][comb[0]].getValue() == board.getBoard()[i][comb[1]].getValue() && board.getBoard()[i][comb[1]].getValue() == board.getBoard()[i][comb[2]].getValue() && board.getBoard()[i][comb[0]].getValue() != 0 ){
                console.log('Winner is' + ' ' + activePlayer.name);
                isGameOver = true;
                gameArray.push[1]
            }
        }
    
        for (let j=0; j<3; j++){
            if(board.getBoard()[comb[0]][j].getValue() == board.getBoard()[comb[1]][j].getValue() && board.getBoard()[comb[1]][j].getValue() == board.getBoard()[comb[2]][j].getValue() && board.getBoard()[comb[0]][j].getValue() != 0 ){
                console.log('Winner is' + ' ' + activePlayer.name);
                isGameOver = true;
                gameArray.push[1]
            }
        }
        for(let k=0 ; k<1; k++){
            if(board.getBoard()[k][k].getValue() == board.getBoard()[k+1][k+1].getValue() && board.getBoard()[k+1][k+1].getValue() == board.getBoard()[k+2][k+2].getValue() && board.getBoard()[k][k].getValue() != 0){
                console.log('Winner is' + ' ' + activePlayer.name);
                isGameOver = true;
                gameArray.push[1]
            }
        }
        for(let m=0; m<1; m++){
            if(board.getBoard()[m][m+2].getValue() == board.getBoard()[m+1][m+1].getValue() && board.getBoard()[m+1][m+1].getValue() == board.getBoard()[m+2][m].getValue() && board.getBoard()[m][m+2].getValue() != 0 ){
                console.log('Winner is' + ' ' + activePlayer.name);
                isGameOver = true;
                gameArray.push[1]
            }
         }
    }
    
    checkTie = () =>{
        ++turns   // so on every playGame() run, it means user has taken a turn
                  // if 9 turns are taken and there is no winner, it means we have a tie
        if(turns == 9){
            console.log('Game Tied!')
            gameArray.push[true]
        }
    }

    gameOver = () =>{

        //once game is over we change each object in board.getBoard() array, we 
        //change its value to 0. 0 means that that position in array is empty (no marker in it)
            for(let i=0; i<3; i++){
        
                for(let j=0; j<3; j++){
                    board.getBoard()[i][j].resetValue();
                }
            }
            resetPlayer = true;
            isGameOver = false;  // reset flags and turns
            turns = 0;
        
    }

    updateScreen =() => {
   
        // let play = gameController();
    
        let buttons = document.querySelectorAll('.buttons');
    
        buttons.forEach((button)=>{
    
        
            button.addEventListener('click', (event)=>{

                ++turns
    
                let row = event.target.getAttribute('row');
                let column = event.target.getAttribute('column');
    
                
                playRound(row,column);
    
                let marker = board.getBoard()[row][column].getValue();
                
                if(disableClick == false){
                event.target.textContent = marker;
                }

                if(isGameOver == true){
                    gameOver();
                    let markerDisplay = document.querySelector('.turn--display')
                    markerDisplay.textContent = 'Winner is ' + nextPlayer.marker;
                    disableClick = true;
                    checkTie();
                }
                if(turns == 9){
                    let markerDisplay = document.querySelector('.turn--display')
                    markerDisplay.textContent = 'Game Tied';
                }
            })
        })
    }

    function playRound(row, column) {

        //go to the gameBoard
        //find the object in that row and column
        //that object has three functions to update value (each object has its own value either 0, 'O' or 'X')
        //update the value by calling updateValue which sets value to activePlayers marker
        //now that objects value has been updated in the board 2D array

        //checks if cell is empty or not
        if(board.getBoard()[row][column].getValue() != 0){
            return
        }
        board.getBoard()[row][column].updateValue(activePlayer);

        //display to console whose turn it is and current marker
        displayPlayerTurn();

        //check win conditions
        checkWinner();

        //display to console an array which contains the values of the board array
        displayBoardValues();
        
        

        //check if game is tie
        //checkTie();

        //check if game is over
        //gameOver();

        //now for next round, we have to switch player
        switchPlayer();

    }

    return { updateScreen }
}

let play = gameController();

play.updateScreen();

let reset = document.querySelector('.reset')

reset.addEventListener('click', ()=>{

    location.reload(true);
    
})









