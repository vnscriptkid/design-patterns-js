class Event {
  constructor() {
    this.handlers = new Map();
    this.count = 0;
  }

  subscribe(handler) {
    this.handlers.set(++this.count, handler);
    return this.count;
  }

  unsubscribe(idx) {
    this.handlers.delete(idx);
  }

  fire(sender, args) {
    this.handlers.forEach(function (v, k) {
      v(sender, args);
    });
  }
}

class PlayerScoredEventArgs {
  // todo: construct event that contains playerName and goalsScoredSoFar

  print() {
    console.log(
      `${this.playerName} has scored ` + `their ${this.goalsScoredSoFar} goal`
    );
  }
}

class Game {
  constructor() {
    // game is just an event system
  }
}

class Player {
  // todo: construct player:
  // his name, his game, goalsScored

  score() {
    // todo: update goalsScored
    // construct a playerScoredEvent ...
    // fire this event to the game
  }
}

class Coach {
  constructor(game) {
    this.game = game;

    // todo: sub to the game, provide a handler that do:
    // check if event is of type PlayerScoredEventArgs
    // check if goalsScoredSoFar < 3
    // if both true then celebrate
    // console.log(`coach says: well done, ${args.playerName}`);
  }
}

let game = new Game();
let player = new Player("Sam", game);
let coach = new Coach(game);

player.score();
player.score();
player.score();
