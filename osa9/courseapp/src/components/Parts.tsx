import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Parts = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b><br/>
          <i>{part.description}</i>
        </p>
      );
    case "groupProject":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b><br/>
          group projects {part.groupProjectCount}
        </p>
      );
    case "submission":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b><br/>
          <i>{part.description}</i><br/>
          submit to {part.exerciseSubmissionLink}
        </p>
      );
    case "special":
      return (
        <p>
          <b>
            {part.name} {part.exerciseCount}
          </b><br/>
          <i>{part.description}</i><br/>
          required skills: {part.requirements.join(", ")}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Parts;
