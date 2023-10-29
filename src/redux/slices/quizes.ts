import { createSlice } from "@reduxjs/toolkit";
import { Quiz } from "../../utils/types";

const initialState: { quizes: Quiz[] } = {
  quizes: [],
};

const quizesSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    AddQuiz(state, action) {
      return {
        ...state,
        quizes: [...state.quizes, action.payload],
      };
    },
    updateQuiz(state, action) {
      return {
        ...state,
        quizes: [
          ...state.quizes.filter((q: Quiz) => q.id != action.payload.id),

          action.payload,
        ],
      };
    },
  },
});

export const { AddQuiz, updateQuiz } = quizesSlice.actions;
export default quizesSlice;
