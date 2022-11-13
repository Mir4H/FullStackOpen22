import { OccupationalHealthcareEntry } from "../types";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const OccupationalHealthcare = (entry: OccupationalHealthcareEntry) => {
  return (
    <div>
      <HealthAndSafetyIcon /> <b>Occupational Healthcare visit</b>
      <br />
      {entry.date}
      <br />
      <i>{entry.description}</i>
      <br />
      <p>
        Employer: {entry.employerName}
        <br />
        {entry.sickLeave?.startDate ? (
          <>
            Sickleave: from {entry.sickLeave.startDate} to{" "}
            {entry.sickLeave.endDate}
          </>
        ) : null}
      </p>
    </div>
  );
};

export default OccupationalHealthcare;
