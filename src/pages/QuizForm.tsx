import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { quizFormInputs } from "../utils/constants";
import { Input, QiuzFormInputsKeys, Question, Quiz } from "../utils/types";
import AnswersFieldArray from "../components/AnswersFieldArray";
import { useDispatch, useSelector } from "react-redux";
import { AddQuiz, updateQuiz } from "../redux/slices/quizes";
import { appendIdsToQuiz, updateModifiedValue } from "../utils/helpers";
import { useNavigate, useParams } from "react-router-dom";
import { AppState } from "../redux/store";
import { Button } from "primereact/button";
export default function QuizForm() {
  const params = useParams();
  const { quizes } = useSelector((state: AppState) => state.quizes);
  const [quiz, _] = useState(quizes.find((q: Quiz) => q.id == params?.id));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialFormValues: Quiz = {
    title: "",
    description: "",
    url: "",
    questions_answers: [
      { text: "", feedback_false: "", feedback_true: "", answers: [] },
    ],
  };

  const isEdit = () => {
    return params.id;
  };

  const {
    register,
    getValues,
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<Quiz>({
    defaultValues: isEdit() ? quiz : initialFormValues,
  });
  const {
    fields: questions,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions_answers",
  });

  const onSubmit = (data: Quiz) => {
    if (isEdit()) {
      dispatch(updateQuiz(updateModifiedValue(data)));
    } else {
      dispatch(AddQuiz(appendIdsToQuiz(data)));
    }

    navigate("/");
  };

  useEffect(() => {
    if (isEdit() && !quiz) {
      navigate("/");
    }
  }, []);

  return (
    <section className="qiuz-form-container">
      <h3>{isEdit() ? "Update" : "Add New"} Quiz</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {quizFormInputs.map((input: Input) => (
          <div key={input.key} className="form-control">
            <label htmlFor={input.key}>{input.label}</label>
            <InputText
              id={input.key}
              type={input.type}
              placeholder={input.placeholder}
              {...register(QiuzFormInputsKeys[input.key], {
                required: `${input.label} is required`,
              })}
              autoComplete={"off"}
            />
          </div>
        ))}
        <div className="divider"></div>
        <div className="questions-array-container">
          <label className="title">Questions</label>
          <div className="questioins-list">
            {questions.map((question: Question, index: number) => (
              <div className="question-item" key={index}>
                <h4>{`Question ${index + 1}`}</h4>
                <div className="form-control">
                  <label htmlFor={`questions_answers.${index}.text`}>
                    {`Enter Question Text `}
                  </label>
                  <InputText
                    className="input"
                    id={`questions_answers.${index}.text`}
                    type="text"
                    defaultValue={question.text}
                    {...register(`questions_answers.${index}.text`, {
                      required: true,
                    })}
                    autoComplete="off"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor={`questions_answers.${index}.feedback_false`}>
                    {`Enter Question Feed back False`}
                  </label>
                  <InputText
                    className="input"
                    id={`questions_answers.${index}.feedback_false`}
                    type="text"
                    defaultValue={question.feedback_false}
                    {...register(`questions_answers.${index}.feedback_false`, {
                      required: true,
                    })}
                    autoComplete="off"
                  />
                </div>
                <div className="form-control">
                  <label htmlFor={`questions_answers.${index}.feedback_true`}>
                    {`Enter Question Feed back True `}
                  </label>
                  <InputText
                    className="input"
                    id={`questions_answers.${index}.feedback_true`}
                    type="text"
                    defaultValue={question.feedback_true}
                    {...register(`questions_answers.${index}.feedback_true`, {
                      required: true,
                    })}
                    autoComplete="off"
                  />
                </div>
                <div className="divider"></div>
                <div className="answers">
                  <label className="title"> Answers</label>
                  <AnswersFieldArray
                    control={control}
                    questionIndex={index}
                    register={register}
                    getValues={getValues}
                  />
                </div>
                <Button
                  className="rm-question icon"
                  type="button"
                  disabled={questions.length === 1}
                  onClick={() => {
                    if (questions.length > 1) {
                      removeQuestion(index);
                    }
                  }}
                  icon={"pi pi-trash"}
                ></Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            className="add-question"
            icon={"pi pi-plus"}
            onClick={() =>
              appendQuestion({
                text: "",
                feedback_false: "",
                feedback_true: "",
                answers: [],
              })
            }
          >
            Add Question
          </Button>
        </div>
        <div className="submition-container">
          <Button
            icon={"pi pi-check"}
            className="submit-btn"
            type="submit"
            label="Save"
          />
        </div>
      </form>
    </section>
  );
}
