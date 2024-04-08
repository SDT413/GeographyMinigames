import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useMemo} from "react";

export const useProductSlider = () => {
    const {selectedItemIndex} = useTypedSelector(state => state.product_slider);
    return useMemo(() => ({selectedItemIndex}), [selectedItemIndex]);
}