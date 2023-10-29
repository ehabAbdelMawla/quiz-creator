export enum QiuzFormInputsKeys {
  title = "title",
  description = "description",
  url = "url",
  questions_answers = "questions_answers",
}
export type Input = {
  key: QiuzFormInputsKeys;
  label: string;
  type: string;
  placeholder: string;
};

export type Question = {
  id?: number;
  answer_id?: number;
  text: string;
  feedback_false: string;
  feedback_true: string;
  answers: Answer[];
};

export type Answer = {
  id?: number;
  text: string;
  is_true: boolean;
};

export type Quiz = {
  id?: number;
  title: string;
  description: string;
  score?: number;
  url: string;
  questions_answers: Question[];
  created?: string;
  modified?: string;
};
