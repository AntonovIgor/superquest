import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import {initialGame} from './data/quest';
import GameOverScreen from './gameover/gameover';
import scoreboard from './scoreboard/scoreboard';

const winScreen = scoreboard;
const dieScreen = new GameOverScreen(false);

export default class Application {
  static showWelcome() {
    welcomeScreen.init();
  }

  static startGame(state = initialGame) {
    gameScreen.init(state);
  }

  static die(state) {
    dieScreen.init(state);
  }

  static win(state) {
    winScreen.init(state);
  }
}
