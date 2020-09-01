import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

export default class DoctorsList extends Component {
  state = {
    doctors: [],
  };

  componentDidMount() {
    this.getDoctors();
  }

  async getDoctors() {
    const res = await axios.get("http://localhost:4000/api/doctores");
    this.setState({ doctors: res.data });
  }

  deleteDoctor = async (id) => {
    await axios.delete("http://localhost:4000/api/doctores/" + id);
    this.getDoctors();
  };

  render() {
    return (
      <div className="row">
        {this.state.doctors.map((doctor) => (
          <div className="col-md-4 p-2" key={doctor._id}>
            <div className="card">
              <div className="card-header d-flex justify-content-between">
                <h5>{doctor.nombre}</h5>
                <Link className="btn btn-secondary" to={"/edit/" + doctor._id}>
                  Editar
                </Link>
              </div>
              <div className="card-body">
                <p>{doctor.especialidad}</p>
                <p>{doctor.Creadopor}</p>
                <p>{doctor.Fechanac}</p>
                {/* format(doctor.Fechanac) Esto es para que de la fecha en otro formato */}
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-danger"
                  onClick={() => this.deleteDoctor(doctor._id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
