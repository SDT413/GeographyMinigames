import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProductSliderInitialState} from "@/store/product_selector/product_slider.types";
import {EnumSort} from "@/components/interfaces/sorting.interface";


const initialState: IProductSliderInitialState = {
    selectedItemIndex: 0,
    items: [],
    sortType: EnumSort.INCREASING_PRICE,
    searchQuery: ''
}

export const productSliderSlice = createSlice({
    name: 'product_slider',
    initialState,
    reducers: {
         nextItem: (state, action: PayloadAction<number> ) => {
             if( state.selectedItemIndex === action.payload - 1){
                    state.selectedItemIndex = 0;
                } else {
                    state.selectedItemIndex++;
             }
            },
        prevItem: (state, action: PayloadAction<number> ) => {
            if( state.selectedItemIndex === 0){
                state.selectedItemIndex = action.payload - 1;
            } else {
                state.selectedItemIndex--;
            }
         },
        selectItem: (state, action: PayloadAction<number> ) => {
            state.selectedItemIndex = action.payload;
        }
    }
});
