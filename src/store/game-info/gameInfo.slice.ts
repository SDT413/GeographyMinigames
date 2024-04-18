import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGameInfoInitialState} from "@/store/game-info/gameInfo.types";



const initialState: IGameInfoInitialState = {
    score: 0,
    failed: 0,
    time: 0,
    helperUsed: 0
}

export const gameInfoSlice = createSlice({
    name: 'gameInfo',
    initialState,
    reducers: {
        setScore: (state, action: PayloadAction<IGameInfoInitialState['score']>) => {
            state.score = action.payload;
        },
        setFailed: (state, action: PayloadAction<IGameInfoInitialState['failed']>) => {
            state.failed = action.payload;
        },
        setTime: (state, action: PayloadAction<IGameInfoInitialState['time']>) => {
            state.time = action.payload;
        },
        setHelperUsed: (state, action: PayloadAction<IGameInfoInitialState['helperUsed']>) => {
            state.helperUsed = action.payload;
        },
        increseScore: (state) => {
            state.score += 1;
        },
        increseFailed: (state) => {
            state.failed += 1;
        },
        increseHelperUsed: (state) => {
            state.helperUsed += 1;
        }
    }
});
