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
            console.log("Set questions: ", state.questions)
        },
        setCurrentQuestion: (state, action: PayloadAction<IQuestionsInitialState['currentQuestion']>) => {
            state.currentQuestion = action.payload;
            console.log("Set current question: ", state.currentQuestion)
        },
        setInitCurrentQuestion: (state) => {
            state.currentQuestionIndex = 0;
            state.currentQuestion = state.questions[state.currentQuestionIndex];
            console.log("Set init current question: ", state.currentQuestion)
        },
        setNextQuestion: (state) => {
            state.currentQuestionIndex += 1;
            state.currentQuestion = state.questions[state.currentQuestionIndex];
            console.log("Set next question: ", state.currentQuestion, "Index: ", state.currentQuestionIndex)
        },
        setQuestionsLeft: (state, action: PayloadAction<IQuestionsInitialState['questionsLeft']>) => {
            state.questionsLeft = action.payload;
            console.log("Set questions left: ", state.questionsLeft)
        },
        autoSetQuestionsLeft: (state) => {
            state.questionsLeft = state.questions.length - (state.currentQuestionIndex + 1);
            console.log("Auto set questions left: ", state.questionsLeft)
        },
        decreaseQuestionsLeft: (state) => {
            state.questionsLeft -= 1;
            console.log("Decrease questions left: ", state.questionsLeft)
        }
}
});
