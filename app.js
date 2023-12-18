const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017', {
    useNewUrlPArser: true,
    useUnifiedTypology: true,
});

const patientInfo = new mongoose.Schema ({
    patient_id: String,
    surname: String,
    other_names: String,
    gender: String,
    phone_number: String,
    residential_address: String,
    emergency_name: String,
    emergency_contact: String,
    relationship: String,
});

const Patient = mongoose.model('patient', patientInfo);

app.use (bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        const existingPatient = await patient_findOne({
            patient_id: req.body.patient_id,
        });

        if (existingPatient) {
            return res.status(400).json ({ error: 'Patient already exists'});
        }

        const newPatient = new Patient ({
            patient_id: req.body.patient_id,
            surname: req.body.surname,
            other_names: req.body.other_names,
            gender: req.body.gender,
            phone_number = req.body.gender,
            residential_address = req.body.residential_address,
            emergency_name = req.body.emergency_name,
            emergency_contact = req.body.residential_address,
            relationship = req.body.relationship,
        })

        await newPatient.save();

        res.status(201).json({message: "Patient registered succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Sorry we are currently experiencing a problem with our servers. Please try again later'});
    }
});

app.listen (PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
});