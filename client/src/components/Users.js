import React, { Component } from 'react';
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { Redirect } from 'react-router-dom';

class Users extends Component {
  state = {
    users: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  };
  componentDidMount() {
    this.getUsers();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getUsers, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }



  getUsers = () => {
    fetch('http://localhost:4000/v1/users',{headers:{"Authorization":localStorage.getItem("token")}})
      .then((users) => users.json())
      .then((res) => this.setState({ users: res }))
      .catch(error => {
          this.setState({isLoggedOut:true});
          });;;
  };


  addNewUser = (username,password,role,myTeam) => {
    console.log(username + password + role + myTeam);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    axios.post('http://localhost:4000/v1/users', {
      username: username,
      password: password,
      role: role,
      myTeam: myTeam
    });
    toastr.success("User " +username+" is added.");
  };



  deleteUser = (idToDelete) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    console.log("deleting id" + idToDelete);
    parseInt(idToDelete);
    axios.delete(`http://localhost:4000/v1/users/${idToDelete}`, {
      users: {
        id: idToDelete,
      },
    });
    toastr.error("User with id "+ idToDelete +" is deleted.");
  };

  updateUser = (idToUpdate, updateToApply) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    parseInt(idToUpdate);
    axios.put(`http://localhost:4000/v1/users/${idToUpdate}`, {
      id: idToUpdate,
      username: updateToApply,
    });
    toastr.success("User with id "+ idToUpdate +" is updated to: " + updateToApply+".");
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({isLoggedOut:true});
  }




  render() {
    if (this.state.isLoggedOut) {
      return <Redirect to = {{ pathname: "/" }} />;
    };
    const { users } = this.state;
    console.log(users);
    console.log(this.state);
    return (
      <div>
        <table border="1" className="table table-hover table-dark">
        <thead><tr><th>name</th><th>role</th><th>my team</th><th></th></tr></thead><tbody>
          {users.map((dat) => (
                <tr key={dat.id}><td>{ dat.username }</td><td>{ dat.role }</td><td>{ dat.myTeam.name }</td><td>
                <div>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => this.setState({ updateToApply: e.target.value })}
                  placeholder="Update user's username to..."
                /><br/>
                <button
                  style={{ display: 'block',margin: 'auto' }}
                  className="btn btn-info"
                  onClick={() =>
                    this.updateUser(dat.id, this.state.updateToApply)
                  }
                >
                  UPDATE
                </button>
                </div></td><td><button style={{ display: 'block',margin: 'auto' }} className="btn btn-danger" onClick={() => this.deleteUser(dat.id)}>
                  DELETE
                </button></td></tr>
              ))}
        </tbody></table>
        <div style={{ padding: '10px',width: '50%',margin: '0 auto' }}>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ username: e.target.value })}
            placeholder="username..."
          /><br/>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="password..."
          /><br/>
          <select className="form-control" onChange={(e) => this.setState({ role: e.target.value })}>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>
          </select><br/>
          <input
            className="form-control"
            type="text"
            onChange={(e) => this.setState({ myTeam: e.target.value })}
            placeholder="team..."
          /><br/>
          <button className="form-control" onClick={() => this.addNewUser(this.state.username,this.state.password,this.state.role,this.state.myTeam)}>
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

export default Users;
