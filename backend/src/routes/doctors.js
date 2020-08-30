const { Router } = require('express');
const router = Router();
const { getDoctors, createDoctor, getDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorsController');

router.route('/')
    .get(getDoctors)
    .post(createDoctor);

router.route('/:id')
    .get(getDoctor)
    .put(updateDoctor)
    .delete(deleteDoctor)

module.exports = router;