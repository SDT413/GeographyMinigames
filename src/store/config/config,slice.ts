import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConfigInitialState} from "@/store/config/config.types";



const initialState: IConfigInitialState = {
    difficulty: "easy",
    questionsDiff: "easy",
    helperPunishment: "easy",
    helperEfficiency: "easy",
    time: "easy",
    questionsAmount: "easy",
    mode: "shapes"
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfigDifficulty: (state, action: PayloadAction<IConfigInitialState['difficulty']>) => {
            state.difficulty = action.payload;
        },
        setConfigMode: (state, action: PayloadAction<IConfigInitialState['mode']>) => {
            state.mode = action.payload;
        },
        setCustomQuestionsDiff: (state, action: PayloadAction<IConfigInitialState['questionsDiff']>) => {
            state.questionsDiff = action.payload;
        },
        setCustomHelperPunishment: (state, action: PayloadAction<IConfigInitialState['helperPunishment']>) => {
            state.helperPunishment = action.payload;
        },
        setCustomHelperEfficiency: (state, action: PayloadAction<IConfigInitialState['helperEfficiency']>) => {
            state.helperEfficiency = action.payload;
        },
        setCustomTime: (state, action: PayloadAction<IConfigInitialState['time']>) => {
            state.time = action.payload;
        },
        setCustomQuestionsAmount: (state, action: PayloadAction<IConfigInitialState['questionsAmount']>) => {
            state.questionsAmount = action.payload;
        }
    }
});
