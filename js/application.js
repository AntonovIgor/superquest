import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import {initialGame} from './data/quest';
import GameOverScreen from './gameover/gameover';
import scoreboard from './scoreboard/scoreboard';
import Loader from './loader';
import SplashScreen from './splash/splash-screen';
import adapt from './data/quest-adapter';
import {changeView} from './util';

const dieScreen = new GameOverScreen(false);

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  SCORE: `score`
};

const saveState = (state) => {
  return JSON.stringify(state);
};

const loadState = (dataString) => {
  try {
    return JSON.parse(dataString);
  } catch (e) {
    return initialGame;
  }
};

export default class Application {
  static init(questData) {
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questData),
      [ControllerId.SCORE]: scoreboard
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      Application.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];
    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialGame) {
    location.hash = `${ControllerId.GAME}?${saveState(state)}`;
  }

  static die(state) {
    dieScreen.init(state);
  }

  static win(state) {
    location.hash = `${ControllerId.SCORE}?${saveState(state)}`;
  }
}

const splash = new SplashScreen();
changeView(splash);
splash.start();

Loader.loadData().
  then(adapt).
  then((questData) => Application.init(questData)).
  then(() => splash.stop()).
  catch(window.console.error);
