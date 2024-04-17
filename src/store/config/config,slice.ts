import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IConfigInitialState} from "@/store/config/config.types";



const initialState: IConfigInitialState = {
    difficulty: "easy",
    mode: "shapes"
}

export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setDifficulty: (state, action: PayloadAction<IConfigInitialState['difficulty']>) => {
            state.difficulty = action.payload;
        },
        setMode: (state, action: PayloadAction<IConfigInitialState['mode']>) => {
            state.mode = action.payload;
        },
        setCustom: (state, action: PayloadAction<IConfigInitialState['custom']>) => {
            state.custom = action.payload;
        }
    }
});
