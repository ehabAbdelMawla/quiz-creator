import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { Answer } from "../utils/types";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
export default function AnswersFieldArray({
  control,
  questionIndex,
  register,
  getValues,
}: {
  control: any;
  questionIndex: any;
  register: any;
  getValues: any;
}) {
  const {
    fields: answers,
    append: appendAnswer,
    remove: removeAnswer,
    update,
  } = useFieldArray({
    control,
    name: `questions_answers.${questionIndex}.answers`,
  });

  const isChecked = (
    questionIndex: any,
    index: number
  ): boolean | undefined => {
    const { questions_answers } = getValues();
    return questions_answers[questionIndex].answers[index].is_true;
  };

  useEffect(() => {
    if (!answers.length) appendAnswer({ text: "", is_true: true });
  }, []);

  return (
    <article className="question-answers-container">
      {answers.map((answer: any, index: number) => (
        <div className="item" key={index}>
          <h4>{`Answer ${index + 1}`}</h4>
          <div className="form-control">
            <label
              htmlFor={`questions_answers.${questionIndex}.answers.${index}.text`}
            >
              {`Enter Text`}
            </label>
            <InputText
              className="input"
              id={`questions_answers.${questionIndex}.answers.${index}.text`}
              type="text"
              defaultValue={""}
              {...register(
                `questions_answers.${questionIndex}.answers.${index}.text`,
                {
                  required: true,
                }
              )}
              autoComplete="off"
            />
          </div>
          <div className="form-control">
            <label
              className="inline"
              htmlFor={`questions_answers.${questionIndex}.answers.${index}.is_true`}
            >
              {`Is True`}
            </label>

            <RadioButton
              inputId={`questions_answers.${questionIndex}.answers.${index}.is_true`}
              name={`questions_answers.${questionIndex}.answers`}
              value={index}
              onChange={(e) => {
                const { questions_answers } = getValues();
                questions_answers[questionIndex].answers.forEach(
                  (answer: Answer, answerIndex: number) => {
                    update(answerIndex, {
                      ...answer,
                      is_true: answerIndex === index,
                    });
                  }
                );
              }}
              checked={isChecked(questionIndex, index)}
            />
          </div>

          <Button
            className="rm-answer icon"
            type="button"
            disabled={answers.length === 1}
            onClick={() => {
              if (answers.length > 1) {
                removeAnswer(index);
              }
            }}
            icon={"pi pi-trash"}
          ></Button>
        </div>
      ))}
      <Button
        type="button"
        className="add-answer"
        icon={"pi pi-plus"}
        onClick={() =>
          appendAnswer({
            text: "",
            is_true: false,
          })
        }
      >
        Add Answer
      </Button>
    </article>
  );
}
