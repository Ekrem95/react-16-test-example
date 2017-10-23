import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import ListComponent from './Src/ListComponent';
import InputArea from './Src/InputArea';
import List from './Src/List';

describe('ListComponent', () => {
  it('should render InputArea and List', () => {
    const wrapper = shallow(<ListComponent/>);
    expect(wrapper.containsAllMatchingElements([
      <InputArea/>,
      <List/>,
    ])).to.equal(true);
  });

  it('should start with an empty list', () => {
    const wrapper = shallow(<ListComponent/>);
    expect(wrapper.state('list')).to.eql([]);
  });

  it('adds items to the list', () => {
    const wrapper = shallow(<ListComponent/>);
    wrapper.instance().addItem('Eko');
    expect(wrapper.state('list')).to.eql(['Eko']);
  });

  it('passes addItem to InputArea', () => {
    const wrapper = shallow(<ListComponent/>);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;
    expect(inputArea.prop('onSubmit')).to.eql(addItem);
  });

  it('passes a bound addItem function to InputArea', () => {
    const wrapper = shallow(<ListComponent/>);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('Eko');
    expect(wrapper.state('list')).to.eql(['Eko']);
  });

  it('renders the items', () => {
    const wrapper = mount(<ListComponent/>);
    wrapper.instance().addItem('Chelsea');
    wrapper.instance().addItem('Lampard');
    expect(wrapper.find('ul').html()).to.equal(
      '<ul><li>Chelsea</li><li>Lampard</li></ul>'
    );

    // expect(wrapper.find('li').length).to.equal(2);
  });
});

describe('InputArea', () => {
  it('should contain an input and a button', () => {
    const wrapper = shallow(<InputArea/>);
    expect(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Add</button>,
    ])).to.equal(true);
  });

  it('should accept input', () => {
    const wrapper = mount(<InputArea/>);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'Eko' } });
    expect(wrapper.state('text')).to.equal('Eko');
    expect(input.html()).to.equal(
      '<input value="Eko">'
    );
  });

  it('should call onSubmit when Add is clicked', () => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
    wrapper.setState({ text: 'Chelsea' });
    const addButton = wrapper.find('button');
    addButton.simulate('click');
    expect(addItemSpy.calledOnce).to.equal(true);
    expect(addItemSpy.calledWith('Chelsea')).to.equal(true);
  });
});

describe('List', () => {
  it('should render zero items', () => {
    const wrapper = shallow(<List items={[]}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render undefined items', () => {
    const wrapper = shallow(<List items={undefined}/>);
    expect(wrapper.find('li')).to.have.length(0);
  });

  it('should render the items', () => {
    const items = ['Eko', 'Chelsea', 'Lampard'];
    const wrapper = shallow(<List items={items}/>);
    expect(wrapper.find('li')).to.have.length(3);
  });
});
