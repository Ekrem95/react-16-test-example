import React, { Component } from 'react';
import InputArea from './InputArea';
import List from './List';

export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.addItem = this.addItem.bind(this);
  }

  addItem(name) {
    this.setState({
      list: [].concat(this.state.list).concat([name]),
    });
  }

  render() {
    return (
      <div>
        <InputArea onSubmit={this.addItem}/>
        <List items={this.state.list}/>
      </div>
    );
  }
}
