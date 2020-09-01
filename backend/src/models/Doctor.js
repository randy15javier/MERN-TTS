const { Schema, model } = require("mongoose");

const doctorSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    especialidad: {
      type: String,
      required: true,
    },
    Creadopor: {
      type: String,
    },
    Fechanac: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Doctor", doctorSchema);
