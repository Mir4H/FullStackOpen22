type Result = string;

interface Measurements {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Measurements => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validateInput = (query: any): Measurements => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { height, weight } = query;
  if (!height || !weight) {
    throw new Error("missing parameters");
  }
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight),
    };
  } else {
    throw new Error("malformatted parameters");
  }
};

export const calculateBmi = (height: number, weight: number): Result => {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) return "underweight";
  if (BMI > 24.9) return "Overweight";
  else return "Normal (healthy weight)";
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
