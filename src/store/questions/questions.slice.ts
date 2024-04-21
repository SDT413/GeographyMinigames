import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IQuestionsInitialState} from "@/store/questions/questions.types";



const initialState: IQuestionsInitialState = {
    questions: [],

    currentQuestion: null,
    currentQuestionIndex: 0,
    questionsLeft: 0
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<IQuestionsInitialState['questions']>) => {
            state.questions = action.payload;
        },
        setCurrentQuestion: (state, action: PayloadAction<IQuestionsInitialState['currentQuestion']>) => {
            state.currentQuestion = action.payload;
        },
        setInitCurrentQuestion: (state) => {
            state.currentQuestionIndex = 0;
            state.currentQuestion = state.questions[state.currentQuestionIndex];
        },
        setNextQuestion: (state) => {
            state.currentQuestion = state.questions[state.currentQuestionIndex + 1];
        },
        setQuestionsLeft: (state, action: PayloadAction<IQuestionsInitialState['questionsLeft']>) => {
            state.questionsLeft = action.payload;
        },
        decreaseQuestionsLeft: (state) => {
            state.questionsLeft -= 1;
        }
}
});
