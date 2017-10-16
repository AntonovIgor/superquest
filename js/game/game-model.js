import {initialGame, nextLevel, setLives, tick} from '../data/quest';

export default class GameModel {
  constructor(state = initialGame) {
    this.state = state;
  }

  nextLevel() {
    this.state = nextLevel(this.state);
  }

  tick() {
    this.state = tick(this.state);
  }

  canDie() {
    return this.state.lives > 0;
  }

  die() {
    if (this.canDie()) {
      this.state = setLives(this.state, this.state.lives - 1);
    }
  }
}
