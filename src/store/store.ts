import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import {cartSlice} from './cart/cart.slice';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import {productSliderSlice} from "@/store/product_selector/product_slider.slice";

const persistConfig : PersistConfig<any> = {
    key: 'xmas-shop',
    storage,
    whitelist: ['cart']
}


const rootReducer = combineReducers({
    cart: cartSlice.reducer,
    product_slider: productSliderSlice.reducer
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