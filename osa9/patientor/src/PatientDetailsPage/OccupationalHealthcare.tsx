import { OccupationalHealthcareEntry } from "../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const OccupationalHealthcare = (entry: OccupationalHealthcareEntry) => {
  return (
    <p>
      <HealthAndSafetyIcon /> <b>Occupational Healthcare visit</b>
      <br />
      {entry.date}
      <br />
      <i>{entry.description}</i>
      <br />
      <p>
        Employer: {entry.employerName}
        <br />
        {entry.sickLeave ? (
          <>
            Sickleave: from {entry.sickLeave.startDate} to{" "}
            {entry.sickLeave.endDate}
          </>
        ) : null}
      </p>
    </p>
  );
};

export default OccupationalHealthcare;
