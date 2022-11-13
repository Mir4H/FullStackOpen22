import patientData from '../../data/patients';
import { PublicPatient, NewPatientEntry, Patient, EntryWithoutId, Entry } from '../types';
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

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry
    };

    patientData.find(patient => patient.id === patientId)?.entries.push(newEntry);
    return newEntry;

};

export default {addPatient, getEntries, getAllButSsn: getPublicPatient, addEntry};
