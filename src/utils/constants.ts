import { Input, QiuzFormInputsKeys } from "./types";

export const quizFormInputs: Input[] = [
  {
    key: QiuzFormInputsKeys.title,
    label: "Quiz Title",
    type: "text",
    placeholder: "Enter Quiz Title",
  },
  {
    key: QiuzFormInputsKeys.description,
    label: "Quiz Description",
    type: "text",
    placeholder: "Enter Quiz Description",
  },
  {
    key: QiuzFormInputsKeys.url,
    label: "Quiz Url",
    type: "url",
    placeholder: "Enter Quiz Url",
  },
];
