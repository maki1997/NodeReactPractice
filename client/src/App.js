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
    toastr.success("Team added");
  };



  deleteTeam = (idToDelete) => {
    console.log("deleting id" + idToDelete);
    parseInt(idToDelete);
    axios.delete(`http://localhost:4000/teams/${idToDelete}`, {
      data: {
        id: idToDelete,
      },
    });
    toastr.error("Team with id "+ idToDelete +" is deleted");
  };

  updateDB = (idToUpdate, updateToApply) => {
    parseInt(idToUpdate);

    axios.put(`http://localhost:4000/teams/${idToUpdate}`, {
      id: idToUpdate,
      team: updateToApply,
    });
    toastr.success("Team with id "+ idToUpdate +" updated to: " + updateToApply);
  };

  render() {
    const { data } = this.state;
    console.log(this.state);
    return (
      <div>
        <table border="1" className="table table-hover table-dark">
        <thead><tr><th>id</th><th>name</th></tr></thead><tbody>
          {data.map((dat) => (
                <tr key={dat.id}><td>{ dat.id }</td><td>{ dat.team }</td></tr>
              ))}
        </tbody></table>
        <div style={{ padding: '10px' }}>
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
        <div style={{ padding: '10px' }}>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ idToDelete: e.target.value })}
            placeholder="id of team you want to delete"
          /><br/>
          <button className="form-control" onClick={() => this.deleteTeam(this.state.idToDelete)}>
            DELETE
          </button><hr/>
        </div>
        <div style={{ padding: '10px' }}>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ idToUpdate: e.target.value })}
            placeholder="id of item to update here"
          /><br/>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ updateToApply: e.target.value })}
            placeholder="put new value of the item here"
          /><br/>
          <button
            className="form-control"
            onClick={() =>
              this.updateDB(this.state.idToUpdate, this.state.updateToApply)
            }
          >
            UPDATE
          </button>
        </div>
      </div>
    );
  }
}

export default App;
