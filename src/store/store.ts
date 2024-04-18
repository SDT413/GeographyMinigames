import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {configSlice} from "@/store/config/config,slice";
import {gameInfoSlice} from "@/store/game-info/gameInfo.slice";
import {questionsSlice} from "@/store/questions/questions.slice";

const persistConfig : PersistConfig<any> = {
    key: 'geography-game',
    storage,
    whitelist: ['config']
}


const rootReducer = combineReducers({
    config: configSlice.reducer,
    gameInfo: gameInfoSlice.reducer,
    questions: questionsSlice.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
    } as any),
});
export const persistor = persistStore(store);

export type TypeRootState = ReturnType<typeof rootReducer>;