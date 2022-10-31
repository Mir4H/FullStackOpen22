import diagnoseData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): Array<DiagnoseEntry> => {
    return diagnoseData;
};

export default getEntries;