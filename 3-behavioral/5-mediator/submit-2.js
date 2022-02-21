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
  constructor(playerName, goalsScoredSoFar) {
    this.playerName = playerName;
    this.goalsScoredSoFar = goalsScoredSoFar;
  }

  print() {
    console.log(
      `${this.playerName} has scored ` + `their ${this.goalsScoredSoFar} goal`
    );
  }
}

class Game {
  constructor() {
    // game is just an event system
    this.events = new Event();
  }
}

class Player {
  // todo: construct player:
  // his name, his game, goalsScored
  constructor(name, game) {
    this.name = name;
    this.game = game;
    this.goalsScored = 0;
  }

  score() {
    // todo: update goalsScored
    this.goalsScored++;
    // construct a playerScoredEvent ...
    const playerScoredEvent = new PlayerScoredEventArgs(
      this.name,
      this.goalsScored
    );
    // fire this event to the game
    this.game.events.fire(this, playerScoredEvent);
  }
}

class Coach {
  constructor(game) {
    this.game = game;

    // todo: sub to the game, provide a handler that do:
    // check if event is of type PlayerScoredEventArgs
    // check if goalsScoredSoFar < 3
    // if both true then celebrate

    this.game.events.subscribe((sender, event) => {
      if (
        event instanceof PlayerScoredEventArgs &&
        event.goalsScoredSoFar < 3
      ) {
        console.log(`coach says: well done, ${event.playerName}`);
      }
    });
  }
}

let game = new Game();
let player = new Player("Sam", game);
let coach = new Coach(game);

player.score();
player.score();
player.score();
