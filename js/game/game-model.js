import {getLevel, nextLevel, quest, setLives, tick} from '../data/quest';

export default class GameModel {
  constructor(data = quest) {
    this.data = data;
  }

  update(newState) {
    this.state = newState;
    return this.state;
  }

  getCurrentLevel() {
    return getLevel(this.state.level, this.data);
  }

  nextLevel() {
    this.update(nextLevel(this.state, this.data));
  }

  tick() {
    this.update(tick(this.state));
  }

  canDie() {
    return this.state.lives > 0;
  }

  die() {
    if (this.canDie()) {
      this.update(setLives(this.state, this.state.lives - 1));
    }
  }
}
