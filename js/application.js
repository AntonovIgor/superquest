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

export default class Application {
  static async prepareDataAndInit() {
    const splash = new SplashScreen();
    changeView(splash);
    splash.start();

    try {
      const data = await Loader.loadData();
      const questData = await adapt(data);
      Application.init(questData);
    } catch (e) {
      splash.showError(e.message);
    } finally {
      splash.stop();
    }
  }

  static init(questData) {
    Application.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questData),
      [ControllerId.SCORE]: scoreboard
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      Application.changeHash(hashValue);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id) {
    const controller = Application.routes[id];
    if (controller) {
      controller.init();
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialGame) {
    Application.routes[ControllerId.GAME].init(state);
  }

  static die(state) {
    dieScreen.init(state);
  }

  static async win(state) {
    await Loader.saveResults(state);
    location.hash = ControllerId.SCORE;
  }
}

Application.prepareDataAndInit();
