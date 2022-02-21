class Game {
  constructor(numberOfPlayers) {
    this.numberOfPlayers = numberOfPlayers;
    this.currentPlayer = 0;
  }

  // all inheritors of game share the template
  run() {
    // inheritors must implement these methods so that they have their own implementation at runtime.
    // 1. start
    // 2. as long as winner not found, then take turn
    console.log(`Player ${this.winningPlayer} wins.`);
  }

  start() {}
  get haveWinner() {}
  takeTurn() {}
  get winningPlayer() {}
}

// Inheritance
class Chess extends Game {
  constructor() {
    // todo: chess has 2 players
    this.maxTurns = 10;
    this.turn = 1;
  }

  start() {
    console.log(
      `Starting a game of chess with ${this.numberOfPlayers} players.`
    );
  }

  get haveWinner() {
    // todo: when turn reaches maxTurns
  }

  takeTurn() {
    console.log(`Turn ${this.turn++} taken by player ${this.currentPlayer}.`);
    // update current player to next player
  }

  get winningPlayer() {
    // todo: is current player
  }
}

let chess = new Chess();
chess.run();
