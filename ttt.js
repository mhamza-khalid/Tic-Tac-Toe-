
let board = (function () { //board.getBoard()

    let rows = 3;
    let columns = 3;

    let gameBoard = [];

    for (let i = 0; i < rows; i++) {
        gameBoard[i] = [];

        for (let j = 0; j < columns; j++) {
            gameBoard[i].push(addObjects());
        }
    }

    function getBoard() { return gameBoard }

    return { getBoard }

})();


function addObjects() {

    //value = 0 is empty cell
    //value = 'O' is player1 marker
    //value = 'X' is player2 marker 
    let value = 0;

    getValue = () => { return value }

    updateValue = (player) => {
        value = player.marker;
    }

    resetValue = () => {
        value = 0;
    }

    return {
        getValue,
        updateValue,
        resetValue
    }
}

let players = (function () { //players.getPlayers()[0].name = 'Player1'

    let playersArray = [
        {
            name: 'Player 1',
            marker: 'O',
            winCount: 0,
        },
        {
            name: 'Player 2',
            marker: 'X',
            winCount: 0,
        }
    ]


    return playersArray
})();


function gameController() {

    //closure variables
    let activePlayer = players[0]; 
    let winnerFlag = false;
    let noOfTurns = 0;
    let roundNumber = 1;

    getTurnsNo = () => {return noOfTurns}

    setTurnsNo = () => {noOfTurns = 0}

    getWinnerFlag = () => {return winnerFlag}

    setWinnerFlag = () => {winnerFlag = false}

    getActivePlayer = () => { return activePlayer };

    switchPlayer = () => {

        activePlayer = activePlayer == players[0] ? players[1] : players[0];

    }

    displayPlayer = () => {
        console.log('Its ' + activePlayer.name + ' turn' + ' ' + 'with marker ' + activePlayer.marker)
        
    }

    displayBoardValues = () => {

        let boardValues = board.getBoard().map(outer => outer.map(inner => inner.getValue()))
        console.log(boardValues);
    }

    clearBoard = () =>{
            
     for (let i=0; i<3; i++){
         for (let j=0; j<3; j++){
             board.getBoard()[i][j].resetValue();
         }
     }
    }

    checkTie = () =>{
        if(noOfTurns == 9 && winnerFlag == false){
            console.log('Game Tied!');
            clearBoard();
            //noOfTurns = 0;
            //++roundNumber;
        }
    }

    checkWinner = () => {
        let comb = [0, 1, 2];
        // console.log(comb);
        // first 2 for loops check if 3 in a row in any column or row
        // 3rd loop and 4th checks diagonaly
        // for reference the co-ordinates of board.getBoard() are
        // [ [(0,0), (0,1), (0,2)],
        // [(1,0), (1,1), (1,2)],
        // [(2,0), (2,1), (2,2)] ]
        for (let i = 0; i < 3; i++) {
            if (board.getBoard()[i][comb[0]].getValue() == board.getBoard()[i][comb[1]].getValue() && board.getBoard()[i][comb[1]].getValue() == board.getBoard()[i][comb[2]].getValue() && board.getBoard()[i][comb[0]].getValue() != 0) {
                console.log('Winner is' + ' ' + activePlayer.name);
                activePlayer.winCount += 1;
                clearBoard();
                winnerFlag = true;
                noOfTurns = 0;  // each round has max 9 turns
                ++roundNumber;  //move to next round
                alert(activePlayer.name + ' Wins this round')
            }
        }
        for (let j = 0; j < 3; j++) {
            if (board.getBoard()[comb[0]][j].getValue() == board.getBoard()[comb[1]][j].getValue() && board.getBoard()[comb[1]][j].getValue() == board.getBoard()[comb[2]][j].getValue() && board.getBoard()[comb[0]][j].getValue() != 0) {
                console.log('Winner is' + ' ' + activePlayer.name);
                activePlayer.winCount += 1;
                clearBoard();
                winnerFlag = true;
                noOfTurns = 0;
                ++roundNumber;
                alert(activePlayer.name + ' Wins this round')
            }
        }
        for (let k = 0; k < 1; k++) {
            if (board.getBoard()[k][k].getValue() == board.getBoard()[k + 1][k + 1].getValue() && board.getBoard()[k + 1][k + 1].getValue() == board.getBoard()[k + 2][k + 2].getValue() && board.getBoard()[k][k].getValue() != 0) {
                console.log('Winner is' + ' ' + activePlayer.name);
                activePlayer.winCount += 1;
                clearBoard();
                winnerFlag = true;
                noOfTurns = 0;
                ++roundNumber;
                alert(activePlayer.name + ' Wins this round')
            }
        }
        for (let m = 0; m < 1; m++) {
            if (board.getBoard()[m][m + 2].getValue() == board.getBoard()[m + 1][m + 1].getValue() && board.getBoard()[m + 1][m + 1].getValue() == board.getBoard()[m + 2][m].getValue() && board.getBoard()[m][m + 2].getValue() != 0) {
                console.log('Winner is' + ' ' + activePlayer.name);
                activePlayer.winCount += 1;
                clearBoard();
                winnerFlag = true;
                noOfTurns = 0;
                ++roundNumber;
                alert(activePlayer.name + ' Wins this round')
            }
        }

    }

    showRound = () =>{
        console.log('Round Number: ' + roundNumber);
    }

    showPoints = () =>{
        console.log(players[0].name + ' score:' + players[0].winCount)
        console.log(players[1].name + ' score:' + players[1].winCount)
    }

    function playGame(row, column, currentPlayer) {
        //ensures cell isn't occupied
        if (board.getBoard()[row][column].getValue() == 0) {

            board.getBoard()[row][column].updateValue(getActivePlayer());
            ++noOfTurns;

            //displayPlayer();
            showRound();
            showPoints();

            displayBoardValues();
            checkWinner();
            checkTie();
            switchPlayer();

        }
        else { return }
    }

    return { playGame, displayPlayer, getActivePlayer, getWinnerFlag, setWinnerFlag, checkTie,getTurnsNo, setTurnsNo, clearBoard}
}

