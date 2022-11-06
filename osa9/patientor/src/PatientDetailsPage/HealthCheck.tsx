import { HealthCheckEntry } from "../types";
import SickIcon from "@mui/icons-material/Sick";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import HealingIcon from "@mui/icons-material/Healing";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";

const healthRating = (rating: number) => {
  switch (rating) {
    case 0:
      return <FavoriteIcon color="success" />;
    case 1:
      return <HealingIcon color="info" />;
    case 2:
      return <HeartBrokenIcon color="warning" />;
    case 3:
      return <SickIcon color="error" />;
    default:
      return null;
  }
};

const HealthCheck = (entry: HealthCheckEntry) => {
  return (
    <p>
      <MedicalInformationIcon /> <b>Health Check visit</b>
      <br />
      {entry.date}
      <br />
      <i>{entry.description}</i> {healthRating(entry.healthCheckRating)}
    </p>
  );
};

export default HealthCheck;
