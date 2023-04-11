// maybe it needs to be inside of script tag
// const dropDown = () => {
//   const menuBtn = document.getElementById('menu');

//   menuBtn.classList.toggle('hidden');
// }

// const menu = document.querySelector('.menu');
// const menuItems = document.querySelector('.items');

// menu.addEventListener('click', event => {
//   menuItems.classList.toggle('hidden');
// })

// namespace
const App = {
  $: {
    menu: document.querySelector('[data-id="menu"]'),
    menuItems: document.querySelector('[data-id="menu-items"]'),
    resetBtn: document.querySelector('[data-id="reset-btn"]'),
    newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
    squares: document.querySelectorAll('[data-id="square"]'),
    turn: document.querySelector('[data-id="turn"]')
  },

  state: {
    // currentPlayer: 1,
    moves: []
  },

  getGameStatus(moves) {

    const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId);
    const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId);

    // Winning Patterns
    const winningPatterns = [
      [1, 2, 3],
      [1, 5, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 5, 7],
      [3, 6, 9],
      [4, 5, 6],
      [7, 8, 9]
    ];

    let winner = null;

    winningPatterns.forEach(pattern => {
      const p1Wins = pattern.every(v => p1Moves.includes(v));
      const p2Wins = pattern.every(v => p2Moves.includes(v));

      // p1Wins ? 1 : p2Wins ? 2
      if(p1Wins) winner = 1
      if (p2Wins) winner = 2
    })

    return {
      status: moves.length === 9 || winner != null ? 'complete' : 'in-progress',
      winner 
    }
  },

  init() {
    App.$.menu.addEventListener('click', event => {
      App.$.menuItems.classList.toggle('hidden');
    });

    App.$.resetBtn.addEventListener('click', event => {
      
    });

    App.$.newRoundBtn.addEventListener('click', event => {

    });

    App.$.squares.forEach(square => {
      square.addEventListener('click', event => {
        console.log(`Current player is ${App.state.currentPlayer}`);
        // const turn = document.querySelector('[data-id="turn"]');

        const hasMove = (squareId) => {
          const existingMove = App.state.moves.find(
            (move) => move.squareId === squareId
          );
          return existingMove !== undefined;
        }

        if (hasMove(+square.id)) {
          return;
        }

        const lastMove = App.state.moves.at(-1);
        const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
        const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);

        const icon = document.createElement('i');
        // const paragraph = document.createElement('p');
        // const currentPlayer = App.state.currentPlayer;

        if (currentPlayer === 1) {
          icon.classList.add('fa-solid', 'fa-x', 'turquoise');
          // paragraph.innerText = 'Player 1, Your Turn!';
        }
        else {
          icon.classList.add('fa-solid', 'fa-o', 'yellow');
          // paragraph.innerText = 'PLayer 2, Your Turn!';
        }

        App.state.moves.push({
          squareId: +square.id,
          playerId:  currentPlayer
        });

        // App.state.currentPlayer = currentPlayer === 1 ? 2 : 1;

        square.replaceChildren(icon);
        // turn.replaceChildren(icon ,paragraph);

        // <i class="fa-solid fa-x turquoise"></i>
        // <p>Player 1, you're up!</p>

        const game = App.getGameStatus(App.state.moves);
        
        if (game.status === 'complete') {
          if (game.winner) {
            alert(`Player ${game.winner} wins!!!`);
          }
          else {
            alert('Tie');
          }
        }
      });
    });
  }
}

window.addEventListener('load', () => App.init());