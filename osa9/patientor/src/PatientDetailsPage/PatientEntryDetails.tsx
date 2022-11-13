import { Patient, Entry, DiagnoseEntry } from "../types";
import EntryDetails from "./EntryDetails";
import { useStateValue } from "../state";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Card";

const PatientEntryDetails = (patient: Patient) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <>
      <h2>Entries</h2>
      {patient?.entries?.map((entry: Entry) => (
        <div key={entry.id}>
          <Box sx={{ mb: 2 }}>
            <Paper sx={{ px: 2 }} elevation={2}>
              <EntryDetails entry={entry} />
              {entry.diagnosisCodes?.length !== 0 ? (
                <>
                  <b>Diagnoses</b>
                  <ul>
                    {entry?.diagnosisCodes?.map((diagnose) => (
                      <li key={diagnose}>
                        {diagnose}:{" "}
                        <i>
                          {Object.values(diagnoses)
                            .filter((d: DiagnoseEntry) => d.code === diagnose)
                            .map((d: DiagnoseEntry) => d.name)}
                        </i>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p>Specialist: {entry.specialist}</p>
            </Paper>
          </Box>
        </div>
      ))}
    </>
  );
};

export default PatientEntryDetails;
