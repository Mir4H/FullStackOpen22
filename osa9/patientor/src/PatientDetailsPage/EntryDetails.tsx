import { Entry } from "../types";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital {...entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare {...entry} />;
    case "HealthCheck":
      return <HealthCheck {...entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
