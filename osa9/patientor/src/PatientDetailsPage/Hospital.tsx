import { HospitalEntry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const Hospital = (entry: HospitalEntry) => {
  return (
    <p>
      <LocalHospitalIcon /> <b>Hospital visit</b>
      <br />
      {entry.date}
      <br />
      <i>{entry.description}</i>
      <p>
        <b>Discharge</b>
        <br />
        date: {entry.discharge.date}
        <br />
        criteria: {entry.discharge.criteria}
      </p>
    </p>
  );
};

export default Hospital;
