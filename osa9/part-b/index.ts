import express from "express";
import { calculateBmi, validateInput } from "./bmiCalculator";
import {
  calculateExercises,
  validateExerciseStats,
} from "./exerciseCalculator";
const app = express();
app.use(express.json());

const catchError = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error);
};

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get(`/bmi`, (req, res) => {
  try {
    const { height, weight } = validateInput(req.query);
    const result = {
      height: height,
      weight: weight,
      bmi: calculateBmi(height, weight),
    };
    res.json(result);
  } catch (error) {
    const msg = catchError(error);
    res.status(400).json({ error: msg });
  }
});

app.post("/exercises", (req, res) => {
  try {
    const { daily_exercises, target } = validateExerciseStats(req.body);
    res.status(200).json(calculateExercises(daily_exercises, target));
  } catch (error) {
    const msg = catchError(error);
    res.status(400).json({ error: msg });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
