import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import { Redirect } from 'react-router-dom';

class Teams extends Component {
  state = {
    teams: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };
  componentDidMount() {
    this.getTeams();
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

  getTeams = () => {
    fetch('http://localhost:4000/teams',{headers:{"Authorization":localStorage.getItem("token")}},)
      .then((teams) => teams.json())
      .then((res) => this.setState({ teams: res }))
      .catch(error => {
          this.setState({isLoggedOut:true});
          });;
  };



  addNewTeam = (team) => {
    console.log(localStorage.getItem("token"));
    axios.post('http://localhost:4000/teams',{
      name: team
    })
    toastr.success("Team " +team+" is added.");
  };



  deleteTeam = (idToDelete) => {
    console.log("deleting id" + idToDelete);
    parseInt(idToDelete);
    axios.delete(`http://localhost:4000/teams/${idToDelete}`,{headers:{"Authorization":localStorage.getItem("token")}}, {
      teams: {
        id: idToDelete,
      },
    });
    toastr.error("Team with id "+ idToDelete +" is deleted.");
  };

  updateTeam = (idToUpdate, updateToApply) => {
    parseInt(idToUpdate);

    axios.put(`http://localhost:4000/teams/${idToUpdate}`, {
      id: idToUpdate,
      name: updateToApply,
    });
    toastr.success("Team with id "+ idToUpdate +" is updated to: " + updateToApply+".");
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({isLoggedOut:true});
  }

  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to = {{ pathname: "/" }} />;
    };
    const { teams } = this.state;
    console.log(this.state);
    return (
      <div>
        <table border="1" className="table table-hover table-dark">
        <thead><tr><th>id</th><th>name</th></tr></thead><tbody>
          {teams.map((dat) => (
                <tr key={dat.id}><td>{ dat.id }</td><td>{ dat.name }</td><td>
                <div>

                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => this.setState({ updateToApply: e.target.value })}
                  placeholder="Update team name to..."
                /><br/>
                <button
                  style={{ display: 'block',margin: 'auto' }}
                  className="btn btn-info"
                  onClick={() =>
                    this.updateTeam(dat.id, this.state.updateToApply)
                  }
                >
                  UPDATE
                </button>
                </div></td><td><button style={{ display: 'block',margin: 'auto' }} className="btn btn-danger" onClick={() => this.deleteTeam(dat.id)}>
                  DELETE
                </button></td></tr>
              ))}
        </tbody></table>
        <div style={{ padding: '10px',width: '50%',margin: '0 auto' }}>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ team: e.target.value })}
            placeholder="Add new team..."
          /><br/>
          <button className="form-control" onClick={() => this.addNewTeam(this.state.team)}>
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

export default Teams;
