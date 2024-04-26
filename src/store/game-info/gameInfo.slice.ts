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
        increaseScore: (state) => {
            console.log("Increased score: ", state.score)
            state.score += 1;
        },
        increaseFailed: (state) => {
            console.log("Increased failed: ", state.failed)
            state.failed += 1;
        },
        increaseHelperUsed: (state) => {
            console.log("Increased helper used: ", state.helperUsed)
            state.helperUsed += 1;
    }
}
});
