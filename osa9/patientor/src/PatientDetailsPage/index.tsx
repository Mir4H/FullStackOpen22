import React from "react";
import axios from "axios";
import { Patient, Entry, Type, EntryFormValues } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { useParams } from "react-router-dom";
import { getPatient } from "../state/reducer";
import PatientDetails from "./PatientDetails";
import PatientEntryDetails from "./PatientEntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@material-ui/core";

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
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

  const submitNewPatientEntry = async (values: EntryFormValues) => {

   const baseValues = {
      description: values.description,
      date: values.date,
      specialist: values.specialist,
      type: values.type,
      diagnosisCodes: values.diagnosisCodes,
    };
    let valuesToSave;
    if (values.type === Type.Hospital) {
      values.discharge?.date
        ? (valuesToSave = {
            ...baseValues,
            discharge: values.discharge,
          })
        : (valuesToSave = {
            ...baseValues,
          });
    }
    if (values.type === Type.OccupationalHealthcare) {
      values.sickLeave?.startDate
        ? (valuesToSave = {
            ...baseValues,
            employerName: values.employerName,
            sickLeave: values.sickLeave,
          })
        : (valuesToSave = {
            ...baseValues,
            employerName: values.employerName,
          });
    }
    if (values.type === Type.HealthCheck) {
      valuesToSave = {
        ...baseValues,
        healthCheckRating: values.healthCheckRating,
      };
    }

    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id as string}/entries`,
        valuesToSave
      );
      void fetchPatientData(id as string);
      console.log(newEntry);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatientEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetailsPage;
