import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { getPatient } from "../state/reducer";
import PatientDetails from "./PatientDetails";
import PatientEntryDetails from "./PatientEntryDetails";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  const patient = patients[id as string];

  const fetchPatientData = async (id: string) => {
    console.log("fetching");
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(getPatient(patientFromApi));
    } catch (e) {
      console.log(e);
    }
  };

  if (!patient || !Object.prototype.hasOwnProperty.call(patient, "ssn")) {
    void fetchPatientData(id as string);
    return null;
  }

  return (
    <div className="App">
      <PatientDetails {...patient} />
      {patient.entries?.length !== 0 ? (
        <PatientEntryDetails {...patient} />
      ) : null}
    </div>
  );
};

export default PatientDetailsPage;
