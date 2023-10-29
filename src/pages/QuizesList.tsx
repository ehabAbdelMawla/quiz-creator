import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Quiz } from "../utils/types";
import QuizView from "../components/QuizView";

function QuizesList() {
  const { quizes } = useSelector((state: AppState) => state.quizes);
  const navigate = useNavigate();
  console.log(quizes);
  return (
    <section className="quizes-page-container">
      <header>
        <h1>Quizes List</h1>
        <Button
          onClick={() => {
            navigate("/quiz");
          }}
          icon={"pi pi-plus"}
        >
          Add New Quiz
        </Button>
      </header>
      <article className="quizes-list">
        {quizes.map((quiz: Quiz) => (
          <QuizView key={quiz.id} quiz={quiz} />
        ))}
      </article>
    </section>
  );
}

export default QuizesList;
