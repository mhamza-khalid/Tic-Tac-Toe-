
const gameBoard = (function () {  //IIFE creating object gameBoard that is returning gameboard array
  
  let tempBoard = document.querySelectorAll('.child'); // select all 9 board tiles
  board = Array.from(tempBoard);   
  return {board};

})();

const playerFactory = (name, marker) => {   //Factory function creating the 2 players

  return {name, marker};

}

const modal = document.querySelector("#modal");
const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".form");

openModal.addEventListener("click", () => {
  modal.showModal();
});

closeModal.addEventListener("submit", (e) => {
  e.preventDefault();

  var oneName = document.getElementById('playerOne');
  var twoName = document.getElementById('playerTwo');

  const player1Name = document.getElementById('name1').value;
  const player1Marker = document.getElementById('marker1').value;

  const player2Name = document.getElementById('name2').value;
  const player2Marker = document.getElementById('marker2').value;

  const player1 = playerFactory(player1Name, player1Marker);   //2 players
  const player2 = playerFactory(player2Name, player2Marker);
  modal.close();

  oneName.innerHTML = 'Player1:&nbsp' + player1Name + '&nbsp&nbsp' + player1Marker;
  twoName.innerHTML = 'Player2:&nbsp' + player2Name + '&nbsp&nbsp' + player2Marker;

  displayController(player1,player2,gameBoard);  // function call
});


function displayController(player1,player2,gameBoard) {  // function to control logic

  var playerTurn = Math.round(Math.random());    // 0 -> Player1's Turn     1 -> Player2's Turn
  
  if(playerTurn === 0){alert(player1.name + ' ' + 'starts the game!')}
  else if(playerTurn === 1){alert(player2.name + ' ' +'starts the game!')}
    const position = document.querySelectorAll('.child');

    boardPosition = Array.from(position);

    boardPosition.forEach((element, index) => {      // loop over each button in gamebaord

      element.addEventListener("click", () => {

        if (playerTurn === 0){

        gameBoard.board[index].innerHTML = player1.marker;    //add player1 marker
        gameBoard.board[index].disabled = true;               //disable used block of gamebaord
        
          if((gameBoard.board[0].innerHTML === player1.marker && gameBoard.board[1].innerHTML === player1.marker && gameBoard.board[2].innerHTML === player1.marker)
              ||(gameBoard.board[3].innerHTML === player1.marker && gameBoard.board[4].innerHTML === player1.marker && gameBoard.board[5].innerHTML === player1.marker )
              || (gameBoard.board[6].innerHTML === player1.marker && gameBoard.board[7].innerHTML === player1.marker && gameBoard.board[8].innerHTML === player1.marker)
              || (gameBoard.board[0].innerHTML === player1.marker && gameBoard.board[3].innerHTML === player1.marker && gameBoard.board[6].innerHTML === player1.marker)
              || (gameBoard.board[1].innerHTML === player1.marker && gameBoard.board[4].innerHTML === player1.marker && gameBoard.board[7].innerHTML === player1.marker)
              || (gameBoard.board[2].innerHTML === player1.marker && gameBoard.board[5].innerHTML === player1.marker && gameBoard.board[8].innerHTML === player1.marker)
              || (gameBoard.board[0].innerHTML === player1.marker && gameBoard.board[4].innerHTML === player1.marker && gameBoard.board[8].innerHTML === player1.marker)
              || (gameBoard.board[2].innerHTML === player1.marker && gameBoard.board[4].innerHTML === player1.marker && gameBoard.board[6].innerHTML === player1.marker))
          {
                 const winMessage = document.querySelector('#winnerModal');
                 winMessage.showModal();
                 winMessage.innerHTML += 'Winner is' + ' ' + player1.name + '!';
                 const restart = document.querySelector('#refresh');
                 restart.addEventListener('click', ()=>{
      
                    location.reload();
                  
                 })
          }
          else if(gameBoard.board[0].innerHTML !== '' && gameBoard.board[1].innerHTML !== '' && gameBoard.board[2].innerHTML !== '' && gameBoard.board[3].innerHTML !== '' && gameBoard.board[4].innerHTML !== '' && gameBoard.board[5].innerHTML !== '' && gameBoard.board[6].innerHTML !== '' && gameBoard.board[7].innerHTML !== '' && gameBoard.board[8].innerHTML !== '')
          {
            const winMessage = document.querySelector('#winnerModal');
            winMessage.showModal();
            winMessage.innerHTML += 'Game Tied!';
            const restart = document.querySelector('#refresh');
                 restart.addEventListener('click', ()=>{
      
                    location.reload();
                  
                 })
          }

        playerTurn = playerTurn + 1;                 //handover turn to Player2

        }

        else if(playerTurn === 1){

          gameBoard.board[index].innerHTML = player2.marker;    //add player2 marker
          gameBoard.board[index].disabled = true;          //disable used block of gamebaord

           
          if((gameBoard.board[0].innerHTML === player2.marker && gameBoard.board[1].innerHTML === player2.marker && gameBoard.board[2].innerHTML === player2.marker)
              ||(gameBoard.board[3].innerHTML === player2.marker && gameBoard.board[4].innerHTML === player2.marker && gameBoard.board[5].innerHTML === player2.marker )
              || (gameBoard.board[6].innerHTML === player2.marker && gameBoard.board[7].innerHTML === player2.marker && gameBoard.board[8].innerHTML === player2.marker)
              || (gameBoard.board[0].innerHTML === player2.marker && gameBoard.board[3].innerHTML === player2.marker && gameBoard.board[6].innerHTML === player2.marker)
              || (gameBoard.board[1].innerHTML === player2.marker && gameBoard.board[4].innerHTML === player2.marker && gameBoard.board[7].innerHTML === player2.marker)
              || (gameBoard.board[2].innerHTML === player2.marker && gameBoard.board[5].innerHTML === player2.marker && gameBoard.board[8].innerHTML === player2.marker)
              || (gameBoard.board[0].innerHTML === player2.marker && gameBoard.board[4].innerHTML === player2.marker && gameBoard.board[8].innerHTML === player2.marker)
              || (gameBoard.board[2].innerHTML === player2.marker && gameBoard.board[4].innerHTML === player2.marker && gameBoard.board[6].innerHTML === player2.marker))
              {
                const winMessage = document.querySelector('#winnerModal');
                winMessage.showModal();
                winMessage.innerHTML += 'Winner is' + ' ' + player2.name + '!';
                const restart = document.querySelector('#refresh');
                 restart.addEventListener('click', ()=>{
      
                    location.reload();
                  
                 })
              }
              else if(gameBoard.board[0].innerHTML !== '' && gameBoard.board[1].innerHTML !== '' && gameBoard.board[2].innerHTML !== '' && gameBoard.board[3].innerHTML !== '' && gameBoard.board[4].innerHTML !== '' && gameBoard.board[5].innerHTML !== '' && gameBoard.board[6].innerHTML !== '' && gameBoard.board[7].innerHTML !== '' && gameBoard.board[8].innerHTML !== '')
          {
            const winMessage = document.querySelector('#winnerModal');
            winMessage.showModal();
            winMessage.innerHTML += 'Game Tied!';
            const restart = document.querySelector('#refresh');
                 restart.addEventListener('click', ()=>{
      
                    location.reload();
                  
                 })
          }
          playerTurn = playerTurn - 1;                //handover turn to Player1
        }
        
      })
    });
    
}




