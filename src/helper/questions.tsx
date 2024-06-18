/* eslint-disable @typescript-eslint/no-explicit-any */

interface Country {
  name: {
    common: string;
  };
  capital?: string[];
  flags?: {
    png: string;
    svg: string;
  };
  currencies?: Record<string, any>;
  languages?: Record<string, any>;
  region?: string;
}

interface Question {
  question: string;
  answer: string;
  options: string[];
  type?:string
}


const shuffleQuestions = (questions: Question[]): Question[] => {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
};

const shuffleOptions = (options: string[]): string[] => {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};



const answerOptions = ({
  countries,
  answer,
  type,
}: {
  countries: Country[];
  answer: string;
  type: "capital" | "flag" |"currencies" |"region" | "languages";
}): string[] => {
  const options = [answer];
  const usedOptions = new Set([answer]);

  while (options.length < 4) {
    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    let randomOption: string | undefined;

    switch (type) {
      case "capital":
        randomOption = randomCountry.capital
          ? randomCountry.capital[0]
          : "No capital";
        break;
      case "flag":
        randomOption = randomCountry.flags
          ? randomCountry.flags.svg
          : "No flag";
        break;
      case "currencies":
        randomOption = randomCountry.currencies
          ? randomCountry.currencies[0]
          : "No currency";
          break;
        case "region":
          randomOption = randomCountry.region
            ? randomCountry.region
            : "No region";
            break;
        case "languages":
          randomOption = randomCountry.languages
            ? randomCountry.languages[0]
            : "No language";
            break;
      // Add more cases as needed
      default:
        randomOption = "Unknown";
    }

    if (randomOption && !usedOptions.has(randomOption)) {
      options.push(randomOption);
      usedOptions.add(randomOption);
    }
  }

  return shuffleOptions(options);
};


export const generateRandomQuestions = (countries: Country[]): Question[] => {
  const questions: Question[] = [];

  countries.map((country) => {
    if (country.capital && country.capital[0]) {
      const correctAnswer = country.capital[0];
      questions.push({
        question: `What is the capital of ${country.name.common}?`,
        options: answerOptions({
          countries,
          answer: correctAnswer,
          type: "capital",
        }),
        answer: correctAnswer,
        type: "capital",
      });
    }

    if ((country.flags && country.flags.svg)){
      const correctAnswer = country.flags.svg
      questions.push({
        question: `What is the flag of ${country.name.common}?`,
        options: answerOptions({
          countries,
          answer: correctAnswer,
          type: "flag",
        }),
        answer: correctAnswer,
        type: "flag",
      });
    }

    if (country.currencies && country.currencies[0]) {
      const correctAnswer = country.currencies[0]
      questions.push({
        question: `What is the currency of ${country.name.common}?`,
        options: answerOptions({
          countries,
          answer: correctAnswer,
          type: "currencies",
        }),
        answer: correctAnswer,
        type: "currencies",
      });

    }
       

    // Add more question types as needed
  });

  return shuffleQuestions(questions);
};















// contries flag
// export const QuestionsFlag = (countries: any) => {
//   const questions: { question: string; answer: any }[] = [];
//   countries.map((country: { name: { common: any }; flag: any }) => {
//     questions.push({
//       question: `What is the flag of ${country.name.common}?`,
//       answer: country.flag ? country.flag : "No flag",
//     });
//   });
//   // Shuffle the questions array
//   for (let i = questions.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [questions[i], questions[j]] = [questions[j], questions[i]];
//   }
//   return questions;
// };

// contries currency
// export const QuestionsCurrency = (countries: any) => {
//   const questions: { question: string; answer: any }[] = [];
//   countries.map((country: { name: { common: any }; currencies: any[] }) => {
//     questions.push({
//       question: `What is the currency of ${country.name.common}?`,
//       answer: country.currencies ? country.currencies[0] : "No currency",
//     });
//   });
//   // Shuffle the questions array
//   for (let i = questions.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [questions[i], questions[j]] = [questions[j], questions[i]];
//   }
//   return questions;
// };

//  contries languages
// export const QuestionsLanguage = (countries: any) => {
//   const questions: { question: string; answer: any }[] = [];
//   countries.map((country: { name: { common: any }; languages: any[] }) => {
//     questions.push({
//       question: `What is the language of ${country.name.common}?`,
//       answer: country.languages ? country.languages[0] : "No language",
//     });
//   });
//   // Shuffle the questions array
//   for (let i = questions.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [questions[i], questions[j]] = [questions[j], questions[i]];
//   }
//   return questions;
// };

// contries region
// export const QuestionsRegion = (countries: any) => {
//   const questions: { question: string; answer: any }[] = [];
//   countries.map((country: { name: { common: any }; region: any }) => {
//     questions.push({
//       question: `What is the region of ${country.name.common}?`,
//       answer: country.region ? country.region : "No region",
//     });
//   });
//   // Shuffle the questions array
//   for (let i = questions.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [questions[i], questions[j]] = [questions[j], questions[i]];
//   }
//   return questions;
// };
