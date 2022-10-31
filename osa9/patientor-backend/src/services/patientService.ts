import patientData from '../../data/patients';
import { PatientEntry, OmitSsn, NewPatientEntry } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<PatientEntry> => {
    return patientData;
};

const getAllButSsn = (): OmitSsn[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatient = {
        id: uuid(),
        ...entry
    };

    patientData.push(newPatient);
    return newPatient;
};

export default {addPatient, getEntries, getAllButSsn};
