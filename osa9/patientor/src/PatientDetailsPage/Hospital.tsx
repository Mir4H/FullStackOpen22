import { HospitalEntry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const Hospital = (entry: HospitalEntry) => {
  return (
    <div>
      <LocalHospitalIcon /> <b>Hospital visit</b>
      <br />
      {entry.date}
      <br />
      <i>{entry.description}</i>
      {entry.discharge ? (
        <p>
          <b>Discharge</b>
          <br />
          date: {entry.discharge.date}
          <br />
          criteria: {entry.discharge.criteria}
        </p>
      ) : null}
    </div>
  );
};

export default Hospital;