formLoad();

function formLoad(){

    let modal = document.querySelector('#modal');
    let form = document.querySelector('.form');

    let player1NameDisplay = document.querySelector('#name1');
    let player1MarkerDisplay = document.querySelector('#marker1');
    let player1ScoreDisplay = document.querySelector('#score1');

    

    let player2NameDisplay = document.querySelector('#name2');
    let player2MarkerDisplay = document.querySelector('#marker2');
    let player2ScoreDisplay = document.querySelector('#score2');

    

    modal.showModal();

    form.addEventListener('submit', (event)=>{
        
        let playerOneName = document.querySelector('#player1Name').value;
        let playerTwoName = document.querySelector('#player2Name').value;

        let display = document.querySelector('.turn--display');

        let playerOneMarker = document.querySelector('#markerOne').value;
        let playerTwoMarker = document.querySelector('#markerTwo').value;

        

        if(playerOneMarker == playerTwoMarker){
            alert('Both players cant have the same markers!')
            event.preventDefault();
        }else{
        players[0].name = playerOneName;
        players[1].name = playerTwoName;

        players[0].marker = playerOneMarker;
        players[1].marker = playerTwoMarker;

        player1NameDisplay.textContent = playerOneName;
        player2NameDisplay.textContent = playerTwoName;

        player1MarkerDisplay.textContent = "Marker:" + "'"  + playerOneMarker + "'";
        player2MarkerDisplay.textContent = "Marker:" + "'" + playerTwoMarker + "'";

        player1ScoreDisplay.textContent = 'Score: 0'
        player2ScoreDisplay.textContent = 'Score: 0'

        display.textContent = 'Its ' + players[0].name + "'s" + ' turn';
        }
    })
}

modal.addEventListener('keydown', function(event) {
    
    if (event.keyCode === 27) {
        
        event.preventDefault();
    }
});


let play = gameController();

let cells = document.querySelectorAll('.buttons')

cells.forEach((cell)=>{

    cell.addEventListener('click', (event)=>{

        let row = event.target.getAttribute('row');
        let column = event.target.getAttribute('column');

        if (board.getBoard()[row][column].getValue() == 0){

        let playerMarker = play.getActivePlayer().marker;
        
        let display = document.querySelector('.turn--display');
        

        play.displayPlayer();
        play.playGame(row, column);

        let playerName = play.getActivePlayer().name;
        event.target.textContent = playerMarker;

        display.textContent = 'Its ' + playerName + "'s" + ' turn';

        if(play.getWinnerFlag()){
            cells.forEach((cell) =>{
                cell.textContent = '\u00a0';
            })
            play.setWinnerFlag();
            let player1ScoreDisplay = document.querySelector('#score1');
            let player2ScoreDisplay = document.querySelector('#score2');

            player1ScoreDisplay.textContent = 'Score: '+ players[0].winCount;
            player2ScoreDisplay.textContent = 'Score: '+ players[1].winCount;
        }
        if(play.getTurnsNo() == 9 && play.getWinnerFlag() == false){
            alert('Game Tied!');
            cells.forEach((cell) =>{
                cell.textContent = '\u00a0';
            })
            play.setTurnsNo();
        }
      }
      else {return}
    })
})

let reset = document.querySelector('.reset')

reset.addEventListener('click', ()=>{
    let cells = document.querySelectorAll('.buttons');
    cells.forEach((cell) =>{
        cell.textContent = '\u00a0';
    })
    play.clearBoard();
    players[0].winCount = 0;
    players[1].winCount = 0;
    let player1ScoreDisplay = document.querySelector('#score1');
    let player2ScoreDisplay = document.querySelector('#score2');

    player1ScoreDisplay.textContent = 'Score: '+ players[0].winCount;
    player2ScoreDisplay.textContent = 'Score: '+ players[1].winCount;
})

let restart = document.querySelector('.restart')

restart.addEventListener('click', ()=>{
    location.reload();
})








// play.playGame(0, 2);  // Tie Game moves
// play.playGame(1, 2);
// play.playGame(2, 2);
// play.playGame(2, 1);
// play.playGame(2, 0);
// play.playGame(1, 1);
// play.playGame(1, 0);
// play.playGame(0, 0);
// play.playGame(0, 1);

// play.playGame(0,0);    // O wins moves
// play.playGame(0,1);
// play.playGame(1,0);
// play.playGame(1,1);
// play.playGame(2,0);












