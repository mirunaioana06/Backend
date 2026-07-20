const pool = require('../../db');
const queries = require('./queries');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;

        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            return res.status(404).send('Student does not exist.');
        }

        res.status(200).json(results.rows);
    });
};

const addStudent = (req, res) => {
    const { name, email, age, dob } = req.body;

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) throw error;

        if (results.rows.length) {
            return res.status(409).send('Email already exists.');
        }

        pool.query(queries.addStudent, [name, email, age, dob], (error) => {
            if (error) throw error;
            res.status(201).send('Student created successfully!');
        });
    });
};

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;

        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            return res.status(404).send('Student does not exist.');
        }

        pool.query(queries.removeStudent, [id], (error) => {
            if (error) throw error;
            res.status(200).send('Student removed successfully.');
        });
    });
};

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;

        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            return res.status(404).send('Student does not exist.');
        }

        pool.query(queries.updateStudent, [name, id], (error) => {
            if (error) throw error;
            res.status(200).send('Student updated successfully.');
        });
    });
};

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent,
};
