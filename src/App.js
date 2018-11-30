import React, { Component } from 'react';
import Table from './Table';
import './App.css';
import './table.css';
import Backend from './Backend.js';
import Button from './Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      isToggle: true,
      list: null
    };
  }

  loadData() {
    const {url} = this.props;
    Backend(url).then(data => {
      this.setState({
        data: data,
        list: this.getListUsers(data),
        isToggle: false
      });
    });
  }

  getListUsers = (data) => {
    const users = [];
    data.forEach(user => {
      let arr = [];
      arr.push(
        user.id,
        user.firstName,
        user.lastName,
        user.phone,
        user.email
      );
      users.push(arr);
    });
    return users;
  };

  onButtonClick = () => {
    this.loadData();
  };

  render() {
    return (
      <div className="App">
        <Button
          onButtonClick={this.onButtonClick}
          isToggle={this.state.isToggle}
        />
        {this.state.data && <Table data={this.state.data} list={this.state.list}/>}
      </div>
    )
  }
}

export default App;
