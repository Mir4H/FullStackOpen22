import patientData from '../../data/patients';
import { PatientEntry, OmitSsn } from '../types';

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

export default {getEntries, getAllButSsn};
