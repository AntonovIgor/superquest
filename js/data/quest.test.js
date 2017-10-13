import assert from 'assert';
import {initialGame, nextLevel, setLives} from './quest';

describe(`Game`, () => {
  describe(`Character lives`, () => {

    it(`should change`, () => {
      assert.equal(1, setLives(initialGame, 1).lives);
    });

    it(`should fail on negative values`, () => {
      const setNegativeLives = () => {
        setLives(initialGame, -1);
      };

      assert.throws(setNegativeLives);
    });

    it(`should have 3 lives by default`, () => {
      assert.strictEqual(3, initialGame.lives);
    });
  });

  describe(`Level change`, () => {

    it(`should change level`, () => {
      assert.equal(1, nextLevel(initialGame).level);
      assert.equal(2, nextLevel(nextLevel(initialGame)).level);
    });

    it(`0 should be first level`, () => {
      assert.equal(0, initialGame.level);
    });

  });
});
