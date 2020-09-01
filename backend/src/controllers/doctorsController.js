const doctorsCtrl = {};
const Doctor = require("../models/Doctor");

doctorsCtrl.getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

doctorsCtrl.createDoctor = async (req, res) => {
  const { nombre, especialidad, Creadopor, Fechanac } = req.body;
  const newDoctor = new Doctor({
    nombre,
    especialidad,
    Creadopor,
    Fechanac,
  });
  await newDoctor.save();
  res.json({ message: "Doctor Created" });
};

doctorsCtrl.getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  res.json(doctor);
};

doctorsCtrl.updateDoctor = async (req, res) => {
  const { nombre, especialidad, Creadopor } = req.body;
  await Doctor.findByIdAndUpdate(req.params.id, {
    nombre,
    especialidad,
    Creadopor,
  });
  res.json({ message: "Doctor actualizado" });
};

doctorsCtrl.deleteDoctor = async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.json({ message: "Doctor Eliminado" });
};

module.exports = doctorsCtrl;
