import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class App extends Component {
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };
  componentDidMount() {
    this.getDataFromDb();
    console.log("get data called");
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  getDataFromDb = () => {
    fetch('http://localhost:4000/teams')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res }));
  };

  addNewTeam = (team) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:4000/teams', {
      id: idToBeAdded,
      team: team
    });
    toastr.success("Team " +team+" is added.");
  };



  deleteTeam = (idToDelete) => {
    console.log("deleting id" + idToDelete);
    parseInt(idToDelete);
    axios.delete(`http://localhost:4000/teams/${idToDelete}`, {
      data: {
        id: idToDelete,
      },
    });
    toastr.error("Team with id "+ idToDelete +" is deleted.");
  };

  updateDB = (idToUpdate, updateToApply) => {
    parseInt(idToUpdate);

    axios.put(`http://localhost:4000/teams/${idToUpdate}`, {
      id: idToUpdate,
      team: updateToApply,
    });
    toastr.success("Team with id "+ idToUpdate +" is updated to: " + updateToApply+".");
  };

  render() {
    const { data } = this.state;
    console.log(this.state);
    return (
      <div>
        <table border="1" className="table table-hover table-dark">
        <thead><tr><th>id</th><th>name</th></tr></thead><tbody>
          {data.map((dat) => (
                <tr key={dat.id}><td>{ dat.id }</td><td>{ dat.team }</td><td>
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
                    this.updateDB(dat.id, this.state.updateToApply)
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
        </div>
      </div>
    );
  }
}

export default App;
