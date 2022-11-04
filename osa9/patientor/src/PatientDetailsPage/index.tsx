import React from "react";
import axios from "axios";
//import { Box, Table, Button, TableHead, Typography } from "@material-ui/core";
import { Patient, Gender, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { getPatient } from "../state/reducer";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string}>();
  const [{ patients }, dispatch] = useStateValue();

  const patient = patients[id as string];

 const fetchPatientData = async (id: string) => {
    console.log('fetching');
    try {
        const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
        );
        dispatch(getPatient(patientFromApi));
    } catch (e) {
      console.log(e);
    }
    };
   
  if (!patient || !Object.prototype.hasOwnProperty.call(patient, 'ssn')) {
    void fetchPatientData(id as string);
    return null;
  }

  const checkGenre = (gender: Gender) => {
    if (gender === 'female')
      return <FemaleIcon/>;
    if (gender === 'male') 
      return <MaleIcon/>;
    else 
      return <TransgenderIcon/>;
  };

  return (
    <div className="App">
        <h1>{patient.name} {checkGenre(patient.gender)}</h1>
        <p>ssn: {patient.ssn}<br/>
        occupation: {patient.occupation}</p>
        {patient?.entries?.map((entry: Entry) => (
          <div key={entry.id}>
          <p>{entry.date} <i>{entry.description}</i></p>
          <ul>
            {entry?.diagnosisCodes?.map((diagnose) => (
              <li key={diagnose}>{diagnose}</li>
            ))}
          </ul>
          </div>
        ))}
    </div>
  );
};

export default PatientDetailsPage;
