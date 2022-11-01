import { CoursePart } from "../types";
import Parts from "./Parts";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => (
          <Parts key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;
