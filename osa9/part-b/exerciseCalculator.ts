interface TrainingLog {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number, 
    average: number,
}

interface TrainingDetails {
    target: number,
    trainingValues: Array<number>
}

const getArguments = (args: Array<string>): TrainingDetails => {
    if (args.length < 4) throw new Error('Not enough arguments');
    let trainingStats: Array<number> = [];
    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            trainingStats.push(Number(args[i]))
        }
        else {
            throw new Error('Provided training stats were not numbers!');
        }
    }
    if (!isNaN(Number(args[2]))) {
        return {
            target: Number(args[2]),
            trainingValues: trainingStats
        }
      } else {
        throw new Error('Target value was not a number!');
      }
    }


const calculateExercises = (exercises: Array<number>, target: number) : TrainingLog => {
    const periodLength = exercises.length;
    const trainingDays = exercises.filter(hours => hours !== 0).length;
    const average = exercises.reduce((a, b) => a + b, 0) / exercises.length;
    const success = average >= target;
    const successRate = average / target * 100;
    let rating;
    let ratingDescription;
    switch(true) {
        case (successRate <= 50):
            ratingDescription = 'You could do better!';
            rating = 1;
            break;
        case (successRate > 50 && successRate <= 99):
            ratingDescription = 'Not too bad but could do better!';
            rating = 2;
            break;
        case (successRate > 99):
            ratingDescription = 'Excellent, you have reached your goals!';
            rating = 3;
            break;
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    }
}

try {
    const {target, trainingValues} = getArguments(process.argv)
    console.log(calculateExercises(trainingValues, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }

