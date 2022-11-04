import patientData from '../../data/patients';
import { PublicPatient, NewPatientEntry, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getEntries = (): Array<Patient> => {
    return patientData;
};

const getPublicPatient = (): PublicPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...entry
    };

    patientData.push(newPatient);
    return newPatient;
};

export default {addPatient, getEntries, getAllButSsn: getPublicPatient};
