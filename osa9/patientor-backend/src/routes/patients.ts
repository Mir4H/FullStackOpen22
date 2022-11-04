import express from "express";
import patientService from '../services/patientService';
import toNewPatient from '../utils';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getAllButSsn());
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patients = patientService.getEntries();
    const patient = patients.find(p => p.id === id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).json('Patient not found');
    }
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});


export default router;