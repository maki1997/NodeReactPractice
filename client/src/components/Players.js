import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { Redirect as Redirect } from 'react-router-dom';

class Players extends Component {
  state = {
    players: [],
    teams: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };
  componentDidMount() {
    this.getPlayers();
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

  getPlayers = () => {
    fetch('http://localhost:4000/players',{headers:{"Authorization":localStorage.getItem("token")}},)
      .then((players) => players.json())
      .then((res) => this.setState({ players: res }))
      .catch(error => {
          this.setState({isLoggedOut:true});
          });;
    fetch('http://localhost:4000/teams',{headers:{"Authorization":localStorage.getItem("token")}},)
      .then((teams) => teams.json())
      .then((res) => this.setState({ teams: res }))
      .catch(error => {
          this.setState({isLoggedOut:true});
          });;
  };



  addPlayer = (firstname,lastname,teamName) => {
    console.log(localStorage.getItem("token"));
    axios.post('http://localhost:4000/players',{
      firstname: firstname,
      lastname: lastname,
      teamName: teamName
    })
    toastr.success("Player " +firstname+" "+ lastname+" is added.");
  };





  logout = () => {
    localStorage.removeItem("token");
    this.setState({isLoggedOut:true});
  }

  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to = {{ pathname: "/" }} />;
    };
    const { players } = this.state;
    const { teams } = this.state;
    console.log(this.state);
    return (
      <div>
        <table border="1" className="table table-hover table-dark">
        <thead><tr><th>firstname</th><th>lastname</th><th>team</th></tr></thead><tbody>
          {players.map((dat) => (
                <tr key={dat.id}><td>{ dat.firstname }</td><td>{ dat.lastname }</td><td>{ dat.team.name }</td></tr>
              ))}
        </tbody></table>
        <div style={{ padding: '10px',width: '50%',margin: '0 auto' }}>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ firstname: e.target.value })}
            placeholder="Firstname..."
          /><br/>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ lastname: e.target.value })}
            placeholder="Lastname..."
          /><br/>
          <select className="form-control" onChange={(e) => this.setState({ teamName: e.target.value })}>
            {teams.map((dat => (
              <option key={dat.id} value={dat.name}>{dat.name}</option>
            )))}
          </select><br/>
          <button className="form-control" onClick={() => this.addPlayer(this.state.firstname,this.state.lastname,this.state.teamName)}>
            ADD
          </button>
          <hr/>
          <button className="form-control" onClick={() => this.logout()}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Players;
