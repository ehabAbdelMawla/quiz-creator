import React from "react";
import { Quiz } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";

export default function QuizView({ quiz }: { quiz: Quiz }) {
  const navigate = useNavigate();
  return (
    <section className="quiz-item-view">
      <h3>{quiz.title}</h3>
      <p>{quiz.description}</p>
      <Button
        onClick={() => {
          navigate(`/quiz/${quiz.id}`);
        }}
        icon={"pi pi-pencil"}
      ></Button>
    </section>
  );
}
