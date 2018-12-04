import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import Board from '../../components/content/Board';

Enzyme.configure({ adapter: new Adapter() });
const squares = ["XO","XO","XO","XO","XO","XO","XO","XO","XO"];
const winningCombination = [0, 1, 2];
const fn = jest.fn();

test("Board should have 9 squares", () => {
  const component = mount(
    <Board
      squares={squares}
      winningCombination={winningCombination}
      turnClick={fn}
    />
  );
  expect(component.find(".board__square").length).toEqual(9);
});

test("Clicking on square should call function", () => {
  const component = mount(
    <Board
      squares={squares}
      winningCombination={winningCombination}
      turnClick={fn}
    />
  );
  component.find(".board__square").first().simulate("click");
  expect(fn).toHaveBeenCalledTimes(1);
});
