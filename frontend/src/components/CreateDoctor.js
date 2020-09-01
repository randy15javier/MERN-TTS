import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateDoctor extends Component {
  state = {
    users: [],
    userSelected: "",
    nombre: "",
    especialidad: "",
    date: new Date(),
    editing: false,
    _id: "",
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/usuarios");
    this.setState({
      users: res.data.map((user) => user.nombre),
      userSelected: res.data[0].nombre,
    });
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/doctores/" + this.props.match.params.id
      );
      this.setState({
        nombre: res.data.nombre,
        especialidad: res.data.especialidad,
        date: new Date(res.data.Fechanac),
        userSelected: res.data.Creadopor,
        editing: true,
        _id: this.props.match.params.id,
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();
    const newDoctor = {
      nombre: this.state.nombre,
      especialidad: this.state.especialidad,
      Creadopor: this.state.userSelected,
      Fechanac: this.state.date,
    };
    if (this.state.editing) {
      await axios.put(
        "http://localhost:4000/api/doctores/" + this.state._id,
        newDoctor
      );
    } else {
      await axios.post("http://localhost:4000/api/doctores", newDoctor);
    }
    window.location.href = "/";
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onChangeDate = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h3>Crear un nuevo doctor</h3>

          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={this.state.userSelected}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              name="nombre"
              onChange={this.onInputChange}
              value={this.state.nombre}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              name="especialidad"
              className="form-control"
              placeholder="Especialidad"
              onChange={this.onInputChange}
              value={this.state.especialidad}
              required
            ></textarea>
          </div>

          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
