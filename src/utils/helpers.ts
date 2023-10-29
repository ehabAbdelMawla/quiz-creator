import { Answer, Question, Quiz } from "./types";

const getId = () => new Date().getTime();

export const appendIdsToQuiz = (quiz: Quiz) => {
  const created = new Date().toISOString(),
    modified = created;

  const questions_answers = quiz.questions_answers.map((quesion: Question) => {
    const answers = quesion.answers.map((answer: Answer) => ({
      id: getId(),
      ...answer,
    }));
    return { id: getId(), ...quesion, answers };
  });
  return { id: getId(), ...quiz, modified, created, questions_answers };
};

export const updateModifiedValue = (quiz: Quiz) => {
  const modified = new Date().toISOString();

  const questions_answers = quiz.questions_answers.map((quesion: Question) => {
    const answers = quesion.answers.map((answer: Answer) => ({
      id: answer.id ?? getId(),
      ...answer,
    }));
    return { id: quesion.id ?? getId(), ...quesion, answers };
  });
  return { ...quiz, modified, questions_answers };
};
