import React, { Component } from 'react';
import axios from 'axios';
import 'toastr/build/toastr.min.css';
import { Redirect } from 'react-router-dom';

class App extends Component {
  state = {
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null
  };

  componentDidMount() {

    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getTeams, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  login = (username,password) => {
    axios.post('http://localhost:4000/v1/login', {
      username: username,
      password: password
    }).then(function(res){
        if (res.status === 200) {
          localStorage.setItem("token",res.data);
          console.log(JSON.stringify(res));
        }
     })
     .then((res)=>this.setState({ isLogged: true }))


  };

  render() {
    if (this.state.isLogged) {
      return <Redirect to = {{ pathname: "/teams" }} />;
    };
    console.log(this.state);
    return (
      <div style={{ padding: '10px',width: '37%',margin: '18% auto' }}>
      <input
        className="form-control"
        type="text"
        onChange={(e) => this.setState({ username: e.target.value })}
        placeholder="Username..."
      /><br/>
      <input
        className="form-control"
        type="password"
        onChange={(e) => this.setState({ password: e.target.value })}
        placeholder="Password..."
      /><br/>
      <button className="form-control" onClick={() => this.login(this.state.username,this.state.password)}>
        LOGIN
      </button>
      </div>
    );
  }
}

export default App;
