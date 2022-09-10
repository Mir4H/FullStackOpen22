const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ parts }) => {
  const total = parts.reduce((sum, item) => {
    console.log("Sum", sum);
    console.log("Item", item);
    return sum + item.exercises;
  }, 0)
  return <p style={{fontWeight: 'bold'}}>Total of {total} exercises</p>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <p>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </p>
  );
};

const Course = ({ course }) => (
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

export default Course;
