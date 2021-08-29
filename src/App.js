import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    username: [],
    password: [],
    token: [],
    loading: false,
    error: false,
  };

  async login() {
    var loginInfo = [this.state.username, this.state.password];
    this.state.loading = true;
    try {
      await axios.get(`http://projeto3-leorr.herokuapp.com/user/login`, loginInfo)
      .then(res => {
        this.setState({ token: res});
      });
    } catch (error) {
      this.setState({ error: true });
    } 
  }
  
  componentDidMount() {
  }

  render() {
    if(!this.state.loading) {
      return (
        <div>
          TODO TELA LOGIN
        </div>
      );
    } else {
      return (
        <div>Loading</div>
      )
    }
  }
}

export default App;
