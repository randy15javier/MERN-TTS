import React, { Component } from "react";
import axios from "axios";

export default class CreateUser extends Component {
  state = {
    users: [],
    nombre: "",
  };

  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/usuarios");
    this.setState({ users: res.data });
  };

  onChangeNombre = (e) => {
    this.setState({
      nombre: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/api/usuarios", {
      nombre: this.state.nombre,
    });
    this.setState({ nombre: "" });
    this.getUsers();
  };

  deleteUser = async (id) => {
    await axios.delete("http://localhost:4000/api/usuarios/" + id);
    this.getUsers();
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Crear nuevo usuario</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  value={this.state.nombre}
                  onChange={this.onChangeNombre}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {this.state.users.map((user) => (
              <li
                className="list-group-item list-group-item-action"
                key={user._id}
                onDoubleClick={() => this.deleteUser(user._id)}
              >
                {user.nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
