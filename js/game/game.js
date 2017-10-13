import {initialGame, nextLevel, Result, setLives, tick} from '../data/quest';
import LevelView from './level-view';
import {changeView} from '../util';
import gameover from '../gameover/gameover';

const changeLevel = (state) => {
  const level = new LevelView(state);

  let timer;
  const startTimer = () => {
    timer = setTimeout(() => {
      state = tick(state);
      level.updateTime(state.time);
      startTimer();
    }, 1000);
  };
  startTimer();

  level.onAnswer = (answer) => {
    clearTimeout(timer);
    switch (answer.result) {
      case Result.DIE:
        const deadScreen = gameover(false);
        deadScreen.onRepeat = () => {
          changeView(changeLevel(setLives(state, state.lives - 1)));
        };
        changeView(deadScreen);
        break;
      case Result.WIN:
        const winScreen = gameover(true);
        winScreen.onRepeat = () => {
          changeView(changeLevel(initialGame));
        };
        changeView(winScreen);
        break;
      case Result.NEXT:
        changeView(changeLevel(nextLevel(state)));
        break;
      default:
        throw new Error(`Unknown result ${answer.result}`);
    }
  };
  return level;
};

export default () => changeLevel(initialGame);
