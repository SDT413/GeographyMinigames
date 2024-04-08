import {cartSlice} from "@/store/cart/cart.slice";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {useMemo} from "react";
import {productSliderSlice} from "@/store/product_selector/product_slider.slice";

const rootAction = {
    ...cartSlice.actions,
    ...productSliderSlice.actions
}

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootAction, dispatch), [dispatch]);
}