import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Gender, Patient } from "../types";

const PatientDetails = (patient: Patient) => {
  const checkGenre = (gender: Gender) => {
    if (gender === "female") return <FemaleIcon />;
    if (gender === "male") return <MaleIcon />;
    else return <TransgenderIcon />;
  };
  return (
    <>
      <h1>
        {patient.name} {checkGenre(patient.gender)}
      </h1>
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
    </>
  );
};

export default PatientDetails;
