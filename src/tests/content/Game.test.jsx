import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import Game from '../../components/content/Game';

Enzyme.configure({ adapter: new Adapter() });

test("Clicking on square should change text", () => {
  const component = mount( <Game/> );

  component.find(".board__square").first().simulate('click');
  const square = component.find('.board__square').first();

  expect(square.text()).toEqual('O');
});

test("Player shouldn't win", () => {
  const component = mount( <Game/> );

  component.find(".board__square").first().simulate('click');
  component.find(".board__square").at(1).simulate('click');
  component.find(".board__square").at(3).simulate('click');

  expect(component.state("winner")).toBe("You lost");
});

test("Player should tie", () => {
  const component = mount( <Game/> );
  
  component.find(".board__square").first().simulate('click');
  component.find(".board__square").at(1).simulate('click');
  component.find(".board__square").at(6).simulate('click');
  component.find(".board__square").at(5).simulate('click');
  component.find(".board__square").at(8).simulate('click');

  expect(component.state("winner")).toBe("It's a tie!");
});

test("Player should tie", () => {
  const component = mount( <Game/> );
  
  component.find(".board__square").first().simulate('click');
  component.find(".board__square").at(1).simulate('click');
  component.find(".board__square").at(3).simulate('click');
  component.find(".restart__button").simulate('click');

  expect(component.state("winner")).toBe("");
});