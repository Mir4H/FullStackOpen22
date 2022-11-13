import { NewPatientEntry, Gender, EntryWithoutId, Type, HealthCheckRating, SickLeave, Discharge, DiagnoseEntry, NewBaseEntry } from "./types";

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

const parseItem = (value: unknown, type: string): string => {
  if(!value || !isString(value)) {
      throw new Error(`Missing or incorrect ${type}: ${value}`);
  }
  return value;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (param: any): param is Type => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Type).includes(param);
};

const parseType = (type: unknown): Type => {
  if (!type || !isType(type)) {
      throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!isRating(rating)) {
      throw new Error('Incorrect or missing rating: ' + rating);
  }
  return rating;
};

const isSickleave = (obj: unknown): obj is SickLeave => {
  return isDate((obj as SickLeave).endDate) && isDate((obj as SickLeave).startDate);
};

const parseSickleave = (obj: unknown): SickLeave => {
  if(!obj || !isSickleave(obj)) {
    throw new Error('Incorrect or missing sickleave details');
  }
  return obj;
};

const isDischarge = (obj: unknown): obj is Discharge => {
  return isDate((obj as Discharge).date) && (obj as Discharge).criteria !== undefined && (obj as Discharge).criteria !== "";
};

const parseDischarge = (obj: unknown): Discharge => {
  if(!obj || !isDischarge(obj)) {
    throw new Error('Incorrect or missing discharge details');
  }
  return obj;
};

const isDiagnosisCodes = (diagnosisCodes: unknown): diagnosisCodes is Array<DiagnoseEntry["code"]> => {
  return typeof diagnosisCodes === "object" || diagnosisCodes instanceof Array;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<DiagnoseEntry["code"]> => {
  if ( !diagnosisCodes || !isDiagnosisCodes(diagnosisCodes) ) {
    throw new Error("Incorrect or missing diagnosis codes: " + diagnosisCodes);
  }
  return diagnosisCodes;
};

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation} : Fields): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseItem(name, "name"),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseItem(ssn, "snn"),
        gender: parseGender(gender),
        occupation: parseItem(occupation, "occupation"),
    };
    return newEntry;
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

type EntryFields = {description: unknown, date: unknown, specialist: unknown, diagnosisCodes?: unknown, type: unknown, healthCheckRating?: unknown, employerName?: unknown, sickLeave?: unknown, discharge?: unknown};

const toNewBaseEntry = ({description, date, specialist, diagnosisCodes, type} : EntryFields): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
      description: parseItem(description, "description"),
      date: parseDate(date),
      specialist: parseItem(specialist, "specialist"),
      ...diagnosisCodes ? {diagnosisCodes: parseDiagnosisCodes(diagnosisCodes)} : null,
      type: parseType(type),
  };
  return newBaseEntry;
};

const toNewEntry = ({description, date, specialist, diagnosisCodes, type, healthCheckRating, employerName, sickLeave, discharge} : EntryFields): EntryWithoutId => {

  const base = {description, date, specialist, diagnosisCodes, type};
  const theBaseEntry = toNewBaseEntry(base);

  switch(theBaseEntry.type) {
    case Type.Hospital:
      const newHospitalEntry: EntryWithoutId = {
        ...theBaseEntry,
        type: Type.Hospital,
        ...discharge ? {discharge: parseDischarge(discharge)} : null,
      };
      return newHospitalEntry;
    case Type.OccupationalHealthcare:
      const newOccupationalHealthcareEntry: EntryWithoutId = {
        ...theBaseEntry,
        type: Type.OccupationalHealthcare,
        employerName: parseItem(employerName, "employerName"),
        ...sickLeave ? {sickLeave: parseSickleave(sickLeave)} : null,
      };
      return newOccupationalHealthcareEntry;
    case "HealthCheck":
      const newHealthCheckEntry: EntryWithoutId = {
        ...theBaseEntry,
        type: Type.HealthCheck,
        healthCheckRating: parseRating(healthCheckRating),
      };
      return newHealthCheckEntry;
   default:
      return assertNever(theBaseEntry.type as never);
    }
};


export {toNewPatient, toNewEntry};