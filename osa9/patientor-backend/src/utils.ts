import { NewPatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
  };

const parseItem = (item: unknown): string => {
    if(!item || !isString(item)) {
        throw new Error('Name missing or incorrect');
    }
    return item;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation} : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseItem(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseItem(ssn),
        gender: parseGender(gender),
        occupation: parseItem(occupation)
    };
    return newEntry;
};

export default toNewPatient;